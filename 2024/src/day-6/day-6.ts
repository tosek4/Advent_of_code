import { readFile } from "./readData";

export const Day6 = async () => {
  const dataRead = "src/day-6/data/data.txt";
  const formatData = (await readFile(dataRead))
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));

  let movingPosition: string = "up";
  const maxX: number = formatData.length;
  const maxY: number = formatData[0].length;

  const visited = new Set<string>();

  const addCoordinate = (x: number, y: number): void => {
    visited.add(`${x},${y}`);
  };

  const hasCoordinate = (x: number, y: number): boolean => {
    return visited.has(`${x},${y}`);
  };

  const startingPositionX: number = formatData.findIndex((line) =>
    line.includes("^"),
  );
  const startingPositionY: number = formatData[startingPositionX].findIndex(
    (line) => line === "^",
  );

  let guardPosition: { x: number; y: number } = {
    x: startingPositionX,
    y: startingPositionY,
  };

  formatData[guardPosition.x][guardPosition.y] = ".";
  addCoordinate(guardPosition.x, guardPosition.y);

  while (true) {
    if (movingPosition === "up") {
      if (guardPosition?.x - 1 < 0 || guardPosition?.y >= maxY) {
        break;
      }
      if (formatData[guardPosition.x - 1][guardPosition.y] === ".") {
        guardPosition.x--;
        if (!hasCoordinate(guardPosition.x, guardPosition.y)) {
          addCoordinate(guardPosition.x, guardPosition.y);
        }
      } else if (formatData[guardPosition.x - 1][guardPosition.y] === "#") {
        movingPosition = "right";
      }
    } else if (movingPosition === "down") {
      if (guardPosition?.x + 1 >= maxX || guardPosition?.y >= maxY) {
        break;
      } else if (formatData[guardPosition?.x + 1][guardPosition?.y] === ".") {
        guardPosition.x++;
        if (!hasCoordinate(guardPosition.x, guardPosition.y)) {
          addCoordinate(guardPosition.x, guardPosition.y);
        }
      } else if (formatData[guardPosition?.x + 1][guardPosition?.y] === "#") {
        movingPosition = "left";
      }
    } else if (movingPosition === "left") {
      if (guardPosition?.x < 0 || guardPosition?.y - 1 < 0) {
        break;
      }
      if (formatData[guardPosition.x][guardPosition.y - 1] === ".") {
        guardPosition.y--;
        if (!hasCoordinate(guardPosition.x, guardPosition.y)) {
          addCoordinate(guardPosition.x, guardPosition.y);
        }
      } else if (formatData[guardPosition.x][guardPosition.y - 1] === "#") {
        movingPosition = "up";
      }
    } else if (movingPosition === "right") {
      if (guardPosition?.x < 0 || guardPosition?.y + 1 >= maxY) {
        break;
      }
      if (formatData[guardPosition.x][guardPosition.y + 1] === ".") {
        guardPosition.y++;
        if (!hasCoordinate(guardPosition.x, guardPosition.y)) {
          addCoordinate(guardPosition.x, guardPosition.y);
        }
      } else if (formatData[guardPosition.x][guardPosition.y + 1] === "#") {
        movingPosition = "down";
      }
    }
  }

  return visited.size;
};
