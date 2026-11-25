export function checkCombinations(
  arr: number[],
  result: number,
): number | null {
  if (arr.length === 0) return null;

  function dfs(index: number, currentTotal: number): number | null {
    if (currentTotal > result) {
      return null;
    }

    if (index === arr.length) {
      return currentTotal === result ? result : null;
    }

    const nextNum = arr[index];

    return (
      dfs(index + 1, currentTotal + nextNum) ??
      dfs(index + 1, currentTotal * nextNum)
    );
  }

  return dfs(1, arr[0]);
}


export function checkCombinationsPlusExample(
  arr: number[],
  result: number,
  allowConcat: boolean = true,
): number | null {
  if (arr.length === 0) return null;

  function dfs(index: number, currentTotal: number): number | null {
    if (currentTotal > result) {
      return null;
    }

    if (index === arr.length) {
      return currentTotal === result ? result : null;
    }

    const nextNum = arr[index];

    const addMatch = dfs(index + 1, currentTotal + nextNum);
    if (addMatch !== null) return addMatch;

    const multMatch = dfs(index + 1, currentTotal * nextNum);
    if (multMatch !== null) return multMatch;

    if (allowConcat) {
      const concatenated = Number(`${currentTotal}${nextNum}`);
      const concatMatch = dfs(index + 1, concatenated);
      if (concatMatch !== null) return concatMatch;
    }

    return null;
  }

  return dfs(1, arr[0]);
}
