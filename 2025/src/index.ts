import { Day5 } from "./day-5/day-5";

const Main = () => {
  const result = Day5();
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
