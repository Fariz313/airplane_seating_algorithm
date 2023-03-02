// Use console input module
const prompt = require("prompt-sync")();
console.log(
  "Please insert available seat in the airplane using 2D array [ [row,column] ] !"
);
console.log("For example [[3,2],[4,3],[2,3],[3,4]]");

let passenger = 0;
let correctFormatSeat = false;
let seatArray = [];
let maxColumn = 0;
let maxAisleSeat = 0;
let aisleSeatPassenger = 0;
let maxWindowSeat = 0;
let windowSeatPassenger = 0;
let maxMiddleSeat = 0;
let middleSeatPassenger = 0;
do {
    try {
      // Input seat from availability & total pasengger
    const seat = prompt("Input seat availability :");
    passenger = prompt("Input total passenger :");
    seatArray = JSON.parse(seat);
    console.time("tp");
    console.log(seatArray);
    if (seatArray.length > 0) {
        // Cek input format  & define element of array
      correctFormatSeat = true;
      seatArray.forEach((element, index) => {
        correctFormatSeat = true;
        if (!Number.isInteger(element[0]) || !Number.isInteger(element[1])) {
          correctFormatSeat = false;
        }
        if (element[1] > maxColumn) {
          maxColumn = element[1];
        }
        if (index == 0 || index == seatArray.length - 1) {
          if (element[0] > 2) {
            maxMiddleSeat += (element[0] - 2) * element[1];
          }
          if (element[0] > 2) {
            maxMiddleSeat += (element[0] - 2) * element[1];
          }
          if (element[0] > 1) {
            maxWindowSeat += element[1];
            maxAisleSeat += element[1];
          } else {
            maxAisleSeat += element[1];
          }
        } else {
          if (element[0] > 2) {
            maxMiddleSeat += (element[0] - 2) * element[1];
          }
          if (element[0] > 1) {
            maxAisleSeat += element[1] * 2;
          } else {
            maxAisleSeat += element[1];
          }
        }
      });
    }
  } catch (error) {
    console.log("Your input are wrong");
    console.log(
      "Please insert available seat in the airplane using 2D array [ [row,column] ] !"
    );
  }
} while (!correctFormatSeat);
// Get detail data
let passengerUnSeated = passenger;
if (passengerUnSeated < maxAisleSeat) {
  aisleSeatPassenger = passengerUnSeated;
} else {
  aisleSeatPassenger = maxAisleSeat;
  passengerUnSeated -= aisleSeatPassenger;
  if (passengerUnSeated < maxWindowSeat) {
    windowSeatPassenger = passengerUnSeated;
  } else {
    windowSeatPassenger = maxWindowSeat;
    passengerUnSeated -= maxWindowSeat;
    middleSeatPassenger = passengerUnSeated;
  }
}
let outputString = "";
let aisleIndex = 0;
let windowIndex = 0;
let middleIndex = 0;
// show result with format
for (let index = 0; index < maxColumn; index++) {
  seatArray.forEach((element, indexSeatArray) => {
    if (element[1] > index) {
      for (let indexColumn = 0; indexColumn < element[0]; indexColumn++) {
        if (
          ((indexSeatArray == 0 && indexColumn == 0) ||
            (indexSeatArray == seatArray.length - 1 &&
              indexColumn == element[0] - 1)) &&
          windowIndex < windowSeatPassenger
        ) {
          windowIndex++;
          outputString +=
            "|" + padWithLeadingZeros(maxAisleSeat + windowIndex, 3) + "|";
        } else if (
          (indexColumn == 0 || indexColumn == element[0] - 1) &&
          aisleIndex < aisleSeatPassenger
        ) {
          if (seatArray.length == 1) {
            maxWindowSeat = 0
            aisleIndex++;
            outputString += "|" + padWithLeadingZeros(aisleIndex, 3) + "|";
          } else if (
            !(indexSeatArray == 0 && indexColumn == 0) &&
            !(indexSeatArray == seatArray.length - 1 && indexColumn == element[0] - 1)
          ) {
            aisleIndex++;
            outputString += "|" + padWithLeadingZeros(aisleIndex, 3) + "|";
          }else{
            outputString += "|\xa00\xa0|"; 
          }
        } else if (middleIndex < middleSeatPassenger) {
          middleIndex++;
          outputString +=
            "|" +
            padWithLeadingZeros(maxAisleSeat + maxWindowSeat + middleIndex, 3) +
            "|";
        } else {
          outputString += "|\xa00\xa0|";
        }
      }
    } else {
      for (let indexColumn = 0; indexColumn < element[0]; indexColumn++) {
        outputString += "|\xa0\xa0\xa0|";
      }
    }
    outputString += "\t\t";
  });
  outputString += "\n";
}
console.log("maxAisleSeat", maxAisleSeat);
console.log("maxWindowSeat", maxWindowSeat);
console.log("maxMiddleSeat", maxMiddleSeat);
console.log("aisleSeatPassenger", aisleSeatPassenger);
console.log("windowSeatPassenger", windowSeatPassenger);
console.log("middleSeatPassenger", middleSeatPassenger);

console.log(outputString);
console.timeEnd("tp");

function padWithLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, "0");
}
