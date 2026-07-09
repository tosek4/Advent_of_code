import { readFile } from "./readData";

export const DayPlus1 = async () => {
  const data = "src/day-1/data/data.txt";

  const rotations = (await readFile(data)).split(/\r?\n/).filter(Boolean);
  let position = 50;
  let password = 0;

  for (const item of rotations) {
    const direction = item[0];
    const value = Number(item.slice(1));

    // full rotations
    password += Math.floor(value / 100);
    const move = value % 100;

    if (direction === "R") {
      if (position + move >= 100) {
        password++;
      }

      position = (position + move) % 100;
    } else {
      if (position - move <= 0 && position !== 0) {
        password++;
      }

      position = (position - move + 100) % 100;
    }
  }

  return password;
};
