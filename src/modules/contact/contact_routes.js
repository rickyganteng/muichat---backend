const express = require('express')
const contactController = require('./contact_controller')
const Route = express.Router()
const uploadFile = require('../../middleware/uploads')

Route.get('/', contactController.getContact)
Route.post('/', uploadFile, contactController.postContact)
Route.get('/:id', contactController.getContactById)
Route.get('/go/ling/:idd', contactController.getContactByIdUser)
// Route.patch('/:id', uploadFile, chatceController.updateExperience)
Route.delete('/:id', contactController.deleteContact)

module.exports = Route
