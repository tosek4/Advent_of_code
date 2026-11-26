
import { readFile } from "./readData";

export const DayPlus8 = async () => {
  const dataRead = "src/day-8/data/data.txt";
  const formatData = (await readFile(dataRead))
  
  return 0
}
