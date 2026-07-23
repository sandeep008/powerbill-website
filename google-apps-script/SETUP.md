# Backend setup (Google Sheet + Apps Script)

One-time setup, about 5 minutes, done in your own Google account. This turns
a Google Sheet into a free API the website talks to for business
registrations, the public directory, reviews, and the visitor counter.

## 1. Create the Sheet

1. Go to [sheets.new](https://sheets.new) to create a blank Google Sheet.
2. Rename it something like "PowerBill Website Data".
3. Create three tabs (bottom-left `+`), named **exactly**:
   - `Registrations` — header row: `Timestamp | Name | Mobile | BusinessName | Address | BusinessType`
   - `Reviews` — header row: `Timestamp | Name | Shop | Rating | Comment`
   - `Counters` — header row: `Key | Value`

   (The header row is just for your own readability — the script always
   appends new data starting from row 2.)

## 2. Add the script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete anything in the editor and paste the full contents of `Code.gs`
   (in this same folder).
3. Click the **Save** icon (or Ctrl+S).

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Set:
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
4. Click **Deploy**. Google will ask you to authorize the script — approve
   it (it's your own script, acting only on this one Sheet).
5. Copy the **Web app URL** it gives you (ends in `/exec`).

## 4. Send me that URL

That's it on your end. Send me the URL and I'll wire it into
`src/lib/backend.ts` and push the site live with registrations, the
business directory, reviews, and the visitor counter all working.

## Notes

- You can open the Sheet anytime to see registrations/reviews as they come
  in, or to export/filter/sort like any spreadsheet.
- If you ever need to change the script, edit it in Extensions → Apps
  Script, then **Deploy → Manage deployments → edit (pencil) → Version:
  New version → Deploy**. Editing the code alone doesn't update the live
  Web App until you do this.
- Mobile numbers and addresses submitted at registration stay in this
  private Sheet only — the website's public business directory only ever
  shows business name and type.
