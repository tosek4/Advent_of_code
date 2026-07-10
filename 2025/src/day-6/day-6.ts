import { readFile } from "./readData";
export const Day6 = async () => {
  const dataRead = "src/day-6/data/data.txt";
  const data = (await readFile(dataRead)).split("\n");

  const formatData = data?.map((item) =>
    item.split(" ").filter((el) => el !== ""),
  );

  let sum = 0;
  const operations = formatData[formatData.length - 1];

  for (let i = 0; i < operations?.length; i++) {
    let tmpSum = 0;
    for (let j = 0; j < formatData.length - 1; j++) {
      if (operations[i] === "+") {
        tmpSum += parseInt(formatData[j][i]);
      } else if (operations[i] === "*") {
        if (tmpSum === 0) {
          tmpSum = 1;
        }

        tmpSum = tmpSum * parseInt(formatData[j][i]);
      }
    }

    sum += tmpSum;
  }

  return sum;
};
