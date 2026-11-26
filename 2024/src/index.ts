import { Day8 } from "./day-8/day-8";

const Main = () => {
  const result = Day8();
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
