const express = require('express')
const Route = express.Router()

const authRoutes = require('../modules/auth/auth_routes')
const userRoutes = require('../modules/user/user_routes')
const contactRoutes = require('../modules/contact/contact_routes')
const chatRoutes = require('../modules/chat/chat_routes')
const roomChatRoutes = require('../modules/room_chat/room_chat_routes')

Route.use('/auth', authRoutes)
Route.use('/user', userRoutes)
Route.use('/contact', contactRoutes)
Route.use('/chat', chatRoutes)
Route.use('/roomchat', roomChatRoutes)

module.exports = Route
