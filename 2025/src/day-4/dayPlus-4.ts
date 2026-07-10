import { readFile } from "./readData";
const filterData = (data: string[]) => {
  let sum = 0;
  let newMap: string[] = [];
  while (true) {
    let tmpSum = 0;
    for (let i = 0; i < data.length; i++) {
      newMap[i] = "";
      for (let j = 0; j < data[i].length; j++) {
        let k = 0;
        if (data[i][j] === "@") {
          if (j < data[i].length - 1) {
            if (data[i][j + 1] === "@") {
              k++;
            }
          }
          if (i < data.length - 1) {
            if (data[i + 1][j] === "@") {
              k++;
            }
          }
          if (j > 0) {
            if (data[i][j - 1] === "@") {
              k++;
            }
          }
          if (i > 0) {
            if (data[i - 1][j] === "@") {
              k++;
            }
          }
          if (i < data.length - 1 && j < data[i].length - 1) {
            if (data[i + 1][j + 1] === "@") {
              k++;
            }
          }
          if (i < data.length - 1 && j > 0) {
            if (data[i + 1][j - 1] === "@") {
              k++;
            }
          }
          if (i > 0 && j < data[i].length - 1) {
            if (data[i - 1][j + 1] === "@") {
              k++;
            }
          }
          if (i > 0 && j > 0) {
            if (data[i - 1][j - 1] === "@") {
              k++;
            }
          }

          if (k < 4) {
            sum++;
            tmpSum++;
            newMap[i] += "x";
          } else {
            newMap[i] += data[i][j];
          }
        } else {
          newMap[i] += data[i][j];
        }
      }
    }
    if (tmpSum === 0) {
      break;
    }
    data = [...newMap.map((row) => row.replace(/x/g, "."))];
  }
  return sum;
};

export const DayPlus4 = async () => {
  const dataRead = "src/day-4/data/data.txt";
  const formatData = (await readFile(dataRead)).split("\n");

  const removedRoll = filterData(formatData);

  return removedRoll;
};
