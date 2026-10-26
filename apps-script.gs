/**
 * RSVP backend for Google Sheets.
 * 1. Create a Google Sheet -> Extensions -> Apps Script, paste this file.
 * 2. Deploy -> New deployment -> Web app (Execute as: Me, Access: Anyone).
 * 3. Copy the Web App URL into RSVP_ENDPOINT in script.js.
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Submitted At', 'Name', 'Attendance', 'Guests', 'Message']);
  }
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([d.submittedAt, d.name, d.attendance, d.guests, d.message]);
  return ContentService.createTextOutput('ok');
}
