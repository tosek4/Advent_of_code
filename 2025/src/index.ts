import { Day7 } from "./day-7/day-7";

const Main = () => {
  const result = Day7();
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
