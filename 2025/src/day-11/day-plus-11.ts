
import { readFile } from "./readData";

export const DayPlus11 = async () => {
  const dataRead = "src/day-11/data/data.txt";
  const formatData = (await readFile(dataRead))
  
  return 0
}
