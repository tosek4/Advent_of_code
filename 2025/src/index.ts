import { Day11 } from "./day-11/day-11";

const Main = () => {
  const result = Day11();
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
