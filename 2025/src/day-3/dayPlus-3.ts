import { readFile } from "./readData";

function maxSubsequence(s: string, k: number): string {
  let result = "";
  let start = 0;

  while (k > 0) {
    let best = start;
    const end = s.length - k;

    for (let i = start; i <= end; i++) {
      if (s[i] > s[best]) {
        best = i;

        // Can't beat 9
        if (s[best] === "9") break;
      }
    }

    result += s[best];
    start = best + 1;
    k--;
  }

  return result;
}

export const DayPlus3 = async () => {
  const dataRead = "src/day-3/data/data.txt";
  const formatData = (await readFile(dataRead)).split("\n");
  let sum = 0;
  for (const line of formatData) {
    sum += parseInt(maxSubsequence(line, 12));
  }
  return sum;
};
