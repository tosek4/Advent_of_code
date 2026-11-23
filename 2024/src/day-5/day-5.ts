import { readFile } from "./readData";

export const Day5 = async () => {
  const dataRead = "src/day-5/data/data.txt";
  const data = await readFile(dataRead);
  const formatData = data.split("\n");

  let printedPages: number[][] = [];

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

    if (!flag) {
      printedPages.push(pageProduct[i]);
    }
  }
  let totalPrintedPages = 0;

  printedPages.forEach((pages) => {
    totalPrintedPages += pages[Math.floor(pages.length / 2)];
  });

  return totalPrintedPages;
};
