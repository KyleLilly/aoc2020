const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
    input: fs.createReadStream('day10.in')
});

let values = [];
let diffOne = 0;
let diffThree = 0;
let validPaths = 1;

const part1 = () => {
    for(let i = 0; i < values.length - 1; i++) {
        if (values[i + 1] - values[i] === 1) {
            diffOne++;
        } else {
            diffThree++;
        }
    }
    return diffOne * diffThree;
}

const part2 = function () {
    // Chunk paths into smaller groups based on situations where there is only one valid
    // path forward ie vales[i + 1] - values[i] = 3
    let chunks = [];
    let chunkStart = 0;
    for(let i = 0; i < values.length - 1; i++) {
        if (values[i + 1] - values[i] === 3) {
            chunks.push(values.slice(chunkStart, i + 1));
            chunkStart = i + 1;
        }
    }
    // Now multiply the valid paths for each chunk
    let allPaths = 1;
    chunks.forEach((chunk) => {
        validPaths = 1;
        getValidPaths(chunk, 0);
        allPaths = allPaths * validPaths;
    });
    return allPaths;
}


const getValidPaths = (chunk, i) => {
    if (chunk[i + 1] - chunk[i] === 1 || chunk[i + 1] - chunk[i] === 3) {
        getValidPaths(chunk, i + 1);
    }
    if (chunk[i + 2] - chunk[i] === 3 || chunk[i + 2] - chunk[i] === 2) {
        validPaths++;
        getValidPaths(chunk, i + 2);
    }
    if (chunk[i + 3] - chunk[i] === 3) {
        validPaths++;
        getValidPaths(chunk, i + 3);
    }
}

file.on('line', (line) => {
    values.push(+line);
});

file.on('close', () => {
    // Sort input and add seat adapter + device adapter
    values = values.sort( (a, b) => a < b ? -1 : 1);
    values.unshift(0);
    values.push(values[values.length - 1] + 3);
    console.log(`Part 1: ${part1()}`);
    console.log(`Part 2: ${part2()}`);
});