const fs = require('fs'); 
const readline = require('readline'); 

const file = readline.createInterface({ 
    input: fs.createReadStream('day7.in')
});

// Part 1
const innerBagRegex = /([0-9])\s([a-z]*\s[a-z]*)/g;
let bagMap = new Map();

const holdsBag = function (target) {
    let results = []; 
    bagMap.forEach((v, k) => {
        if (v.map(t => t.type).filter(x => target.includes(x)).length > 0) {
            results.push(k)
        }
    });
    return results;
}

const part1 = function () {
    let result = new Set();
    // Bags that hold target
    let targetBags = ['shiny gold' ];
    let i = 0;
    while(targetBags.length > 0) {
        targetBags = holdsBag(targetBags);
        targetBags.forEach(b => result.add(b));
        i++;
    }
    return result.size;
}

// Part 2
const part2 = function(target) {
    const children = bagMap.get(target);
    if (children.length === 0) {
        return 1;
    }
    let result = 0;
    children.forEach(b => {
        result += (b.count * part2(b.type));
    });
    return 1 + result;
}

file.on('line', (line) => { 
    if (line !== '') {
        // In reality the first two words always appear to describe the parent bag
        const parentBagIndex = line.indexOf('bags');
        const parentBag = line.substring(0, parentBagIndex).trim();
        // Child types are either "no other bags" or "# <feature> <color> bag(s)"
        const children = [...line.substring(line.indexOf('bags')).matchAll(innerBagRegex)];
        if (children.length > 0) {
            bagMap.set(parentBag, children.map(b => {
                return { type: b[2], count: b[1] };
            }));
        } else {
            bagMap.set(parentBag, []);
        }
    }
}); 

file.on('close', () => {
    // console.log(bagMap)
    console.log(`Part 1: ${part1()}`);
    console.log(`Part 2: ${part2('shiny gold') - 1}`);
});