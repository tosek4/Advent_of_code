import { readFile } from "./readData";

export const DayPlus7 = async () => {
  const dataRead = "src/day-7/data/data.txt";
  const grid = (await readFile(dataRead))
    .trim()
    .split("\n")
    .map((row) => row.split(""));

  let startCol = grid[0].indexOf("S");

  const memo = new Map<string, number>();

  function countTimelines(row: number, col: number): number {
    // particle left the manifold
    if (row >= grid.length) {
      return 1;
    }

    const key = `${row},${col}`;

    // already calculated this position
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    const current = grid[row][col];

    let result = 0;

    // empty space -> continue downward
    if (current === ".") {
      result = countTimelines(row + 1, col);
    }

    // splitter -> left + right timelines
    if (current === "^") {
      result =
        countTimelines(row + 1, col - 1) + countTimelines(row + 1, col + 1);
    }

    memo.set(key, result);

    return result;
  }

  const answer = countTimelines(1, startCol);

  return answer;
};
