import { readFile } from "./readData";

export const Day1Plus = async () => {
  const data = "src/day-1/data/dataDay-1.txt";

  const formatData = await readFile(data);

  const arrayOne = formatData.arr1.sort((a, b) => a - b);
  const arrayTwo = formatData.arr2.sort((a, b) => a - b);

  let sum = 0;

  for (let i = 0; i < arrayOne.length; i++) {
    const num1 = arrayOne[i];
    let matchingElement = 0;
    arrayTwo.forEach((element) => {
      if (element === num1) {
        matchingElement++;
      }
    });
    if (matchingElement) {
      sum = sum + num1 * matchingElement;
    }
  }

  return sum;
};
