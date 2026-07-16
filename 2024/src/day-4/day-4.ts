import { readFile } from "./readData";

export const Day4 = async () => {
  const data2 = "src/day-4/data/data.txt";
  const formatData = (await readFile(data2))
    .trim()
    .split("\n")
    .map((el) => el.split(""));

  let sum = 0;
  for (let i = 0; i < formatData.length; i++) {
    for (let j = 0; j < formatData[i].length; j++) {
      if (formatData[i][j] === "X") {
        //xmas to right
        if (j + 4 <= formatData[i].length) {
          let correctWord = "";
          let k = 0;

          while (k < 4) {
            correctWord += formatData[i][j + k];
            k++;
          }
          if (correctWord === "XMAS") {
            sum++;
          }
        }
        //xmas reverse
        if (j - 3 >= 0) {
          let correctWord = "";
          let k = 0;

          while (k < 4) {
            correctWord += formatData[i][j - k];
            k++;
          }

          if (correctWord === "XMAS") {
            sum++;
          }
        }
        // xmas to top
        if (i - 3 >= 0) {
          let correctWord = "";
          let k = 0;

          while (k < 4) {
            correctWord += formatData[i - k][j];
            k++;
          }

          if (correctWord === "XMAS") {
            sum++;
          }
        }
        // xmas to bottom
        if (i + 4 <= formatData.length) {
          let correctWord = "";
          let k = 0;

          while (k < 4) {
            correctWord += formatData[i + k][j];
            k++;
          }

          if (correctWord === "XMAS") {
            sum++;
          }
        }
        // diagonal to right top
        if (i - 3 >= 0 && j + 4 <= formatData[i].length) {
          let correctWord = "";
          let k = 0;
          while (k < 4) {
            correctWord += formatData[i - k][j + k];
            k++;
          }
          if (correctWord === "XMAS") {
            sum++;
          }
        }
        //diagonal to left top
        if (i - 3 >= 0 && j - 3 >= 0) {
          let correctWord = "";
          let k = 0;
          while (k < 4) {
            correctWord += formatData[i - k][j - k];
            k++;
          }
          if (correctWord === "XMAS") {
            sum++;
          }
        }

        //diagonal right bottom
        if (i + 4 <= formatData.length && j + 4 <= formatData[i].length) {
          let correctWord = "";
          let k = 0;
          while (k < 4) {
            correctWord += formatData[i + k][j + k];
            k++;
          }
          if (correctWord === "XMAS") {
            sum++;
          }
        }
        //diagonal left bottom
        if (i + 4 <= formatData.length && j - 3 >= 0) {
          let correctWord = "";
          let k = 0;
          while (k < 4) {
            correctWord += formatData[i + k][j - k];
            k++;
          }
          if (correctWord === "XMAS") {
            sum++;
          }
        }
      }
    }
  }

  return sum;
};
