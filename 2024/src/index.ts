import { DayPlus8 } from "./day-8/day-plus-8";

const Main = () => {
  const result = DayPlus8();
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
