import { readFile } from "./readData";

type Position = {
  row: number;
  col: number;
};

export const Day8 = async () => {
  const dataRead = "src/day-8/data/data.txt";
  const formatData = (await readFile(dataRead))
    .split("\n")
    .map((line) => line.split(""));

  const antennas = new Map<string, Position[]>();
  const height = formatData.length;
  const width = formatData[0].length;

  for (let row = 0; row < formatData.length; row++) {
    for (let col = 0; col < formatData[row].length; col++) {
      const currentValue = formatData[row][col];

      if (currentValue !== ".") {
        if (!antennas.has(currentValue)) {
          antennas.set(currentValue, []);
        }

        antennas.get(currentValue)?.push({ row, col });
      }
    }
  }

  const antinodes = new Set<string>();

  antennas.forEach((positions, antenna) => {
    if (positions.length >= 2) {
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const pos1 = positions[i];
          const pos2 = positions[j];

          const rowDiff = pos2.row - pos1.row;
          const colDiff = pos2.col - pos1.col;

          const antinode1 = {
            row: pos1.row - rowDiff,
            col: pos1.col - colDiff,
          };

          const antinode2 = {
            row: pos2.row + rowDiff,
            col: pos2.col + colDiff,
          };

          const candidates = [antinode1, antinode2];

          for (const point of candidates) {
            if (
              point.row >= 0 &&
              point.row < height &&
              point.col >= 0 &&
              point.col < width
            ) {
              antinodes.add(`${point.row},${point.col}`);
            }
          }
        }
      }
    }
  });

  return antinodes.size;
};
