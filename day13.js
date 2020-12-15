const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
    input: fs.createReadStream('day13.in')
});

let earliest;
let busIds = [];
let busesByOffset = [];
const part1 = function () {
    let possibleTimes = [];
    for (let i = 0; i < busIds.length; i++) {
        possibleTimes.push({ id: busIds[i], departure: busIds[i] * Math.ceil(earliest / busIds[i])});
    }
    const targetBus = possibleTimes.sort((a, b) => a.departure - b.departure)[0];
    return targetBus.id * (targetBus.departure - earliest);
}

const lcm = (values) => {
    function gcd (a, b) {
        return b == 0 ? a : gcd (b, a % b);
    }
    return values.reduce((prev, curr) => {
        return prev / gcd (prev, curr) * curr;
    }, 1);
}


const part2 = function () {
    let stepSize = +busesByOffset[0].id;
    let t = +busesByOffset[0].id;
    for (let i = 1; i < busesByOffset.length; i++) {
        const bussesToProcess = busesByOffset.slice(0, i + 1);
        while ( (t + busesByOffset[i].offset) % busesByOffset[i].id !== 0) {
            t += stepSize;
        }
        
        stepSize = lcm(bussesToProcess.map(b => b.id));
    }
    return t;
}

file.on('line', (line) => {
    if (!earliest) {
        earliest = +line;
    } else {
        busIds = line.split(',').filter(t => t !== 'x').map(v => +v).sort((a, b) => a - b);
        let offset = 0;
        let busOffests = [];
        line.split(',').forEach(b => {
            if (b !== 'x') {
                busOffests.push({
                    id: b,
                    offset: offset
                });
            }
            offset++;
        });
        busesByOffset = busOffests.sort((a, b) => a.offset - b.offset);
    }
});

file.on('close', () => {
    console.log(`Part 1: ${part1()}`);
    console.log(`Part 2: ${part2()}`);
});