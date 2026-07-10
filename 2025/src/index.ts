import { DayPlus4 } from "./day-4/dayPlus-4";

const Main = () => {
  const result = DayPlus4();
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
