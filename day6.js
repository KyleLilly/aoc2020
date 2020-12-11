const fs = require('fs'); 
const readline = require('readline'); 

// Part 1
let allAnswers = 0;
let groupAnswersUnique = new Set();
let groupAnswerCountMap = new Map();
// Part 2
let groupMembers = 0;
let groupAnswersCommon = 0;

const file = readline.createInterface({ 
    input: fs.createReadStream('day6.in')
}); 
const part1 = function () {
    if (groupAnswersUnique.size > 0) {
        allAnswers += groupAnswersUnique.size;
    }
    groupAnswersUnique = new Set();
}

const part2 = function () {
    if (groupMembers > 0) {
        groupAnswerCountMap.forEach((val) => {
            if (val === groupMembers) {
                groupAnswersCommon++;
            }
        });
    }
    groupAnswerCountMap = new Map();
    groupMembers = 0;
}
file.on('line', (line) => { 
    if (line === '') {
        part1();
        part2();
    } else {
        line.split('').forEach(answer => {
            // Part 1
            groupAnswersUnique.add(answer);
            // Part 2
            groupAnswerCountMap.set(answer, (groupAnswerCountMap.get(answer) || 0) + 1);
        });
        groupMembers++;
    }
}); 

file.on('close', () => {
    part1();
    part2();
    console.log(`Part 1: ${allAnswers}`);
    console.log(`Part 2: ${groupAnswersCommon}`);
});