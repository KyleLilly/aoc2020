const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
    input: fs.createReadStream('day11.in')
});

let seatMap = [];
let inputMap = [];
let swaps = 0;
const cloneMap = function (target) {
    return JSON.parse(JSON.stringify(target));
}

const adjacentNeighbors = function (map, y, x) {
    let neighbors = [];
    neighbors.push(map[y][x - 1]);
    neighbors.push(map[y][x + 1]);
    if (map[y +1]) {
        neighbors.push(map[y + 1][x]);
        neighbors.push(map[y + 1][x - 1]);
        neighbors.push(map[y + 1][x + 1]);
    }
    if (map[y - 1]) {
        neighbors.push(map[y - 1][x]);
        neighbors.push(map[y - 1][x - 1]);
        neighbors.push(map[y - 1][x + 1]);
    }
    return neighbors.filter(n => n === '#').length;
}

const visibleNeighbors = function (map, y, x) {
    let neighbors = [];
    // Check Left
    if (x > 0) {
        for (let x2 = (x - 1); x2 >= 0; x2--) {
            if (map[y][x2] !== '.') {
                neighbors.push(map[y][x2]);
                break;
            }
        }
    }
    // Check Right
    if (x < map[y].length) {
        for (let x2 = (x + 1); x2 < map[y].length; x2++) {
            if (map[y][x2] !== '.') {
                neighbors.push(map[y][x2]);
                break;
            }
        }
    }
    // Check Up
    if (map[y - 1]) {
        for (let y2 = (y - 1); y2 >= 0; y2--) {
            if (map[y2][x] !== '.') {
                neighbors.push(map[y2][x]);
                break;
            }
        }
        // Top Left
        for (let offset = 1; (y - offset >= 0 && x - offset >= 0); offset++) {
            if (map[y - offset][x - offset] !== '.') {
                neighbors.push(map[y - offset][x - offset]);
                break;
            }
        }
        // Top Right
        for (let offset = 1; (y - offset >= 0 && x + offset < map[y].length); offset++) {
            if (map[y - offset][x + offset] !== '.') {
                neighbors.push(map[y - offset][x + offset]);
                break;
            }
        }
    }
    // Check Down
    if (map[y + 1]) {
        for (let y2 = (y + 1); y2 < map.length; y2++) {
            if (map[y2][x] !== '.') {
                neighbors.push(map[y2][x]);
                break;
            }
        }
        // Bottom Left
        for (let offset = 1; (y + offset < map.length && x - offset >= 0); offset++) {
            if (map[y + offset][x - offset] !== '.') {
                neighbors.push(map[y + offset][x - offset]);
                break;
            }
        }
        // Bottom Right
        for (let offset = 1; (y + offset < map.length && x + offset < map[y].length); offset++) {
            if (map[y + offset][x + offset] !== '.') {
                neighbors.push(map[y + offset][x + offset]);
                break;
            }
        }
    }
    return neighbors.filter(n => n === '#').length;
}

const simluateSeats = (original, neighborFunction, maxOccupied) => {
    let currentMap = cloneMap(original);
    let iterations = 0;
    do {
        swaps = 0;
        seatMap = cloneMap(currentMap);
        for (let y = 0; y < seatMap.length; y++) {
            for (let x = 0; x < original[y].length; x++) {
                if (currentMap[y][x] !== '.') {
                    const occupied = neighborFunction(seatMap, y, x);
                    if (currentMap[y][x] === 'L' && occupied === 0) {
                        swaps++;
                        currentMap[y][x] = '#';
                    } else if (currentMap[y][x] === '#' && occupied >= maxOccupied) {
                        swaps++;
                        currentMap[y][x] = 'L';
                    }
                }
            }
        }
        iterations++
    } while(swaps > 0);
    // Count occupied seats
    return JSON.stringify(currentMap).match(/#/g).length;
}

file.on('line', (line) => {
    if (line) {
        inputMap.push([...line]);
    }
});

file.on('close', () => {
    const originalMap = cloneMap(inputMap);
    console.log(`Part 1: ${simluateSeats(originalMap, adjacentNeighbors, 4)}`);
    console.log(`Part 2: ${simluateSeats(originalMap, visibleNeighbors, 5)}`);
});