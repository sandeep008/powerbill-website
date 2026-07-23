/**
 * PowerBill website backend -- a free Google Apps Script Web App bound to a
 * Google Sheet, standing in for a real database since the site itself is
 * static (GitHub Pages, no server). See SETUP.md for how to deploy this.
 *
 * Sheet tabs expected (case-sensitive):
 *   Registrations : Timestamp | Name | Mobile | BusinessName | Address | BusinessType |
 *                   LicenseStart | LicenseReminder | LicenseExpiry | AmountPaid | Status
 *   Reviews       : Timestamp | Name | Shop | Rating | Comment
 *   Counters      : Key | Value        (row "visits" | <number> is maintained here)
 *
 * The client deliberately POSTs with Content-Type: text/plain, not
 * application/json -- Apps Script Web Apps do not implement the OPTIONS
 * preflight response, so any request that *would* trigger a CORS preflight
 * (e.g. a JSON content-type) fails from a browser. text/plain is a "simple
 * request" and skips preflight entirely; the body is still a JSON string,
 * parsed manually below.
 *
 * Admin actions (adminUsers, adminStats, adminUpdateUser, adminDeleteUser)
 * require an adminSecret that must match the ADMIN_SECRET Script Property
 * (Project Settings -> Script Properties, see SETUP.md) -- this is the real
 * access control. The admin page's own login screen is just a convenience;
 * anyone without the correct secret gets rejected here, server-side, no
 * matter what the website's client-side code does or doesn't check.
 */

function isAuthorized(secret) {
  var expected = PropertiesService.getScriptProperties().getProperty("ADMIN_SECRET");
  return !!expected && secret === expected;
}

function doGet(e) {
  var action = (e.parameter.action || "").toLowerCase();
  var sheet = SpreadsheetApp.getActiveSpreadsheet();

  if (action === "businesses") {
    return respond(getBusinesses(sheet));
  }
  if (action === "reviews") {
    return respond(getReviews(sheet));
  }
  if (action === "visit") {
    return respond({ count: incrementVisitCount(sheet) });
  }

  if (action === "adminusers" || action === "adminstats") {
    if (!isAuthorized(e.parameter.adminSecret)) {
      return respond({ error: "Unauthorized" });
    }
    if (action === "adminusers") return respond(getAdminUsers(sheet));
    return respond(getAdminStats(sheet));
  }

  return respond({ error: "Unknown action" });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return respond({ error: "Invalid JSON body" });
  }

  var action = (body.action || "").toLowerCase();
  var sheet = SpreadsheetApp.getActiveSpreadsheet();

  if (action === "register") {
    return respond(addRegistration(sheet, body));
  }
  if (action === "review") {
    return respond(addReview(sheet, body));
  }

  if (action === "adminupdateuser" || action === "admindeleteuser") {
    if (!isAuthorized(body.adminSecret)) {
      return respond({ error: "Unauthorized" });
    }
    if (action === "adminupdateuser") return respond(adminUpdateUser(sheet, body));
    return respond(adminDeleteUser(sheet, body));
  }

  return respond({ error: "Unknown action" });
}

function addRegistration(spreadsheet, body) {
  var tab = spreadsheet.getSheetByName("Registrations");
  tab.appendRow([
    new Date(),
    String(body.name || "").trim(),
    String(body.mobile || "").trim(),
    String(body.businessName || "").trim(),
    String(body.address || "").trim(),
    String(body.businessType || "").trim(),
    "", // LicenseStart
    "", // LicenseReminder
    "", // LicenseExpiry
    "", // AmountPaid
    "Active", // Status
  ]);
  return { ok: true };
}

function addReview(spreadsheet, body) {
  var tab = spreadsheet.getSheetByName("Reviews");
  tab.appendRow([
    new Date(),
    String(body.name || "").trim(),
    String(body.shop || "").trim(),
    Number(body.rating) || 0,
    String(body.comment || "").trim(),
  ]);
  return { ok: true };
}

// Public directory -- business name + type only, and never a Blocked
// business. Mobile/address/license/status stay in the private sheet and
// are never returned here.
function getBusinesses(spreadsheet) {
  var tab = spreadsheet.getSheetByName("Registrations");
  var rows = tab.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < rows.length; i++) {
    var businessName = rows[i][3];
    var businessType = rows[i][5];
    var status = rows[i][10];
    if (businessName && status !== "Blocked") {
      out.push({ businessName: businessName, businessType: businessType });
    }
  }
  return out;
}

function getReviews(spreadsheet) {
  var tab = spreadsheet.getSheetByName("Reviews");
  var rows = tab.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < rows.length; i++) {
    if (!rows[i][1]) continue;
    out.push({
      id: String(i),
      name: rows[i][1],
      shop: rows[i][2],
      rating: rows[i][3],
      comment: rows[i][4],
      createdAt: new Date(rows[i][0]).getTime(),
    });
  }
  out.reverse(); // newest first
  return out;
}

function incrementVisitCount(spreadsheet) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var props = PropertiesService.getScriptProperties();
    var count = (parseInt(props.getProperty("visits"), 10) || 0) + 1;
    props.setProperty("visits", String(count));

    var tab = spreadsheet.getSheetByName("Counters");
    var rows = tab.getDataRange().getValues();
    var rowIndex = -1;
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][0] === "visits") {
        rowIndex = i + 1; // 1-indexed sheet row
        break;
      }
    }
    if (rowIndex === -1) {
      tab.appendRow(["visits", count]);
    } else {
      tab.getRange(rowIndex, 2).setValue(count);
    }
    return count;
  } finally {
    lock.releaseLock();
  }
}

function dateToIso(value) {
  if (!value) return "";
  var d = value instanceof Date ? value : new Date(value);
  if (isNaN(d.getTime())) return "";
  return Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyy-MM-dd");
}

// Full row data for the admin dashboard -- includes Mobile/Address/license
// fields/Status, unlike the public getBusinesses(). Only reachable with a
// valid adminSecret (checked by the caller in doGet).
function getAdminUsers(spreadsheet) {
  var tab = spreadsheet.getSheetByName("Registrations");
  var rows = tab.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < rows.length; i++) {
    if (!rows[i][1] && !rows[i][3]) continue; // skip fully blank rows
    out.push({
      id: i + 1, // 1-indexed sheet row number, used for edit/delete
      name: rows[i][1],
      mobile: rows[i][2],
      businessName: rows[i][3],
      address: rows[i][4],
      businessType: rows[i][5],
      licenseStart: dateToIso(rows[i][6]),
      licenseReminder: dateToIso(rows[i][7]),
      licenseExpiry: dateToIso(rows[i][8]),
      amountPaid: rows[i][9] === "" ? null : Number(rows[i][9]),
      status: rows[i][10] || "Active",
    });
  }
  return out;
}

function getAdminStats(spreadsheet) {
  var users = getAdminUsers(spreadsheet);
  var stats = { totalUsers: users.length, activeCount: 0, blockedCount: 0, expiringSoonCount: 0, totalRevenue: 0 };
  var now = new Date();
  var weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  users.forEach(function (u) {
    if (u.status === "Blocked") {
      stats.blockedCount++;
    } else {
      stats.activeCount++;
    }
    if (u.licenseExpiry) {
      var expiry = new Date(u.licenseExpiry);
      if (expiry >= now && expiry <= weekFromNow) stats.expiringSoonCount++;
    }
    if (u.amountPaid) stats.totalRevenue += u.amountPaid;
  });

  return stats;
}

var EDITABLE_FIELDS = [
  "name",
  "mobile",
  "businessName",
  "address",
  "businessType",
  "licenseStart",
  "licenseReminder",
  "licenseExpiry",
  "amountPaid",
  "status",
];
var FIELD_COLUMN = {
  name: 2,
  mobile: 3,
  businessName: 4,
  address: 5,
  businessType: 6,
  licenseStart: 7,
  licenseReminder: 8,
  licenseExpiry: 9,
  amountPaid: 10,
  status: 11,
};

function adminUpdateUser(spreadsheet, body) {
  var row = parseInt(body.id, 10);
  if (!row || row < 2) return { error: "Invalid id" };
  var tab = spreadsheet.getSheetByName("Registrations");

  EDITABLE_FIELDS.forEach(function (field) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      tab.getRange(row, FIELD_COLUMN[field]).setValue(body[field]);
    }
  });
  return { ok: true };
}

function adminDeleteUser(spreadsheet, body) {
  var row = parseInt(body.id, 10);
  if (!row || row < 2) return { error: "Invalid id" };
  spreadsheet.getSheetByName("Registrations").deleteRow(row);
  return { ok: true };
}

function respond(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
