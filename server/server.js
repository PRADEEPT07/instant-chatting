const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const PORT = process.env.PORT || 5000

const router = require('./routes/router')

const app = express()
const server = http.createServer(app)
const io =  socketio(server)

app.use(router)
app.use(cors())

//For client connection and disconnection
io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id:socket.id, name, room })

        if(error) return callback(error)

        socket.emit('message', { user:'bot', text:`${user.name} Welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message',{ user:'bot',text:`${user.name} has joined the Room`})

        socket.join(user.room)

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message',{ user: user.name, text: message})
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.io)

        if(user) {
            io.to(user.room).emit('message',{ user: 'bot', text:`${user.name} has left the room`})
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    })
})

server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))