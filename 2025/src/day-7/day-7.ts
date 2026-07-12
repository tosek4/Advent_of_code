import { readFile } from "./readData";

export const Day7 = async () => {
  const dataRead = "src/day-7/data/data.txt";
  const formatData = (await readFile(dataRead))
    .split("\n")
    .map((row) => row.split(""));

  const indexOfS = formatData[0].indexOf("S");
  let c: number[] = [indexOfS];
  let sum = 0;

  for (let i = 1; i < formatData.length; i++) {
    for (let j = 0; j < formatData[i].length; j++) {
      if (formatData[i][j] === "^") {
        if (c.includes(j)) {
          c = c.filter((el) => el !== j);

          if (!c.includes(j - 1)) {
            c.push(j - 1);
          }
          if (!c.includes(j + 1)) {
            c.push(j + 1);
          }
          sum++;
        }
      }
    }
  }
  return sum;
};
