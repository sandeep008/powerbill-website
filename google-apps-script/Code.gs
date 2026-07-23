/**
 * PowerBill website backend -- a free Google Apps Script Web App bound to a
 * Google Sheet, standing in for a real database since the site itself is
 * static (GitHub Pages, no server). See SETUP.md for how to deploy this.
 *
 * Sheet tabs expected (case-sensitive):
 *   Registrations : Timestamp | Name | Mobile | BusinessName | Address | BusinessType
 *   Reviews       : Timestamp | Name | Shop | Rating | Comment
 *   Counters      : Key | Value        (row "visits" | <number> is maintained here)
 *
 * The client deliberately POSTs with Content-Type: text/plain, not
 * application/json -- Apps Script Web Apps do not implement the OPTIONS
 * preflight response, so any request that *would* trigger a CORS preflight
 * (e.g. a JSON content-type) fails from a browser. text/plain is a "simple
 * request" and skips preflight entirely; the body is still a JSON string,
 * parsed manually below.
 */

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

// Public directory -- business name + type only. Mobile/address stay in the
// private sheet and are never returned here.
function getBusinesses(spreadsheet) {
  var tab = spreadsheet.getSheetByName("Registrations");
  var rows = tab.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < rows.length; i++) {
    var businessName = rows[i][3];
    var businessType = rows[i][5];
    if (businessName) {
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

function respond(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
