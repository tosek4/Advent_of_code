import { DayPlus10 } from "./day-10/day-plus-10";

const Main = () => {
  const result = DayPlus10();
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
