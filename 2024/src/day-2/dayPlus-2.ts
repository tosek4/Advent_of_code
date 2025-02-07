import { readFile } from "./readData";

const isSafe = (arr: number[]): boolean => {
  const firstDiffSign = Math.sign(arr[1] - arr[0]);
  let safe = true;

  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i];
    const absDiff = Math.abs(diff);

    if (absDiff < 1 || absDiff > 3) {
      safe = false;
    }

    if (Math.sign(diff) !== firstDiffSign) {
      safe = false;
    }
  }

  return safe;
};

export const DayPlus2 = async (): Promise<number> => {
  const data = "src/day-2/data/dataDay-2.txt";
  const data2 = "src/day-2/data/testData-2.txt";

  const formatData = await readFile(data);
  let numOfSafe = 0;

  for (const level of formatData.result) {
    if (isSafe(level)) {
      numOfSafe++;
      continue;
    }

    for (let i = 0; i < level.length; i++) {
      const modifiedLevel = [...level.slice(0, i), ...level.slice(i + 1)];
      if (isSafe(modifiedLevel)) {
        numOfSafe++;
        break;
      }
    }
  }
  // correct answer is 589
  return numOfSafe;
};
