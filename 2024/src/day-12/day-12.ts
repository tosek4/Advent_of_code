import { readFile } from "./readData";

type LetterCount = {
  letter: string;
  numberCount: number;
  plants: number;
};

const countUniqueLettersInMatrix = (matrix: string[][]): LetterCount[] => {
  const countMap: Record<string, { numberCount: number; plants: number }> = {};

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const letter = matrix[i][j];

      if (!countMap[letter]) {
        countMap[letter] = { numberCount: 0, plants: 0 };
      }

      countMap[letter].numberCount++;

      countMap[letter].plants++;
    }
  }

  const result: LetterCount[] = Object.entries(countMap).map(
    ([letter, data]) => ({
      letter,
      numberCount: data.numberCount,
      plants: data.plants,
    })
  );

  return result;
};

export const Day12 = async () => {
  const data = "src/day-12/data/testDataOne.txt";
  const data2 = "src/day-12/data/testDataTwo.txt";
  const formatData = await readFile(data);

  let sum = 0;
  let countPlants: string[] = [];
  const test = countUniqueLettersInMatrix(formatData.result);
  console.log("t: ", test);
};
