const fs = require('fs'); 
const readline = require('readline'); 
let lineNumber = 0;
let forest = [];

const file = readline.createInterface({ 
    input: fs.createReadStream('day3.in')
}); 

const treesForSlope = (movesRight, movesDown) => {
    let x = 0;
    let y = 0;
    let treesHit = 0;
    if (forest[0][0] === '#') {
        treesHit++;
    } 
    for (y = movesDown; y < forest.length; y = y + movesDown) {
        x = (x + movesRight) % forest[y].length;
        if (forest[y][x] === '#') {
            treesHit++;
        }   
    }
    return treesHit;
}

file.on('line', (line) => { 
    if (line) {
        forest[lineNumber++] = [...line];
    }
}); 

file.on('close', () => {
    console.log(`Part 1 Trees Hit: ${treesForSlope(3, 1)}`);
    console.log(`Part 2 Trees Hit: ${treesForSlope(1, 1) * treesForSlope(3, 1) * treesForSlope(5, 1) * treesForSlope(7, 1) * treesForSlope(1, 2)}`);
});