import { DayPlus7 } from "./day-7/day-plus-7";

const Main = () => {
  const result = DayPlus7();
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
