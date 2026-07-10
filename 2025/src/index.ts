import { Day6 } from "./day-6/day-6";

const Main = () => {
  const result = Day6();
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
