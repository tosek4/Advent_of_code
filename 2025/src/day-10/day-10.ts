import { readFile } from "./readData";

const findMin = (buttons: number[][], target: number[]) => {
  for (let size = 1; size <= buttons.length; size++) {
    const result = findCombination(buttons, size, target, 0, []);

    if (result) {
      return size;
    }
  }

  return 0;
};

const findCombination = (
  buttons: number[][],
  size: number,
  target: number[],
  start: number,
  current: number[][],
): boolean => {
  if (current.length === size) {
    const light = Array(target.length).fill(0);

    for (const button of current) {
      for (const index of button) {
        light[index] ^= 1;
      }
    }

    return light.every((v, i) => v === target[i]);
  }

  for (let i = start; i < buttons.length; i++) {
    current.push(buttons[i]);
    if (findCombination(buttons, size, target, i + 1, current)) {
      return true;
    }

    current.pop();
  }

  return false;
};

export const Day10 = async () => {
  const dataRead = "src/day-10/data/data.txt";
  const formatData = (await readFile(dataRead))
    .trim()
    .split("\n")
    .map((el) => el.split(" "));

  let res = 0;

  for (const row of formatData) {
    const light: number[] = [];
    const coordinate: number[][] = [];
    const r0 = row[0];

    const rowFormat = row
      .slice(1, -1)
      .map((el) => el.slice(1, -1).trim().split(","));

    for (const rf of rowFormat) {
      coordinate.push(rf.map((el) => parseInt(el)));
    }

    for (let i = 1; i < r0.length - 1; i++) {
      if (r0[i] === "#") {
        light.push(1);
      } else {
        light.push(0);
      }
    }
    res += findMin(coordinate, light);
  }
  return res;
};
