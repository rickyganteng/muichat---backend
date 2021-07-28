const express = require('express')
const Route = express.Router()

// const redisMiddleware = require('../../middleware/redis')
// const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')
const userController = require('./user_controller')
const authController = require('../auth/auth_controller')

Route.get(
  '/',
  // authMiddleware.authentication,
  // redisMiddleware.getDataUserRedis,
  userController.getAllData
)
Route.get(
  '/:id',
  // authMiddleware.authentication,
  // redisMiddleware.getUserId,
  userController.getDataById
)
Route.patch(
  '/:id',
  // authMiddleware.authentication,
  // redisMiddleware.clearDataUserId,
  userController.updateData
)
Route.patch(
  '/phone/:id',
  // authMiddleware.authentication,
  // redisMiddleware.clearDataUserId,
  userController.updateDataPhone
)
Route.patch(
  '/image/:id',
  // authMiddleware.authentication,
  // redisMiddleware.clearDataUserId,
  uploadFile,
  authController.updateImage
)
// Route.delete('/:id', authMiddleware.authentication, userController.deleteData)
Route.delete('/:id', userController.deleteData)

module.exports = Route
