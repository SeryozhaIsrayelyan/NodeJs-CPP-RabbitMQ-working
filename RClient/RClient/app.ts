var readline = require('readline');
const io = require("socket.io-client");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var recursiveAsyncReadLine = function (socket) {
    rl.question('', function (answer) {
        if (answer == 'exit')
            return rl.close();
        console.log('Sended message: "', answer, '"');
        socket.emit("message", answer);
        recursiveAsyncReadLine(socket);
    });
};


const socket = io("http://localhost:3000");

recursiveAsyncReadLine(socket);