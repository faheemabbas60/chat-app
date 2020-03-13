const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const express = require('express')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

io.on('connection', (socket) => {
    console.log('new socket connection established')
    socket.emit('message', 'welcome to my app')
    socket.on('sendData', (data) => {
        console.log(data)
        io.emit('message', data)
    })

})

server.listen(port, () => {
    console.log('server is up on port ', port)
})