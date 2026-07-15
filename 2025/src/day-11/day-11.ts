import { readFile } from "./readData";

const calcRoute = (start: string, data: Map<string, string[]>): number => {
  const path = data.get(start) ?? [];
  let sum = 0;
  for (let i = 0; i < path.length; i++) {
    const el = path[i];

    if (el === "out") {
      sum++;
    } else {
      sum += calcRoute(el, data);
    }
  }
  return sum;
};

export const Day11 = async () => {
  const dataRead = "src/day-11/data/data.txt";
  const formatData = (await readFile(dataRead))
    .trim()
    .split("\n")
    .map((el) => el.split(":"));
  const mapData = new Map<string, string[]>();
  for (const row of formatData) {
    const first = row[0];
    const rest = row[1].trim().split(" ");

    mapData.set(first, rest);
  }

  return calcRoute("you", mapData);
};
