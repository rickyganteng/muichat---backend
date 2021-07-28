const express = require('express')
const chatceController = require('./chat_controller')
const Route = express.Router()
const { sayHello } = require('./chat_controller')
const uploadFile = require('../../middleware/uploads')

Route.get('/hello', sayHello)

Route.get('/hello', chatceController.sayHello)
Route.get('/', chatceController.getChat)
Route.post('/', uploadFile, chatceController.postChat)
Route.get('/:id', chatceController.getChatById)
// Route.patch('/:id', uploadFile, chatceController.updateExperience)
Route.delete('/:id', chatceController.deleteChat)

module.exports = Route
