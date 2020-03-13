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
    socket.emit('sendData', messageText, (error) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message delivered')
    })
})
document.querySelector('#share-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Gelocation is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        socket.emit('user-location', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})