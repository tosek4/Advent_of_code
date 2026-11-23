import { DayPlus5 } from "./day-5/day-plus-5";

const Main = () => {
  const result = DayPlus5();
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
