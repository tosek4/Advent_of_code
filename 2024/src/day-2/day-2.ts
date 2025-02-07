import { readFile } from "./readData";

export const Day2 = async () => {
  const data = "src/day-2/data/dataDay-2.txt";
  const data2 = "src/day-2/data/testData-2.txt";

  let saveReports = 0;
  let isIncrement;
  const formatData = await readFile(data2);
  for (let i = 0; i < formatData.result.length; i++) {
    let flag = 0;

    const element = formatData.result[i];
    for (let j = 1; j < element.length; j++) {
      if (j - 1 === 0) {
        isIncrement = element[j] < element[j + 1];
      }
      if (element[j - 1] === element[j]) {
        flag++;
      } else if (isIncrement) {
        if (element[j - 1] > element[j]) {
          flag++;
        }
      } else {
        if (element[j - 1] < element[j]) {
          flag++;
        }
      }
      if (Math.abs(element[j - 1] - element[j]) > 3) {
        flag++;
      }
    }

    if (flag === 0) {
      saveReports++;
    }
  }
  // correct answer is 549
  return saveReports;
};
