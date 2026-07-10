import * as fs from "fs";
import * as path from "path";
import { fetchAdventData } from "../services/data-service";

const day = process.argv[2];

if (!day) {
  console.error("Missing day argument");
  process.exit(1);
}

const folderName = `day-${day}`;
const folderPlusName = `day-plus-${day}`;
const folderPath = path.join(__dirname, "../src", folderName);
const tsFileName = `${folderName}.ts`;
const readDataFile = `readData.ts`;
const dataFolderPath = path.join(folderPath, "data");
const dataFilePath = path.join(dataFolderPath, "data.txt");
const testDataFilePath = path.join(dataFolderPath, "testData.txt");
const tsFilePlus = `${folderPlusName}.ts`;

const template = `
import { readFile } from "./readData";

export const Day${day} = async () => {
  const dataRead = "src/day-${day}/data/data.txt";
  const formatData = (await readFile(dataRead))
    return 0
}
`;

const templatePlus = `
import { readFile } from "./readData";

export const DayPlus${day} = async () => {
  const dataRead = "src/day-${day}/data/data.txt";
  const formatData = (await readFile(dataRead))
    return 0
}
`;

const templateReadData = `
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
`;

try {
  // Create main folder
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Folder "${folderName}" created.`);
  }

  // Create .ts file inside main folder
  const tsFilePath: string = path.join(folderPath, tsFileName);
  if (!fs.existsSync(tsFilePath)) {
    fs.writeFileSync(tsFilePath, template);
    console.log(`File "${tsFileName}" created.`);
  }

  // Create readData file inside main folder
  const tsReadData: string = path.join(folderPath, `readData.ts`);
  if (!fs.existsSync(tsReadData)) {
    fs.writeFileSync(tsReadData, templateReadData);
    console.log(`File "${readDataFile}" created.`);
  }

  // Create day-plus .ts file inside main folder
  if (!fs.existsSync(tsFilePlus)) {
    fs.writeFileSync(tsFilePlus, templatePlus);
    console.log(`File "${tsFilePlus}" created.`);
  }

  // Create data folder
  if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath);
    console.log(`Folder "data" created.`);
  }

  fetchAdventData(day)
    .then((data) => {
      // Create data.txt inside data folder
      if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, data);
        console.log(`File "data.txt" created.`);
      }
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
    });

  if (!fs.existsSync(testDataFilePath)) {
    fs.writeFileSync(testDataFilePath, "");
    console.log(`File "testData.txt" created.`);
  }

  console.log("Project structure created successfully!");
} catch (err) {
  if (err instanceof Error) {
    console.error("Error:", err.message);
  } else {
    console.error("Unknown error occurred:", err);
  }
}
