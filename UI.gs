function createMenu() { // adds menu to menu bar on tper form, does this with a trigger on Open
  var menu = SpreadsheetApp.getUi().createMenu("HPE Helper");
  menu.addItem("Run Helper", "runHelper");
  menu.addToUi();
}

function runHelper() {
  var result = SpreadsheetApp.getUi().alert("HPE Mass Email Helper", "Are you ready to run the HPE Mass Email Helper?", SpreadsheetApp.getUi().ButtonSet.YES_NO);
  if(result === SpreadsheetApp.getUi().Button.YES){
    SpreadsheetApp.getActive().toast("Running Script...");
    main();
    SpreadsheetApp.getActive().toast("Mass Email Complete");
  }
  else{
    SpreadsheetApp.getActive().toast("Canceling Script; No emails were sent.");
  }
}
