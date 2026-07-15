// import { readFile } from "./readData";

// const calcRoute = (
//   start: string,
//   data: Map<string, string[]>,
//   flag_fft: boolean,
//   flag_dac: boolean,
// ): number => {
//   const path = data.get(start) ?? [];
//   let sum = 0;

//   for (let i = 0; i < path.length; i++) {
//     const el = path[i];
//     if (el === "dac") {
//       flag_dac = true;
//     }
//     if (el === "fft") {
//       flag_fft = true;
//     }

//     if (el === "out") {
//       if (flag_dac && flag_fft) {
//         sum++;
//       }
//       break;
//     } else {
//       sum += calcRoute(el, data, flag_fft, flag_dac);
//     }
//   }
//   return sum;
// };

// export const DayPlus11 = async () => {
//   const dataRead = "src/day-11/data/data.txt";
//   const formatData = (await readFile(dataRead))
//     .trim()
//     .split("\n")
//     .map((el) => el.split(":"));
//   const mapData = new Map<string, string[]>();
//   for (const row of formatData) {
//     const first = row[0];
//     const rest = row[1].trim().split(" ");

//     mapData.set(first, rest);
//   }

//   return calcRoute("svr", mapData, false, false);
// };
//this is my solution but got struck for big data

import { readFile } from "./readData";

const memo = new Map<string, number>();

const calcRoute = (
  node: string,
  data: Map<string, string[]>,
  hasFFT: boolean,
  hasDAC: boolean,
): number => {
  const key = `${node}|${hasFFT}|${hasDAC}`;

  if (memo.has(key)) {
    return memo.get(key)!;
  }

  if (node === "out") {
    return hasFFT && hasDAC ? 1 : 0;
  }

  let sum = 0;

  const nextNodes = data.get(node) ?? [];

  for (const next of nextNodes) {
    sum += calcRoute(
      next,
      data,
      hasFFT || next === "fft",
      hasDAC || next === "dac",
    );
  }

  memo.set(key, sum);

  return sum;
};

export const DayPlus11 = async () => {
  const dataRead = "src/day-11/data/data.txt";

  const lines = (await readFile(dataRead))
    .trim()
    .split("\n");

  const graph = new Map<string, string[]>();

  for (const line of lines) {
    const [from, to] = line.split(":");

    graph.set(
      from.trim(),
      to.trim().split(/\s+/),
    );
  }

  memo.clear();

  return calcRoute("svr", graph, false, false);
};