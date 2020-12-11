const fs = require('fs'); 
const readline = require('readline'); 

let maxSeatId = -1;
let ticketedSeats = [];
const file = readline.createInterface({ 
    input: fs.createReadStream('day5.in')
});

file.on('line', (line) => { 
    if (line) {
        const row = parseInt(line.substring(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2);
        const seat = parseInt(line.substring(7, 10).replace(/L/g, '0').replace(/R/g, '1'), 2);
        const seatId = row*8 + seat;
        // Part 1
        if (seatId > maxSeatId) {
            maxSeatId = seatId;
        }
        // Part 2
        ticketedSeats.push(+seatId);
    }
}); 

file.on('close', () => {
    // Part 1
    console.log(`Max Seat ID = ${maxSeatId}`);
    // Part 2
    ticketedSeats.sort((a, b) => { return a - b; }).forEach((seatId, elem) => {
        if (elem > 0) {
            if (seatId === (ticketedSeats[elem - 1] + 2)) {
                console.log(`Empty seat: ${seatId - 1}`);
            }
        }
    })
});