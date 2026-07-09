import { readFile } from "./readData";

export const Day3 = async () => {
  const dataRead = "src/day-3/data/data.txt";
  const formatData = (await readFile(dataRead)).split("\n");
  let sum = 0;
  for (const line of formatData) {
    let maxNum = 0;
    for (let i = 0; i < line.length; i++) {
      for (let j = i + 1; j < line.length; j++) {
        const num = parseInt(line[i]) * 10 + parseInt(line[j]);
        if (num > maxNum) {
          maxNum = num;
        }
      }
    }
    sum += maxNum;
  }
  return sum;
};
