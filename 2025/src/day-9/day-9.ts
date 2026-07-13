import { readFile } from "./readData";

export const Day9 = async () => {
  const dataRead = "src/day-9/data/data.txt";
  const formatData = (await readFile(dataRead))
    .trim()
    .split("\n")
    .map((line) => line.split(",").map(Number));

  let maxArea = 0;
  for (let i = 0; i < formatData.length; i++) {
    for (let j = i + 1; j < formatData.length; j++) {
      const f = formatData[i];
      const s = formatData[j];
      const width = Math.abs(f[0] - s[0]) + 1;
      const height = Math.abs(f[1] - s[1]) + 1;
      const area = width * height;

      if (maxArea < area) {
        maxArea = area;
      }
    }
  }

  return maxArea;
};
