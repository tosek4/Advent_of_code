import { DayPlus5 } from "./day-5/dayPlus-5";

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
