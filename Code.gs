function main() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();

  // main student list initialization
  let senderSheet = "Sender Sheet";
  let senderList = ss.getSheetByName(senderSheet);
  let senderData = senderList.getDataRange().getValues();
  let schoolName = [];

  // add all schools to school array
  for (i = 1; i < senderData.length - 1; i++) {

    if (!schoolName.includes(senderData[i][0])) {
      schoolName.push(senderData[i][0]);
    }
  }

  // start of school array
  for (i = 0; i < schoolName.length; i++) {
    let recipients = [];

    for (j = 1; j < senderData.length; j++) {

      // if cell contains current school
      if (schoolName[i] == senderData[j][0]) {

        // add teacher if not duplicate
        if (!recipients.includes(senderData[j][2])) {
          recipients.push(senderData[j][2]);
        }

        // add principal if not duplicate
        if (!recipients.includes(senderData[j][4])) {
          recipients.push(senderData[j][4]);
        }
        senderList.getRange(j + 1, 6).setValue(true); //change emailsent value check to true
      }
    }

    // generate school spreadsheet and create url for email
    let sheetId = createSheet(ss, schoolName[i], recipients); // returns sheet id for the next function

    // create and send email to recipients
    attachAndSend(recipients, schoolName[i], sheetId);

    // clear recipients array for next school
    recipients = [];
  }
}

function createSheet(ss, schoolName, editorArray) {

  let inventoryList = ss.getSheetByName('Inventory Template');
  let exampleList = ss.getSheetByName('EXAMPLE Inventory');

  let folder = DriveApp.getFolderById('1D0TyyvniYpHLMPl088I8yc4yuqbf9g6G') // HPE folder
  let newName = schoolName + " Physical Education Equipment Inventory";
  let newSS = SpreadsheetApp.create(newName);

  inventoryList.copyTo(newSS).setName("Physical Education Equipment Inventory");
  exampleList.copyTo(newSS).setName("Example Inventory");
  newSS.deleteSheet(newSS.getSheetByName("Sheet1")); // delete default sheet

  newSS.getRange('A1').setValue(schoolName + ": \nPhysical Education Equipment Inventory"); // sets title cell

  DriveApp.getFileById(newSS.getId()).moveTo(folder); // move to proper folder
  // add school staff to share settings
  newSS.addEditors(editorArray);
  return newSS.getId();
}


