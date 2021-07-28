const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middleware/uploads')

const authController = require('./auth_controller')

Route.post('/register', authController.register)
Route.post('/login', authController.login)
Route.patch(
  '/img/:id',
  uploadFile,
  authController.updateImage)
Route.post('/patch/:id', authController.verificationUser)

module.exports = Route
