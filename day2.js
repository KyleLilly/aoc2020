const fs = require('fs'); 
const readline = require('readline'); 
const inputPattren = /(\d*)-(\d*)\s([A-Za-z]):\s([A-Za-z]*)/;
let part1Valid = 0;
let part2Valid = 0;

const passwords = readline.createInterface({ 
    input: fs.createReadStream('day2.in')
}); 

const isValidPart1 = (min, max, target, password) => {
    let hits = 0;
    for (char of password) {
        if (char === target) {
            hits++;
        } 
    }
    
    return hits >= min && hits <=max;
};

const isValidPart2 = (indexA, indexB, target, password) => {
    const matchA = password.charAt(indexA) === target;
    const matchB = password.charAt(indexB) === target;
    return (matchA && !matchB) || (matchB && !matchA);
};

passwords.on('line', (line) => { 
    if (line) {
        const parsed = line.match(inputPattren);
        if (isValidPart1(parsed[1], parsed[2], parsed[3], parsed[4])) {
            part1Valid++;
        }
        if (isValidPart2(parsed[1] - 1, parsed[2] - 1, parsed[3], parsed[4])) {
            part2Valid++;
        }
    }
}); 

passwords.on('close', () => {
    console.log(`Part 1: ${part1Valid}`);
    console.log(`Part 2: ${part2Valid}`);
});