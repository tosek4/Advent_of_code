import { readFile } from "./readData";
const extractValidMul = (input: string): string[] => {
  const regex = /mul\(\d+,\d+\)/g;
  return input.match(regex) || [];
};
export const Day3 = async () => {
  const data = "src/day-3/data/data-3.txt";
  const data2 = "src/day-3/data/testData-3.txt";

  const formatData = await readFile(data);
  const newArr = extractValidMul(formatData);
  let sum = 0;
  newArr.forEach((el) => {
    const number = el.slice(4).split(")")[0].split(",");
    sum = sum + Number(number[0]) * Number(number[1]);
  });
  return sum;
};
