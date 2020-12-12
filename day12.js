const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
    input: fs.createReadStream('day12.in')
});

let moves = [];

const toRadians = function (degrees) {
    return degrees * (Math.PI / 180);
}

const part1 = function () {
    let x = 0;
    let y = 0;
    let angle = 0;
    for (let i = 0; i < moves.length; i++) {
        const units = +moves[i].slice(1)
        switch (moves[i][0]) {
            case 'N':
                y +=  units;
                break;
            case 'S':
                y -=  units;
                break;
            case 'E':
                x +=  units;
                break;
            case 'W':
                x -= units;
                break;
            case 'L':
                angle = (angle + units) % 360;
                break;
            case 'R':
                angle = (angle - units) % 360;
                break;
            case 'F':
                let radians = toRadians(angle);
                x = x + units * Math.cos(radians);
                y = y + units * Math.sin(radians) ;
                break;
        }
    }
    return Math.abs(x) + Math.abs(y);
}

let waypointX = 10;
let waypointY = 1;

const rotateWaypoint = function (angle) {
    const radians = toRadians(angle);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const newX = waypointX * cos + waypointY * sin;
    const newY = waypointY * cos - waypointX * sin;
    waypointX = Math.round(newX);
    waypointY = Math.round(newY);
}

const multiplier = function (val) {
    return val > 0 ? 1 : -1;
}

const part2 = function () {
    let x = 0;
    let y = 0;
    for (let i = 0; i < moves.length; i++) {
        const units = +moves[i].slice(1)
        switch (moves[i][0]) {
            case 'N':
                waypointY +=  units;
                break;
            case 'S':
                waypointY -=  units;
                break;
            case 'E':
                waypointX +=  units;
                break;
            case 'W':
                waypointX -= units;
                break;
            case 'L':
                rotateWaypoint(-units)
                break;
            case 'R':
                rotateWaypoint(+units)
                break;
            case 'F':
                x = x + multiplier(waypointX) * (units * Math.abs(waypointX));
                y = y + multiplier(waypointY) * (units * Math.abs(waypointY));
                break;
        }
    }
    return Math.abs(x) + Math.abs(y);
}

file.on('line', (line) => {
    moves.push(line);
});

file.on('close', () => {
    console.log(`Part 1: ${part1()}`);
    console.log(`Part 2: ${part2()}`);
});