import * as fs from "fs";
import * as path from "path";

export const readFile = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);

    fs.readFile(absolutePath, "utf8", (err, data) => {
      if (err) {
        reject(new Error("Error reading file: " + err.message));
        return;
      }
      resolve(data);
    });
  });
};
