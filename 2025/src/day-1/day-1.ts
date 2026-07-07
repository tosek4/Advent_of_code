import { readFile } from "./readData";

export const Day1 = async () => {
  const data2 = "src/day-1/data/data.txt";
  const formatData = (await readFile(data2)).split(/\r?\n/).filter(Boolean);
  let startPosition = 50;
  let sum = 0;
  for (const item of formatData) {
    const direction = item[0];
    const value = Number(item.slice(1));
    if (direction === "L") {
      startPosition -= value;
      if (startPosition < 0) {
        while (startPosition < 0) {
          startPosition += 100;
        }
      }
    } else if (direction === "R") {
      startPosition += value;
      if (startPosition > 100) {
        while (startPosition > 100) {
          startPosition -= 100;
        }
      }
    }

    if (
      startPosition === 0 ||
      startPosition === 100 ||
      startPosition === -100
    ) {
      sum++;
    }
  }
  return sum;
};
