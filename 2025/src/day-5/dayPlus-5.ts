import { readFile } from "./readData";

export const DayPlus5 = async () => {
  const dataRead = "src/day-5/data/data.txt";
  const formatData = await readFile(dataRead);

  const [intervalPart, numbersPart] = formatData.trim().split("\n\n");

  const intervals = intervalPart.split("\n");
  intervals.sort((a, b) => {
    const [startA, endA] = a.split("-").map(Number);
    const [startB, endB] = b.split("-").map(Number);
    return startA - startB || endA - endB;
  });
  const newIntervals: string[] = [];
  let sum = 0;
  for (const interval of intervals) {
    const [start, end] = interval.split("-").map(Number);
    if (newIntervals.length === 0) {
      newIntervals.push(interval);
    }

    const [startNew, endNew] = newIntervals[newIntervals.length - 1]
      .split("-")
      .map(Number);

    if (endNew >= start && endNew <= end) {
      newIntervals[newIntervals.length - 1] = `${startNew}-${end}`;
    } else if (endNew >= start && endNew >= end) {
      continue;
    } else {
      newIntervals.push(interval);
    }
  }

  for (const newInterval of newIntervals) {
    const [start, end] = newInterval.split("-").map(Number);
    sum += end - start + 1;
  }
  return sum;
};
