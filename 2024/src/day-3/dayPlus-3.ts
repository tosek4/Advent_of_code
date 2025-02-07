import { readFile } from "./readData";

const extractValidMulWithExclusion = (input: string): string => {
  while (true) {
    const startIndex = input.indexOf("don't(");
    if (startIndex === -1) break;

    const endIndex = input.indexOf("do()", startIndex);

    if (endIndex === -1) {
      input = input.slice(0, startIndex);
      break;
    } else {
      input =
        input.slice(0, startIndex) + input.slice(endIndex + "do()".length);
    }
  }
  return input;
};

const extractValidMul = (input: string): string[] => {
  const regex = /mul\(\d+,\d+\)/g;
  return input.match(regex) || [];
};
export const DayPlus3 = async () => {
  const data = "src/day-3/data/data-3.txt";
  const data2 = "src/day-3/data/testData-3.txt";

  const formatData = await readFile(data);
  const newArr = extractValidMulWithExclusion(formatData);
  const finall = extractValidMul(newArr);
  let sum = 0;

  finall.forEach((el) => {
    const number = el.slice(4).split(")")[0].split(",");
    sum = sum + Number(number[0]) * Number(number[1]);
  });

  return sum;
};
