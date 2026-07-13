import { readFile } from "./readData";
type Edge = {
  a: number;
  b: number;
  distance: number;
};
export const Day8 = async () => {
  const dataRead = "src/day-8/data/data.txt";
  const formatData = (await readFile(dataRead))
    .trim()
    .split("\n")
    .map((line) => line.split(",").map(Number));

  const edges: Edge[] = [];
  for (let i = 0; i < formatData.length; i++) {
    for (let j = i + 1; j < formatData.length; j++) {
      const f = formatData[i];
      const s = formatData[j];
      const dx = f[0] - s[0];
      const dy = f[1] - s[1];
      const dz = f[2] - s[2];

      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      edges.push({
        a: i,
        b: j,
        distance,
      });
    }
  }

  edges.sort((a, b) => a.distance - b.distance);

  const parent = Array.from({ length: formatData.length }, (_, i) => i);

  function find(node: number) {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }

    return parent[node];
  }

  function union(a: number, b: number) {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA === rootB) {
      return;
    }

    parent[rootB] = rootA;
  }

  for (let i = 0; i < Math.min(1000, edges.length); i++) {
    const edge = edges[i];

    union(edge.a, edge.b);
  }

  const circuits = new Map<number, number>();

  for (let i = 0; i < formatData.length; i++) {
    const root = find(i);

    circuits.set(root, (circuits.get(root) ?? 0) + 1);
  }

  const sizes = [...circuits.values()].sort((a, b) => b - a);
  const answer = sizes[0] * sizes[1] * sizes[2];

  return answer;
};
