const fs = require('fs'); 
const readline = require('readline'); 

let expenses = [];
const file = readline.createInterface({ 
    input: fs.createReadStream('day1.in')
}); 

file.on('line', (line) => { 
    if (line) {
        expenses.push(+line);
    }
});

const getProduct = (duo) => {
    for (let i = 0; i < expenses.length; i++) {
        for (let k = 0; k < expenses.length; k++) {
            if (duo) {
                if (k !== i && (expenses[i] + expenses[k]) === 2020) {
                    return expenses[i] * expenses[k];
                }
            } else {
                for (let j = 0; j < expenses.length; j++) {
                    if (k !== i && k !== j && i !== j && (expenses[i] + expenses[k] + expenses[j]) === 2020) {
                        return expenses[i] * expenses[k] * expenses[j];
                    }
                }
            }
        }
    }
}

file.on('close', () => {
    console.log(expenses)
    console.log(`Part 1: ${getProduct(true)}`);
    console.log(`Part 2: ${getProduct()}`);
});
