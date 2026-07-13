import { Day9 } from "./day-9/day-9";

const Main = () => {
  const result = Day9();
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
