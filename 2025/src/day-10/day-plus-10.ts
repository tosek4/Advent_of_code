//all the solutions were stuck and I was getting time out

// import { readFile } from "./readData";

// export const DayPlus10 = async () => {
//   const dataRead = "src/day-10/data/data.txt";
//   const formatData = (await readFile(dataRead))
//     .trim()
//     .split("\n")
//     .map((el) => el.split(" "));

//   let res = 0;

//   for (const row of formatData) {
//     let tmpSolution = 0;
//     const targetFormat = row[row.length - 1].slice(1, -1).trim().split(",");
//     const buttons: number[][] = [];
//     const target: number[] = [];

//     const rowFormat = row
//       .slice(1, -1)
//       .map((el) => el.slice(1, -1).trim().split(","));

//     for (const rf of rowFormat) {
//       buttons.push(rf.map((el) => parseInt(el)));
//     }
//     for (const t of targetFormat) {
//       target.push(parseInt(t));
//     }
//   }
//   return res;
// };


