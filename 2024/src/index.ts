import { Day1Plus } from "./day-1/dayPlus-1";
import { Day4 } from "./day-4/day-4";

const Main = () => {
  const result = Day4();
  return result;
};

(async () => {
  try {
    const mainResult = await Main();
    console.log("Result: ", mainResult);
  } catch (error) {
    console.error("Error in Main:", error);
  }
})();
