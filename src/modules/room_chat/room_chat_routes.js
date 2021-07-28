const express = require('express')
const roomController = require('./room_chat_controller')
const Route = express.Router()
const { sayHello } = require('./room_chat_controller')
const uploadFile = require('../../middleware/uploads')

Route.get('/hello', sayHello)

Route.get('/hello', roomController.sayHello)
Route.post('/', uploadFile, roomController.postRoom)
// Route.patch('/:id', uploadFile, chatceController.updateExperience)
Route.get('/', roomController.getRoom)
Route.get('/ling/:idd', roomController.getRoomByIdRoom)
Route.get('/:id', roomController.getRoomById)
Route.delete('/:id', roomController.deleteRoom)

module.exports = Route
