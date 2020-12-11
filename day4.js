const fs = require('fs'); 
const readline = require('readline'); 

let passports = [];
let passportData = {};

const file = readline.createInterface({ 
    input: fs.createReadStream('day4.in')
}); 

const inRange = (data, min, max) => {
    return +data >= min && +data <= max
};

const validateHeight = (data) => {
    const parsed = data.match(/^(\d{2,3})(in|cm)$/);
    if (parsed) {
        const val = +parsed[1];
        if (parsed[2] === 'in') {
            return val >= 59 && val <= 76;
        } else if (parsed[2] === 'cm') {
            return val >= 150 && val <= 193;
        }
    }
    return false;
}

const validatePassports = (toCheck, checkData) => {
    let valid = 0;
    const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const validEyes = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    toCheck.forEach(p => {
        if (Object.keys(p).filter(x => requiredKeys.includes(x)).length === requiredKeys.length) {
            if (!checkData) {
                valid++;
            } else if (inRange(p.byr, 1920, 2002)
                && inRange(p.iyr, 2010, 2020)
                && inRange(p.eyr, 2020, 2030)
                && validateHeight(p.hgt)
                && p.hcl.match(/^#[a-f0-9]{6}$/)
                && validEyes.includes(p.ecl)
                && p.pid.match(/^\d{9}$/)) {
                valid++;
            }
        }
    });
    return valid;
} 

file.on('line', (line) => { 
    if (line === '') {
        if (Object.keys(passportData).length > 0) {
            passports.push(passportData);
        } 
        passportData = {};
    } else {
        line.split(' ').forEach(pair => {
            const field = pair.split(':');
            passportData[field[0]] = field[1];
        });
    }
}); 

file.on('close', () => {
    if (Object.keys(passportData).length > 0) {
        passports.push(passportData);
    } 
    console.log(`Part 1 Valid: ${validatePassports(passports)}`);
    console.log(`Part 2 Valid: ${validatePassports(passports, true)}`);
});