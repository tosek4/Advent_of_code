import { readFile } from "./readData";

export const DayPlus5 = async () => {
  const dataRead = "src/day-5/data/data.txt";
  const data = await readFile(dataRead);
  const formatData = data.split("\n");

  let incorrectPages: number[][] = [];

  const pageOrder = formatData.slice(0, formatData.indexOf("")).map((line) => {
    const pages = line.split("|").map(Number);
    return { firstPage: pages[0], secondPage: pages[1] };
  });

  const pageProduct = formatData
    .slice(formatData.indexOf("") + 1)
    .map((line) => {
      return line.split(",").map(Number);
    });

  for (let i = 0; i < pageProduct.length; i++) {
    let flag = false;
    for (let j = 0; j < pageProduct[i].length; j++) {
      for (let k = j + 1; k < pageProduct[i].length; k++) {
        const firstPage = pageProduct[i][j];
        const secondPage = pageProduct[i][k];
        if (
          !pageOrder.find(
            (order) =>
              order.firstPage === firstPage && order.secondPage === secondPage,
          )
        ) {
          flag = true;
        }
      }
    }
    if (flag) {
      incorrectPages.push(pageProduct[i]);
    }
  }

  for (let i = 0; i < incorrectPages.length; i++) {
    for (let j = 0; j < incorrectPages[i].length; j++) {
      for (let k = j + 1; k < incorrectPages[i].length; k++) {
        const firstPage = incorrectPages[i][j];
        const secondPage = incorrectPages[i][k];
        if (
          !pageOrder.find(
            (order) =>
              order.firstPage === firstPage && order.secondPage === secondPage,
          )
        ) {
          incorrectPages[i][j] = secondPage;
          incorrectPages[i][k] = firstPage;
        }
      }
    }
  }
  let totalPrintedPages = 0;

  incorrectPages.forEach((pages) => {
    totalPrintedPages += pages[Math.floor(pages.length / 2)];
  });

  return totalPrintedPages;
};
