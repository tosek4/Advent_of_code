
import { readFile } from "./readData";

export const DayPlus9 = async () => {
  const dataRead = "src/day-9/data/data.txt";
  const formatData = (await readFile(dataRead))
  
  return 0
}
