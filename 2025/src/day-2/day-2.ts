import { readFile } from "./readData";

const isHalfPalindrome = (num: number): boolean => {
  const str = num.toString();

  if (str.length % 2 !== 0) {
    return false;
  }

  const middle = str.length / 2;

  const left = str.slice(0, middle);
  const right = str.slice(middle);

  return left === right;
};

export const Day2 = async () => {
  const dataRead = "src/day-2/data/data.txt";
  const formatData = (await readFile(dataRead)).split(",");
  let sum = 0;
  for (const item of formatData) {
    const [start, end] = item.split("-").map(Number);

    for (let i = start; i <= end; i++) {
      if (isHalfPalindrome(i)) {
        sum += i;
      }
    }
  }
  return sum;
};
