<template>
  <div class="bg-light p-3 height100">
    <h1 class="mb-3">Simple airplane seating algorithm</h1>
    <div v-for="(data, index) in dataSeat" :key="index">
      <label>Row</label>
      <input @keyup="checkSeat" v-model="data.row" type="number" />
      <label>Column</label>
      <input @keyup="checkSeat" v-model="data.column" type="number" />
      <button
        @click="deleteItem(index)"
        class="btn btn-danger p-1"
        v-if="index > 0"
      >
        Delete
      </button>
    </div>
    <button class="btn btn-success d-block" @click="addData">Add Group</button>
    <label>Total Passenger</label>
    <input @keyup="checkSeat" v-model="totalPassenger" type="number" />
    <div class="d-flex bg-white">
      <div v-for="(data, index) in arrayRender" :key="index" class="mx-3">
        <div
          v-for="(row, index2) in data"
          :key="index2"
          style="margin-bottom: 10px"
          class="d-flex"
        >
          <div
            v-for="(column, index3) in row"
            :key="index3"
            style="margin-right: 10px"
          >
            <div
              v-if="
                (index3 == 0 && index == 0) ||
                (index3 == row.length - 1 && index == arrayRender.length - 1)
              "
              style="height: 30px; width: 30px"
              class="container-filled bg-success"
            >
              <span v-if="column != 0">
                {{ column }}
              </span>
            </div>
            <div
              v-else-if="index3 == 0 || index3 == row.length - 1"
              style="height: 30px; width: 30px"
              class="container-filled bg-primary"
            >
              <span v-if="column != 0">
                {{ column }}
              </span>
            </div>
            <div
              v-else
              style="height: 30px; width: 30px"
              class="container-filled bg-danger"
            >
              <span v-if="column != 0">
                {{ column }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.height100 {
  min-height: 100vh;
}
.container-filled {
  color: white;
  font-weight: 800;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script>
export default {
  data() {
    return {
      totalPassenger: 0,
      maxAisleSeat: 0,
      maxWindowSeat: 0,
      maxMiddleSeat: 0,
      aisleSeatPassenger: 0,
      windowSeatPassenger: 0,
      middleSeatPassenger: 0,
      seatArray: [],
      arrayRender: [],
      dataSeat: [
        {
          id: 1,
          row: 0,
          column: 0,
        },
      ],
    };
  },
  methods: {
    addData() {
      this.dataSeat.push({
        id: this.dataSeat[this.dataSeat.length - 1].id + 1,
        row: 0,
        column: 0,
      });
    },
    deleteItem(index) {
      if (index > -1) {
        this.dataSeat.splice(index, 1);
        this.checkSeat();
      }
    },
    checkSeat() {
      let passenger = Number(this.totalPassenger);
      let seatArray = [];
      let maxColumn = 0;
      let maxAisleSeat = 0;
      let aisleSeatPassenger = 0;
      let maxWindowSeat = 0;
      let windowSeatPassenger = 0;
      let maxMiddleSeat = 0;
      let middleSeatPassenger = 0;
      this.dataSeat.forEach((element) => {
        seatArray.push([Number(element.column), Number(element.row)]);
      });
      console.log("seatArray", seatArray);
      if (seatArray.length > 0) {
        seatArray.forEach((element, index) => {
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
      let arrayRender = [];
      for (let index = 0; index < maxColumn; index++) {
        seatArray.forEach((element, indexSeatArray) => {
          if (!arrayRender[indexSeatArray]) {
            arrayRender[indexSeatArray] = [];
          }
          if (element[1] > index) {
            let arrayRender2 = [];
            for (let indexColumn = 0; indexColumn < element[0]; indexColumn++) {
              let poin = 0;
              if (
                ((indexSeatArray == 0 && indexColumn == 0) ||
                  (indexSeatArray == seatArray.length - 1 &&
                    indexColumn == element[0] - 1)) &&
                windowIndex < windowSeatPassenger
              ) {
                windowIndex++;
                outputString += "|" + Number(maxAisleSeat + windowIndex) + "|";
                poin = Number(maxAisleSeat + windowIndex);
              } else if (
                (indexColumn == 0 || indexColumn == element[0] - 1) &&
                aisleIndex < aisleSeatPassenger
              ) {
                if (seatArray.length == 1) {
                  maxWindowSeat = 0;
                  aisleIndex++;
                  outputString += "|" + Number(aisleIndex) + "|";
                  poin = Number(aisleIndex);
                } else if (
                  !(indexSeatArray == 0 && indexColumn == 0) &&
                  !(
                    indexSeatArray == seatArray.length - 1 &&
                    indexColumn == element[0] - 1
                  )
                ) {
                  aisleIndex++;
                  outputString += "|" + Number(aisleIndex) + "|";
                  poin = Number(aisleIndex);
                } else {
                  poin = Number(0);
                  outputString += "|\xa00\xa0|";
                }
              } else if (middleIndex < middleSeatPassenger) {
                middleIndex++;
                outputString +=
                  "|" +
                  Number(maxAisleSeat + maxWindowSeat + middleIndex) +
                  "|";
                poin = Number(maxAisleSeat + maxWindowSeat + middleIndex);
              } else {
                outputString += "|\xa00\xa0|";
                poin = Number(0);
              }
              arrayRender2.push(poin);
            }
            arrayRender[indexSeatArray].push(arrayRender2);
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
      this.arrayRender = arrayRender;
      console.log(outputString);
    },
  },
};
</script>
