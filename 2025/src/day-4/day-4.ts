import { readFile } from "./readData";

export const Day4 = async () => {
  const dataRead = "src/day-4/data/testData.txt";
  const formatData = (await readFile(dataRead)).split("\n");
  let sum = 0;
  for (let i = 0; i < formatData.length; i++) {
    for (let j = 0; j < formatData[i].length; j++) {
      let k = 0;
      if (formatData[i][j] === "@") {
        if (j < formatData[i].length - 1) {
          if (formatData[i][j + 1] === "@") {
            k++;
          }
        }
        if (i < formatData.length - 1) {
          if (formatData[i + 1][j] === "@") {
            k++;
          }
        }
        if (j > 0) {
          if (formatData[i][j - 1] === "@") {
            k++;
          }
        }
        if (i > 0) {
          if (formatData[i - 1][j] === "@") {
            k++;
          }
        }
        if (i < formatData.length - 1 && j < formatData[i].length - 1) {
          if (formatData[i + 1][j + 1] === "@") {
            k++;
          }
        }
        if (i < formatData.length - 1 && j > 0) {
          if (formatData[i + 1][j - 1] === "@") {
            k++;
          }
        }
        if (i > 0 && j < formatData[i].length - 1) {
          if (formatData[i - 1][j + 1] === "@") {
            k++;
          }
        }
        if (i > 0 && j > 0) {
          if (formatData[i - 1][j - 1] === "@") {
            k++;
          }
        }

        if (k < 4) {
          sum++;
          // formatData[i][j] insert "X" at position j
        }
      }
    }
  }
  return sum;
};
