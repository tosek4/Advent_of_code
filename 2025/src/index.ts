import { DayPlus9 } from "./day-9/day-plus-9";

const Main = () => {
  const result = DayPlus9();
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
