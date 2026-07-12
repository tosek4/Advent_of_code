
import { readFile } from "./readData";

export const DayPlus7 = async () => {
  const dataRead = "src/day-7/data/data.txt";
  const formatData = (await readFile(dataRead))
  
  return 0
}
