function main() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();

  // main student list initialization
  let senderSheet = "Sender Sheet";
  let senderList = ss.getSheetByName(senderSheet);
  let senderData = senderList.getDataRange().getValues();
  let schoolName = [];

  // add all schools to school array
  for (k = 1; k < senderData.length - 1; k++) {

    if (!schoolName.includes(senderData[k][0])) {
      schoolName.push(senderData[k][0]);
    }
  }
  console.log(schoolName);

  // start of school array
  schoolLoop: for (i = 0; i < schoolName.length; i++) {
    let recipients = [];
    ss = SpreadsheetApp.getActiveSpreadsheet();

    // main student list initialization
    senderSheet = "Sender Sheet";
    senderList = ss.getSheetByName(senderSheet);
    senderData = senderList.getDataRange().getValues();
    console.log("array start");

    sendingLoop: for (j = 1; j < senderData.length - 1; j++) {
      if ((schoolName[i] == senderData[j][0]) && senderData[j][5] == true) {
        console.log("Skipping");
        continue schoolLoop;
      }
      //console.log(senderData[j][5] + " and NOT SKIPPED");

      // console.log(schoolName[i]+ " and " + senderData[j][0]);
      // if cell contains current school
      if (schoolName[i] == senderData[j][0]) {
        console.log("same school");

        // add teacher if not duplicate
        if (!recipients.includes(senderData[j][2]) && (senderData[j][2] != null)) {
          recipients.push(senderData[j][2]);
          //console.log(senderData[j][2]);
        }

        // add principal if not duplicate
        if (!recipients.includes(senderData[j][4]) && (senderData[j][4] != null)) {
          recipients.push(senderData[j][4]);
        }

        // recipients.forEach(function (entry) {
        //  console.log(entry);
        // });

        senderList.getRange(j + 1, 6).setValue(true); //change emailsent value check to true
      }
    }

    // generate school spreadsheet and create url for email

    // returns sheet id for the next function
    // create and send email to recipients
    console.log(recipients + " and " + schoolName[i]);
    attachAndSend(recipients, schoolName[i], createSheet(ss, schoolName[i], recipients));

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
