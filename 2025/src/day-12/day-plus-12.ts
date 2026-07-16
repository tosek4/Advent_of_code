
import { readFile } from "./readData";

export const DayPlus12 = async () => {
  const dataRead = "src/day-12/data/data.txt";
  const formatData = (await readFile(dataRead))
  
  return 0
}
