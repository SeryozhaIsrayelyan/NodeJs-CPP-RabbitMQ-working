# Task
1. Create Typescript CLI application, that will send messages to server (another typescript cli application) by web socket
2. Second application should accept this message and send it to RabbitMQ message broker
3. Third application (on C++) should accept that message from RabbitMQ and log it.

## What I used

### Client (First App)
For client-side application I used built-in module [Readline](https://nodejs.org/api/readline.html) and module for web socket [Socket.io-client](https://www.npmjs.com/package/socket.io-client)

I made async recursive loop, that will take each time input from user and send it (message) to the server by web socket on port 3000.

### Server (Second App)
For server-side application I used built-in module [path](https://nodejs.org/api/path.html), module for web socket [Socket.io](https://socket.io/docs/v4/), framework [Express](https://expressjs.com/) and [amqplib](https://www.npmjs.com/package/amqplib) module for working with RabbitMQ

 
Server is creating separate socket on port 3000 with express and starting to listen incoming requests and get them by express + socket-io. After that it would send it by amqp connection to RabbitMQ message broker queue entitle "Rqueue".

### Logger (Third App)
For logger application I used [RabbitMQ-c client library](https://github.com/alanxz/rabbitmq-c), [amqpcpp](https://github.com/akalend/amqpcpp) library and [spdlog](https://github.com/gabime/spdlog) library for message logging.

It should take message from RabbitMQ "Rqueue" queue and log it.

### IDE -> Visual Studio 2019-2022

## Problems

RabbitMQ did not want to work on my own computer (constantly giving an error that another application is running on the same port 25672. The problem is that this application is it. Even when killing this process and starting a new one, it still gives this error. In the end, nothing works). On the office computer (on which I can't do this project often for some logical reasons) everything works great.
