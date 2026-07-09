import { readFile } from "./readData";

const isInvalidNNumber = (s: string): boolean => {
  for (let len = 1; len <= Math.floor(s.length / 2); len++) {
    const pattern = s.substring(0, len);

    let count = 1;
    let i = len;

    while (i + len <= s.length) {
      if (s.substring(i, i + len) === pattern) {
        count++;
      } else {
        break;
      }

      i += len;
    }

    // Important: i must reach the end
    if (count >= 2 && i === s.length) {
      return true;
    }
  }

  return false;
};

export const DayPlus2 = async () => {
  const dataRead = "src/day-2/data/data.txt";
  const formatData = (await readFile(dataRead)).split(",");
  let sum = 0;
  for (const item of formatData) {
    const [start, end] = item.split("-").map(Number);

    for (let i = start; i <= end; i++) {
      if (isInvalidNNumber(i.toString())) {
        sum += i;
      }
    }
  }
  return sum;
};
