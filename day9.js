const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
    input: fs.createReadStream('day9.in')
});

const PREAMBLE_LENEGTH = 25;
let values = [];

const isValid = function (start, end, target) {
    for(let i = start; i < end; i++) {
        for (let x = start; x < end; x++) {
            if (values[i] !== values[x] && target === values[x] + values[i]) {
                return true; 
            }
        }
    }
    return false;
}
// Part 1
const part1 = function () {
    for(let i = PREAMBLE_LENEGTH; i < values.length; i++) {
        if (!isValid(i - PREAMBLE_LENEGTH, i, values[i])) {
            return values[i];
        }
    }
    return -1
}
// Part 2
const sumArray = (accumulator, currentValue) => accumulator + currentValue;
const part2 = function (target) {
    let range = [];
    for (let x = 0; x < values.length; x++) {
        range = [];
        for (let i = x; i < values.length; i++) {
            range.push(values[i]);
            const rangeSum = range.reduce(sumArray);
            if (range.length > 1 && rangeSum === target) {
                return Math.min(...range) + Math.max(...range);
            } else if (rangeSum > target) {
                break;
            }
        }
    }
    return -1;
}

file.on('line', (line) => {
    values.push(+line);
});

file.on('close', () => {
    const res = part1();
    console.log(`Part 1: ${res}`);
    console.log(`Part 2: ${part2(res)}`);
});