import { readFile } from "./readData";

export const Day4 = async () => {
  const data2 = "src/day-4/data/testData.txt";
  const formatData = await readFile(data2);
  let sum = 0;
  for (let i = 0; i < formatData.length; i++) {
    for (let j = 0; j < formatData[i].length; j++) {
      if (formatData[i][j] === "x") {
        if (i > 2) {
          //check up - upDiagonal
        }
      }
    }
  }

  return sum;
};
