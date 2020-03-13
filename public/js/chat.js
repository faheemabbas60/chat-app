const socket = io()
socket.on('message', (message) => {
    console.log(message)
})
const form = document.querySelector('form')
const message = document.querySelector('#message')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const messageText = message.value;
    //console.log(messageText)
    socket.emit('sendData',messageText)
})