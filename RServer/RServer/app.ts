import * as express from "express";
import * as path from "path";

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
let io = require("socket.io")(http);
const amqp = require('amqplib/callback_api');


io.on("connection", function (socket: any) {
    socket.on("message", function (message: any) {
        console.log(message);
        amqp.connect('amqp://localhost', function (error, connection) {
            if (error) {
                throw error;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                let queue = 'Rqueue';
                channel.assertQueue(queue, {
                    durable: true
                });
                channel.sendToQueue(queue, Buffer.from(message), {
                    persistent: true
                });
                console.log('Sended message "', message, '"');
            });
            setTimeout(function () {
                connection.close();
            }, 500);
        });
    });
});

const server = http.listen(3000, function () {
    console.log("Started listening on port 3000");
});
