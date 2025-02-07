import * as fs from "fs";
import * as path from "path";

export const readFile = (
  filePath: string
): Promise<{ arr1: number[]; arr2: number[] }> => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);

    fs.readFile(absolutePath, "utf8", (err, data) => {
      if (err) {
        reject(new Error("Error reading file: " + err.message));
        return;
      }
      const lines = data.trim().split("\n");

      let arr1: number[] = [];
      let arr2: number[] = [];
      lines.forEach((element) => {
        const [value1, value2] = element.split("  ").map(Number);
        arr1.push(value1);
        arr2.push(value2);
      });

      resolve({ arr1, arr2 });
    });
  });
};
