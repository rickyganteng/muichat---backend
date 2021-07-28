const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const xss = require('xss-clean')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const routerNavigation = require('./routes')
const socket = require('socket.io')

const app = express()
const port = process.env.DB_PORT

app.use(morgan('dev'))
app.use(cors())
app.options('*', cors())
app.use(xss())
app.use(helmet())
app.use(compression())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/backend3/api/v1', routerNavigation)
app.use('/backend3/api', express.static('src/uploads'))

const server = require('http').createServer(app)
const io = socket(server, {
  cors: {
    origin: '*'
  },
  path: '/backend3/socket.io'
})

let listUsers = []
let listUserOnline = []

io.on('connection', (socket) => {
  console.log('Socket.io Connect !')
  socket.on('connect-server', ({ userid, username }) => {
    if (!listUserOnline.includes(userid)) {
      listUserOnline.push(userid)
      listUsers.push({ userid, username })
    }
    io.emit('list-user-online', listUserOnline)
    io.emit('room-users', listUsers)
    // JOIN ROOM FOR NOTIF
    socket.join(parseInt(userid))
  })
  socket.on('disconnect-server', ({ userid }) => {
    listUserOnline = listUserOnline.filter((element) => element !== userid)
    listUsers = listUsers.filter((element) => element.userid !== userid)
    io.emit('list-user-online', listUserOnline)
    io.emit('room-users', listUsers)
    // LEAVE ROOM FOR NOTIF
    socket.leave(parseInt(userid))
  })

  socket.on('globalMessage', (data) => {
    console.log(data)
    io.emit('chatMessage', data)
    // io.emit(data.imageUser)
  })
  socket.on('privateMessage', (data) => {
    console.log(data)
    socket.emit('chatMessage', data)
    // socket.emit(data.imageUser)
  })
  socket.on('broadcastMessage', (data) => {
    console.log('data broadcast', data)
    socket.broadcast.emit('chatMessage', data)
    // socket.broadcast.emit(data.imageUser)
  })
  socket.on('joinRoom', (data) => {
    // console.log(data)
    console.log(data)
    if (data.oldRoom) {
      socket.leave(data.oldRoom)
    }
    socket.join(data.room)
    socket.broadcast.to(data.room).emit('chatMessage', {
      message: `${data.akun_name} Joined Chat !`
    })
  })
  socket.on('roomMessage', (data) => {
    console.log(data)
    io.to(data.room).emit('chatMessage', data)
    // io.to(data.imageUser).emit(data)
  })
  socket.on('notif-message', (data) => {
    console.log('dataku ', data)
    socket.broadcast.to(data.friendId).emit('notif-message', data)
  })
  socket.on('typing', (data) => {
    console.log('data typing ', data)
    socket.broadcast.to(data.room).emit('typing', data)
  })
})
server.listen(port, () => {
  console.log(`Express app is listen on port ${port} !`)
})
