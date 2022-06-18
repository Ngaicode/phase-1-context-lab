"use strict";
// i prefer function declarations over expressions because the are hoisted and available in all scopes
let createEmployeeRecord = function (row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

//creates two records
//  correctly assigns the first names
function createEmployeeRecords(employeeRowData) {
  return employeeRowData.map(function (row) {
    return createEmployeeRecord(row);
  });
}

// creates the correct type
//  extracts the correct date
// extracts the correct hour

function createTimeInEvent(stampOfDate) {
  let [date, hour] = stampOfDate.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
}

// creates the correct type
// extracts the correct date
//  extracts the correct hour

function createTimeOutEvent(stampOfDate) {
  let [date, hour] = stampOfDate.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
}
// calculates that the employee worked 2 hours
function hoursWorkedOnDate(dateSaught) {
  let inEvent = this.timeInEvents.find(function (e) {
    return e.date === dateSaught;
  });

  let outEvent = this.timeOutEvents.find(function (e) {
    return e.date === dateSaught;
  });

  return (outEvent.hour - inEvent.hour) / 100;
}

// calculates that the employee earned 54 dollars
//  uses hoursWorkedOnDate
function wagesEarnedOnDate(dateSoughtAfter) {
  let wage = hoursWorkedOnDate.call(this, dateSoughtAfter) * this.payPerHour;
  return parseFloat(wage.toString());
}

// calculates that the employees earned 770 dollars
function allWagesFor() {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  );

  return payable;
}

function findEmployeeByFirstName(sourceArray, firstName) {
  return sourceArray.find(function (x) {
    return x.firstName === firstName;
  });
}

// correctly sums the payroll burden to $11,880 when passed an array of employee records
function calculatePayroll(recordOfEmployees) {
  return recordOfEmployees.reduce(function (memo, rec) {
    return memo + allWagesFor.call(rec);
  }, 0);
}
