import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

export const fetchAdventData = async (day: string): Promise<string> => {
  try {
    const response = await axios.get(
      `https://adventofcode.com/2024/day/${day}/input`,
      {
        headers: {
          Cookie: `session=${process.env.AOC_SESSION}`, // Ensure this environment variable is set
        },
      }
    );
    console.log("fetching data success");

    return response.data.trim();
  } catch (error) {
    throw new Error("Failed to fetch Advent of Code input data");
  }
};
