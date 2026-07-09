import { DayPlus1 } from "./day-1/dayPlus-1";

const Main = () => {
  const result = DayPlus1();
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
