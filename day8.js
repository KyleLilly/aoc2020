const fs = require('fs');
const readline = require('readline');

const instructions = [];
// Part 1
let accumulator = 0;
// Part 2


const file = readline.createInterface({
    input: fs.createReadStream('day8.in')
});

const processCmd = function (i, commands) {
    switch(commands[i].cmd) {
        case 'nop':
            return i + 1;
        case 'acc':
            accumulator += commands[i].arg;
            return i + 1;
        case 'jmp':
            return i + commands[i].arg;
    }
}

const part1 = function (override) {
    let commandHistory = {}
    let cmdIndex = 0;
    let commands = override || instructions;
    accumulator = 0;
    while (!commandHistory[cmdIndex] && cmdIndex !== commands.length) {
        commandHistory[cmdIndex] = true;
        cmdIndex = processCmd(cmdIndex, commands);
    }
    return { acc: accumulator, cmd: cmdIndex };
}

const part2 = function () {
    let lastJmpReplacement = -1;
    let lastNoopReplacement = -1;
    let modified = JSON.parse(JSON.stringify(instructions));
    let exhausted = false;
    // brute force replacements
    while (part1(modified).cmd !== instructions.length && !exhausted) {
        let replaced = false;
        modified = JSON.parse(JSON.stringify(instructions));
        for (let i = 0; i < modified.length; i++) {
            if (modified[i].cmd === 'nop' && i > lastNoopReplacement) {
                lastNoopReplacement = i;
                modified[i].cmd = 'jmp';
                replaced = true;
                break;
            }
        }
        if (!replaced) {
            for (let i = 0; i < modified.length; i++) {
                if (modified[i].cmd === 'jmp' && i > lastJmpReplacement) {
                    lastJmpReplacement = i;
                    modified[i].cmd = 'nop';
                    replaced = true;
                    break;
                }
            }
       }
       exhausted = !replaced;
    }
    return accumulator;
}

file.on('line', (line) => {
    const input = line.split(' ');
    instructions.push({
        cmd: input[0],
        arg: +input[1]
    });
});

file.on('close', () => {
    console.log(`Part 1: ${part1().acc}`);
    console.log(`Part 2: ${part2()}`);
});