import { readFile } from "./readData";

export const DayPlus6 = async () => {
  const dataRead = "src/day-6/data/data.txt";
  const data = (await readFile(dataRead)).split("\n");

  let sum = 0;
  let tmpSum = 0;
  let op = "";

  for (let i = 0; i < data[0].length; i++) {
    let tmpNum = 0;
    for (let j = 0; j < data.length - 1; j++) {
      let num = parseInt(data[j][i]);

      const current = data[data.length - 1][i];

      if (current === "+" || current === "*") {
        op = current;
      }

      if (tmpNum === 0 && !Number.isNaN(num)) {
        tmpNum = num;
      } else if (!Number.isNaN(num)) {
        tmpNum = tmpNum * 10 + num;
      }
    }

    if (tmpNum === 0) {
      sum += tmpSum;
      tmpSum = 0;
      continue;
    }

    if (op === "+") {
      tmpSum += tmpNum;
    } else if (op === "*") {
      if (tmpSum === 0) {
        tmpSum += tmpNum;
      } else {
        tmpSum = tmpSum * tmpNum;
      }
    }

    if (i + 1 === data[0].length) {
      sum += tmpSum;
    }
  }

  return sum;
};
