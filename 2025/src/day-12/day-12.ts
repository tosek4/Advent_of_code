import { readFile } from "./readData";

type Position = [number, number];
type Shape = Position[];
type Grid = boolean[][];
type Orientation = Position[];
type ShapeOrientations = Orientation[];

interface Region {
    width: number;
    height: number;
    counts: number[];
}

class ChristmasTreeFarm {
    private shapes: Map<number, Shape> = new Map();
    private regions: Region[] = [];

    constructor(input: string) {
        this.parseInput(input);
    }

    private parseInput(input: string): void {
        const lines = input.split('\n').map(line => line.trim());
        let i = 0;

        while (i < lines.length) {
            const line = lines[i];
            if (!line) {
                i++;
                continue;
            }

            if (line.includes(':') && !line.includes('x')) {
                const idx = parseInt(line.split(':')[0]);
                i++;
                const shapeCells: Position[] = [];
                let row = 0;

                while (i < lines.length) {
                    const content = lines[i];
                    if (!content) {
                        i++;
                        continue;
                    }
                    if (content.includes(':') && !content.includes('x')) {
                        break;
                    }
                    if (content.match(/^[.#]+$/)) {
                        for (let col = 0; col < content.length; col++) {
                            if (content[col] === '#') {
                                shapeCells.push([row, col]);
                            }
                        }
                        row++;
                    }
                    i++;
                }
                if (shapeCells.length > 0) {
                    this.shapes.set(idx, shapeCells);
                }
            } else {
                i++;
            }
        }

        i = 0;
        while (i < lines.length) {
            const line = lines[i];
            if (!line) {
                i++;
                continue;
            }

            if (line.includes('x') && line.includes(':')) {
                const [sizePart, countPart] = line.split(':').map(s => s.trim());
                if (sizePart.includes('x')) {
                    const [width, height] = sizePart.split('x').map(Number);
                    if (!isNaN(width) && !isNaN(height)) {
                        const counts = countPart.split(/\s+/).map(Number);
                        this.regions.push({ width, height, counts });
                    }
                }
            }
            i++;
        }
    }

    private normalizeShape(cells: Position[]): Position[] {
        if (cells.length === 0) return [];
        const minRow = Math.min(...cells.map(([r]) => r));
        const minCol = Math.min(...cells.map(([, c]) => c));
        return cells
            .map(([r, c]) => [r - minRow, c - minCol] as Position)
            .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    }

    private rotate90(cells: Position[]): Position[] {
        if (cells.length === 0) return [];
        const maxRow = Math.max(...cells.map(([r]) => r));
        return cells.map(([r, c]) => [c, maxRow - r] as Position);
    }

    private flipHorizontal(cells: Position[]): Position[] {
        if (cells.length === 0) return [];
        const maxCol = Math.max(...cells.map(([, c]) => c));
        return cells.map(([r, c]) => [r, maxCol - c] as Position);
    }

    private getShapeKey(shape: Position[]): string {
        return JSON.stringify(shape.map(([r, c]) => [r, c]).sort());
    }

    private getAllOrientations(shape: Shape): ShapeOrientations {
        const orientations: ShapeOrientations = [];
        let current = shape.slice();

        for (let i = 0; i < 4; i++) {
            const normalized = this.normalizeShape(current);
            orientations.push(normalized);
            
            const flipped = this.flipHorizontal(current);
            orientations.push(this.normalizeShape(flipped));
            
            current = this.rotate90(current);
        }

        const unique: ShapeOrientations = [];
        const seen = new Set<string>();
        for (const orient of orientations) {
            const key = this.getShapeKey(orient);
            if (!seen.has(key)) {
                seen.add(key);
                unique.push(orient);
            }
        }

        return unique;
    }

    private canPlace(shape: Orientation, grid: Grid, row: number, col: number): boolean {
        for (const [r, c] of shape) {
            const newRow = row + r;
            const newCol = col + c;
            if (newRow < 0 || newRow >= grid.length || newCol < 0 || newCol >= grid[0].length) {
                return false;
            }
            if (grid[newRow][newCol]) {
                return false;
            }
        }
        return true;
    }

    private placeShape(shape: Orientation, grid: Grid, row: number, col: number, value: boolean): void {
        for (const [r, c] of shape) {
            grid[row + r][col + c] = value;
        }
    }

    // Calculate remaining area needed for shapes
    private getRemainingArea(shapesToPlace: number[], index: number, allOrientations: Map<number, ShapeOrientations>): number {
        let area = 0;
        for (let i = index; i < shapesToPlace.length; i++) {
            const shapeIdx = shapesToPlace[i];
            const orientations = allOrientations.get(shapeIdx);
            if (orientations && orientations.length > 0) {
                area += orientations[0].length;
            }
        }
        return area;
    }

    // Get available empty cells count
    private getEmptyCells(grid: Grid): number {
        let count = 0;
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[0].length; c++) {
                if (!grid[r][c]) count++;
            }
        }
        return count;
    }

    private backtrack(
        shapesToPlace: number[],
        index: number,
        grid: Grid,
        allOrientations: Map<number, ShapeOrientations>,
        memo: Map<string, boolean>
    ): boolean {
        // Create a cache key for this state
        const gridKey = JSON.stringify(grid);
        const memoKey = `${gridKey}-${index}`;
        if (memo.has(memoKey)) {
            return memo.get(memoKey)!;
        }

        if (index >= shapesToPlace.length) {
            memo.set(memoKey, true);
            return true;
        }

        // Prune: check if remaining shapes can fit in remaining space
        const remainingArea = this.getRemainingArea(shapesToPlace, index, allOrientations);
        const emptyCells = this.getEmptyCells(grid);
        if (remainingArea > emptyCells) {
            memo.set(memoKey, false);
            return false;
        }

        const shapeIdx = shapesToPlace[index];
        const orientations = allOrientations.get(shapeIdx);
        if (!orientations) {
            memo.set(memoKey, false);
            return false;
        }

        const height = grid.length;
        const width = grid[0].length;

        // Try each orientation
        for (const orient of orientations) {
            const shapeHeight = Math.max(...orient.map(([r]) => r)) + 1;
            const shapeWidth = Math.max(...orient.map(([, c]) => c)) + 1;

            // Try each position - optimize by trying positions with empty cells first
            const positions: [number, number][] = [];
            for (let r = 0; r <= height - shapeHeight; r++) {
                for (let c = 0; c <= width - shapeWidth; c++) {
                    positions.push([r, c]);
                }
            }
            
            // Sort positions to try corners first (better pruning)
            positions.sort((a, b) => {
                const distA = a[0] + a[1];
                const distB = b[0] + b[1];
                return distA - distB;
            });

            for (const [r, c] of positions) {
                if (this.canPlace(orient, grid, r, c)) {
                    this.placeShape(orient, grid, r, c, true);
                    if (this.backtrack(shapesToPlace, index + 1, grid, allOrientations, memo)) {
                        memo.set(memoKey, true);
                        this.placeShape(orient, grid, r, c, false);
                        return true;
                    }
                    this.placeShape(orient, grid, r, c, false);
                }
            }
        }

        memo.set(memoKey, false);
        return false;
    }

    private solveRegion(region: Region, allOrientations: Map<number, ShapeOrientations>): boolean {
        const { width, height, counts } = region;
        
        // Create list of shapes to place
        const shapesToPlace: number[] = [];
        for (let idx = 0; idx < counts.length; idx++) {
            for (let i = 0; i < counts[idx]; i++) {
                shapesToPlace.push(idx);
            }
        }

        if (shapesToPlace.length === 0) return true;

        // Sort by size (largest first) and then by number of orientations
        shapesToPlace.sort((a, b) => {
            const shapeA = allOrientations.get(a)?.[0] || [];
            const shapeB = allOrientations.get(b)?.[0] || [];
            // Sort by area descending
            const areaDiff = shapeB.length - shapeA.length;
            if (areaDiff !== 0) return areaDiff;
            // Then by number of orientations
            const orientationsA = allOrientations.get(a)?.length || 0;
            const orientationsB = allOrientations.get(b)?.length || 0;
            return orientationsA - orientationsB;
        });

        const grid: Grid = Array.from({ length: height }, () => 
            Array.from({ length: width }, () => false)
        );

        const memo = new Map<string, boolean>();
        return this.backtrack(shapesToPlace, 0, grid, allOrientations, memo);
    }

    solve(): number {
        const allOrientations = new Map<number, ShapeOrientations>();
        for (const [idx, shape] of this.shapes) {
            allOrientations.set(idx, this.getAllOrientations(shape));
        }

        let successful = 0;
        for (const region of this.regions) {
            if (this.solveRegion(region, allOrientations)) {
                successful++;
            }
        }

        return successful;
    }
}

export const Day12 = async () => {
    const dataRead = "src/day-12/data/data.txt";
    const formatData = await readFile(dataRead);
    
    const farm = new ChristmasTreeFarm(formatData);
    const result = farm.solve();
    
    return result;
};