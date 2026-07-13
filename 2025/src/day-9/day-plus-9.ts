// import { readFile } from "./readData";

// export const DayPlus9 = async () => {
//   const dataRead = "src/day-9/data/data.txt";
//   const formatData = (await readFile(dataRead))
//     .trim()
//     .split("\n")
//     .map((line) => line.split(",").map(Number));

//   let mark: number[][] = [...formatData];
//   let maxArea = 0;
//   console.log("aaaa");
//   for (let i = 0; i < formatData.length; i++) {
//     for (let j = i + 1; j < formatData.length; j++) {
//       const f = formatData[i];
//       const s = formatData[j];

//       if (f[0] === s[0] && f[1] !== s[1]) {
//         if (f[1] > s[1]) {
//           let k = f[1] - 1;

//           while (k > s[1]) {
//             const n = [f[0], k];
//             if (!mark.some((el) => el === n)) {
//               mark.push(n);
//             }
//             k--;
//           }
//         } else if (f[1] < s[1]) {
//           let k = s[1] - 1;
//           while (k > f[1]) {
//             const n = [f[0], k];

//             if (!mark.some((el) => el === n)) {
//               mark.push(n);
//             }
//             k--;
//           }
//         }
//       }

//       if (f[0] !== s[0] && f[1] === s[1]) {
//         if (f[0] > s[0]) {
//           let k = f[0] - 1;
//           while (k > s[0]) {
//             const n = [k, f[1]];
//             if (!mark.some((el) => el === n)) {
//               mark.push(n);
//             }
//             k--;
//           }
//         } else if (f[0] < s[0]) {
//           let k = s[0] - 1;
//           while (k > f[0]) {
//             const n = [k, f[1]];
//             if (!mark.some((el) => el === n)) {
//               mark.push(n);
//             }
//             k--;
//           }
//         }
//       }
//     }
//   }
//   console.log("mark", mark);
//   const sortMark = mark.sort((a, b) => {
//     if (a[0] === b[0]) {
//       return a[1] - b[1];
//     }

//     return a[0] - b[0];
//   });

//   const minY = Math.min(...sortMark.map((point) => point[1]));
//   const maxY = Math.max(...sortMark.map((point) => point[1]));

//   for (let i = minY; i < maxY; i++) {
//     const row = sortMark.filter((el) => el[1] === i);

//     for (let j = row[0][0] + 1; j < row[row.length - 1][0]; j++) {
//       const n = [j, row[0][1]];

//       if (!row.some((el) => el[0] === n[0] && el[1] === n[1])) {
//         sortMark.push(n);
//       }
//     }
//   }

//   for (let i = 0; i < formatData.length; i++) {
//     for (let j = i + 1; j < formatData.length; j++) {
//       const f = formatData[i];
//       const s = formatData[j];
//       const x1 = formatData[i][0];
//       const y1 = formatData[i][1];
//       const x2 = formatData[j][0];
//       const y2 = formatData[j][1];

//       const minX = Math.min(x1, x2);
//       const maxX = Math.max(x1, x2);

//       const minY = Math.min(y1, y2);
//       const maxY = Math.max(y1, y2);

//       const rectangle = [];
//       let flag = true;
//       for (let y = minY; y <= maxY; y++) {
//         for (let x = minX; x <= maxX; x++) {
//           rectangle.push([x, y]);
//         }
//       }
//       for (const rec of rectangle) {
//         const rx = rec[0];
//         const ry = rec[1];
//         if (!sortMark.some((el) => el[0] === rx && el[1] === ry)) {
//           flag = false;
//         }
//       }

//       if (flag) {
//         const width = Math.abs(f[0] - s[0]) + 1;
//         const height = Math.abs(f[1] - s[1]) + 1;
//         const area = width * height;
//         if (maxArea < area) {
//           maxArea = area;
//         }
//       }
//     }
//   }

//   return maxArea;
// };

//refactored code
import { readFile } from "./readData";

export const DayPlus9 = async () => {
  const dataRead = "src/day-9/data/data.txt";

  const points = (await readFile(dataRead))
    .trim()
    .split("\n")
    .map((line) => line.split(",").map(Number));

  /*
    1. Coordinate compression
  */

  const xs = new Set<number>();
  const ys = new Set<number>();

  for (const [x, y] of points) {
    xs.add(x - 1);
    xs.add(x);
    xs.add(x + 1);

    ys.add(y - 1);
    ys.add(y);
    ys.add(y + 1);
  }

  const sortedX = [...xs].sort((a, b) => a - b);
  const sortedY = [...ys].sort((a, b) => a - b);

  const xMap = new Map<number, number>();
  const yMap = new Map<number, number>();

  sortedX.forEach((x, i) => {
    xMap.set(x, i);
  });

  sortedY.forEach((y, i) => {
    yMap.set(y, i);
  });

  /*
    2. Create compressed grid
  */

  const grid = Array.from({ length: sortedY.length }, () =>
    Array(sortedX.length).fill(false),
  );

  /*
    3. Draw red/green border
  */

  const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    const cx1 = xMap.get(x1)!;
    const cy1 = yMap.get(y1)!;

    const cx2 = xMap.get(x2)!;
    const cy2 = yMap.get(y2)!;

    if (cx1 === cx2) {
      for (let y = Math.min(cy1, cy2); y <= Math.max(cy1, cy2); y++) {
        grid[y][cx1] = true;
      }
    }

    if (cy1 === cy2) {
      for (let x = Math.min(cx1, cx2); x <= Math.max(cx1, cx2); x++) {
        grid[cy1][x] = true;
      }
    }
  };

  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];

    const [x2, y2] = points[(i + 1) % points.length];

    drawLine(x1, y1, x2, y2);
  }

  /*
    4. Flood fill outside
  */

  const outside = Array.from({ length: sortedY.length }, () =>
    Array(sortedX.length).fill(false),
  );

  const queue: [number, number][] = [[0, 0]];

  outside[0][0] = true;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (queue.length) {
    const [x, y] = queue.shift()!;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || ny < 0 || nx >= sortedX.length || ny >= sortedY.length) {
        continue;
      }

      if (outside[ny][nx]) {
        continue;
      }

      if (grid[ny][nx]) {
        continue;
      }

      outside[ny][nx] = true;

      queue.push([nx, ny]);
    }
  }

  /*
    5. Check rectangles
  */

  let answer = 0;

  const isInside = (x: number, y: number) => {
    const cx = xMap.get(x)!;
    const cy = yMap.get(y)!;

    return !outside[cy][cx];
  };

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];

      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);

      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      const area = (maxX - minX + 1) * (maxY - minY + 1);

      if (area <= answer) {
        continue;
      }

      let valid = true;

      for (const y of sortedY) {
        if (y < minY || y > maxY) {
          continue;
        }

        for (const x of sortedX) {
          if (x < minX || x > maxX) {
            continue;
          }

          if (!isInside(x, y)) {
            valid = false;
            break;
          }
        }

        if (!valid) {
          break;
        }
      }

      if (valid) {
        answer = area;
      }
    }
  }

  return answer;
};
