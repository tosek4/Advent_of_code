import { readFile } from "./readData";

export const Day5 = async () => {
  const dataRead = "src/day-5/data/data.txt";
  const formatData = await readFile(dataRead);

  const [intervalPart, numbersPart] = formatData.trim().split("\n\n");

  const intervals = intervalPart.split("\n");
  const numbers = numbersPart.split("\n").map(Number);

  let sum = 0;
  for (const number of numbers) {
    for (const interval of intervals) {
      const [start, end] = interval.split("-").map(Number);
      if (number >= start && number <= end) {
        sum++;
        break;
      }
    }
  }
  return sum;
};
