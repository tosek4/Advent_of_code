import { Day1 } from "./day-1/day-1";

const Main = () => {
  const result = Day1();
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
