var ss = SpreadsheetApp.getActiveSpreadsheet();

function doGet(e) {
  var action = e.parameter.action;
  if (action === 'getEmployees') {
    var sheet = ss.getSheetByName('Employees');
    var data = sheet.getDataRange().getValues();
    var employees = [];
    for (var i = 1; i < data.length; i++) {
      employees.push({id: data[i][0], name: data[i][1], shiftStart: data[i][2], shiftEnd: data[i][3]});
    }
    return ContentService.createTextOutput(JSON.stringify(employees)).setMimeType(ContentService.MimeType.JSON);
  } else if (action === 'getLogs') {
    var sheet = ss.getSheetByName('Attendance');
    var data = sheet.getDataRange().getValues();
    var logs = [];
    for (var i = 1; i < data.length; i++) {
      logs.push({id: data[i][0], date: data[i][1], day: data[i][2], empName: data[i][3], shift: data[i][4], timeIn: data[i][5], timeOut: data[i][6], status: data[i][7], lateMins: data[i][8], earlyMins: data[i][9], overtimeMins: data[i][10]});
    }
    return ContentService.createTextOutput(JSON.stringify(logs)).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var action = data.action;
  
  if (action === 'addEmployee') {
    var sheet = ss.getSheetByName('Employees');
    sheet.appendRow([data.emp.id, data.emp.name, data.emp.shiftStart, data.emp.shiftEnd]);
    return ContentService.createTextOutput(JSON.stringify({status: 'success'})).setMimeType(ContentService.MimeType.JSON);
  } else if (action === 'addAttendance') {
    var sheet = ss.getSheetByName('Attendance');
    sheet.appendRow([data.log.id, data.log.date, data.log.day, data.log.empName, data.log.shift, data.log.timeIn, data.log.timeOut, data.log.status, data.log.lateMins, data.log.earlyMins, data.log.overtimeMins]);
    return ContentService.createTextOutput(JSON.stringify({status: 'success'})).setMimeType(ContentService.MimeType.JSON);
  }
}