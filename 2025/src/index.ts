import { DayPlus11 } from "./day-11/day-plus-11";

const Main = () => {
  const result = DayPlus11();
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
