const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const express = require('express')
const filter = require('bad-words')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

io.on('connection', (socket) => {
    console.log('new socket connection established')
    socket.emit('message', 'welcome to my app')
    socket.broadcast.emit('message', 'A new user has joined!')
    socket.on('sendData', (data,callback) => {
        const filter=new Filter()
        if(filter.isProfane(data)){
            return callback('no profane allowed')
        }
        console.log(data)
        io.emit('message', data)
        callback()
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('message', 'A user has left!')
    })
    socket.on('user-location', ({latitude,longitude}) => {
        io.emit('message', 'http://google.com/maps?q='+latitude+","+longitude)
    })
})

server.listen(port, () => {
    console.log('server is up on port ', port)
})