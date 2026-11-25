import { readFile } from "./readData";
import { checkCombinationsPlusExample } from "./utils";

export const DayPlus7 = async () => {
  const dataRead = "src/day-7/data/data.txt";
  const formatData = (await readFile(dataRead))
    .split("\n")
    .map((line) => line.split(" "));

  const sumResult = new Map<number, number[]>();
  const result: number[] = [];

  for (let i = 0; i < formatData.length; i++) {
    const [first, ...second] = formatData[i];
    const firstNum = first.split(":").map((num) => parseInt(num))[0];
    const secondNum = second.map((num) => parseInt(num));

    if (sumResult.has(firstNum)) {
      sumResult.get(firstNum)?.push(...secondNum);
    } else {
      sumResult.set(firstNum, secondNum);
    }
  }

  sumResult.forEach((value, key) => {
    const sum = value.reduce((acc, curr) => acc + curr, 0);
    const multiply = value.reduce((acc, curr) => acc * curr, 1);
    if (sum === key || multiply === key) {
      result.push(key);
    } else {
      const combinations = checkCombinationsPlusExample(value, key, true);
      if (combinations !== null) {
        result.push(key);
      }
    }
  });

  return result.reduce((acc, curr) => acc + curr, 0);
};
