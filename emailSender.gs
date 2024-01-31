function attachAndSend(recipients, school, sheetId) {

  let subject = 'Action Requested: PE Inventory Doc for ' + school;
  let html = HtmlService.createTemplateFromFile('inventoryEmail');

  ////////////// pull doc via id ----
  let sheet = DriveApp.getFileById(sheetId);
  ////////////// --------------------

  html.SCHOOL = school;
  html.URL = sheet.getUrl();

  let body = html.evaluate().getContent();

  let cc = "";

  for(i = 1; i < recipients.length; i++){
    cc += recipients[i];
    if(((i + 1) != recipients.length)){
      cc += "," 
    }  
  }
  console.log(cc);

  try {
    Logger.log("Trying to send inventory email");
  
    console.log("I'M SENDING...");
    GmailApp.sendEmail(recipients[0], subject, '', { cc: cc, htmlBody: body }); // same
    console.log("SENT");

  } catch (e) {
    const error = `Error with email (${recipients[0]}): ${e}`;
    Logger.log(error);
  }
}
