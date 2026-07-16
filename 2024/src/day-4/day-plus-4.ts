import { readFile } from "./readData";

export const DayPlus4 = async () => {
  const data2 = "src/day-4/data/data.txt";
  const formatData = (await readFile(data2))
    .trim()
    .split("\n")
    .map((el) => el.split(""));

  let sum = 0;
  for (let i = 0; i < formatData.length; i++) {
    for (let j = 0; j < formatData[i].length; j++) {
      if (formatData[i][j] === "A") {
        // diagonal to right top
        if (
          i - 1 >= 0 &&
          i + 1 < formatData.length &&
          j - 1 >= 0 &&
          j + 1 < formatData[i].length
        ) {
          let validM = false;
          let validS = false;
          /*
            M.S
            .A.
            M.S
          */

          if (
            formatData[i - 1][j - 1] === "M" &&
            formatData[i + 1][j - 1] === "M"
          ) {
            validM = true;
          }
          if (
            formatData[i - 1][j + 1] === "S" &&
            formatData[i + 1][j + 1] === "S"
          ) {
            validS = true;
          }

          /*
            M.M
            .A.
            S.S
          */
          if (
            formatData[i - 1][j - 1] === "M" &&
            formatData[i - 1][j + 1] === "M"
          ) {
            validM = true;
          }
          if (
            formatData[i + 1][j - 1] === "S" &&
            formatData[i + 1][j + 1] === "S"
          ) {
            validS = true;
          }

          /*
            S.M
            .A.
            S.M
          */
          if (
            formatData[i - 1][j + 1] === "M" &&
            formatData[i + 1][j + 1] === "M"
          ) {
            validM = true;
          }
          if (
            formatData[i - 1][j - 1] === "S" &&
            formatData[i + 1][j - 1] === "S"
          ) {
            validS = true;
          }

          /*
            S.S
            .A.
            M.M
          */
          if (
            formatData[i + 1][j - 1] === "M" &&
            formatData[i + 1][j + 1] === "M"
          ) {
            validM = true;
          }
          if (
            formatData[i - 1][j + 1] === "S" &&
            formatData[i - 1][j - 1] === "S"
          ) {
            validS = true;
          }

          if (validM && validS) {
            sum++;
          }
        }
      }
    }
  }

  return sum;
};
