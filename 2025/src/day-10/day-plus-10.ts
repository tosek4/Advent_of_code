import { readFile } from "./readData";

import solver from "javascript-lp-solver";

interface Machine {
  requirements: number[];
  buttons: number[][];
}

function parseInput(input: string): Machine[] {
  const machines: Machine[] = [];

  for (const line of input.split("\n")) {
    if (!line.trim()) continue;

    const reqMatch = line.match(/\{([^}]*)\}/);
    if (!reqMatch) continue;

    const requirements = reqMatch[1].split(",").map(Number);

    const buttonMatches = line.match(/\([^)]*\)/g);

    if (!buttonMatches) continue;

    const buttons = buttonMatches.map((button) =>
      button.slice(1, -1).split(",").filter(Boolean).map(Number),
    );

    machines.push({
      requirements,
      buttons,
    });
  }

  return machines;
}

function solveMachine(machine: Machine): number {
  const model: any = {
    optimize: "cost",
    opType: "min",
    constraints: {},
    variables: {},
    ints: {},
  };

  const buttonCount = machine.buttons.length;
  const counterCount = machine.requirements.length;

  // constraints
  for (let i = 0; i < counterCount; i++) {
    model.constraints[`c${i}`] = {
      equal: machine.requirements[i],
    };
  }

  // variables = buttons
  for (let b = 0; b < buttonCount; b++) {
    const variable: any = {
      cost: 1,
    };

    for (let c = 0; c < counterCount; c++) {
      if (machine.buttons[b].includes(c)) {
        variable[`c${c}`] = 1;
      }
    }

    model.variables[`b${b}`] = variable;

    // important: force integer presses
    model.ints[`b${b}`] = 1;
  }

  const result = solver.Solve(model) as Record<string, any>;
  if (!result.feasible) {
    return -1;
  }

  let presses = 0;

  for (let i = 0; i < buttonCount; i++) {
    presses += result[`b${i}`] ?? 0;
  }

  return Math.round(presses);
}

export const DayPlus10 = async () => {
  const dataRead = "src/day-10/data/data.txt";
  const formatData = await readFile(dataRead);

  const machines = parseInput(formatData);

  let total = 0;

  for (const machine of machines) {
    const result = solveMachine(machine);

    if (result === -1) {
      return -1;
    }

    total += result;
  }

  return total;
};
