const helper = require('../../helpers/wrapper')
const redis = require('redis')
const client = redis.createClient()

const userModel = require('./user_model')

require('dotenv').config({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
})
client.on('connect', () => {
  console.log('Connected to our redis instance!')
})
module.exports = {
  getAllData: async (req, res) => {
    try {
      let { search } = req.query
      if (!search) {
        search = helper.response(res, 404, 'User Not Found', null)
      }
      const result = await userModel.getData(search)
      client.setex(
        `getuser:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result })
      )
      return helper.response(res, 200, 'Success Get Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getDataById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await userModel.getDataById(id)
      client.set(`getUserid:${id}`, JSON.stringify(result))
      return helper.response(res, 200, `Success Get Data by id ${id}`, result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateData: async (req, res) => {
    try {
      const { id } = req.params
      const getDataId = await userModel.getDataById(id)
      // console.log(getDataId[0])
      let { userName, userBio, userAddId } = req.body
      console.log(req.body)
      if (userName === undefined) {
        userName = getDataId[0].akun_name
      }

      if (userAddId === undefined) {
        userAddId = getDataId[0].akun_add_id
      }
      if (userBio === undefined) {
        userBio = getDataId[0].akun_bio
      }

      const setData = {
        akun_name: userName,
        akun_bio: userBio,
        akun_add_id: userAddId,
        akun_updated_at: new Date(Date.now())
      }
      // const checkData = await userModel.getDataCondition({
      //   user_add_id: userAddId
      // })
      // if (checkData.length > 0) {
      //   return helper.response(
      //     res,
      //     401,
      //     'User Add Id is not Available',
      //     checkData[0].user_add_id
      //   )
      // } else {
      // const getDataId = await userModel.getDataById(id)
      if (getDataId.length > 0) {
        const result = await userModel.updateData(setData, id)
        return helper.response(
          res,
          200,
          `Success Update Data by id ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `Data by id ${id}, not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateDataPhone: async (req, res) => {
    try {
      const { id } = req.params
      const { userPhone } = req.body
      const setData = {
        akun_phone: userPhone
      }
      const checkData = await userModel.getDataCondition({
        akun_phone: userPhone
      })
      if (checkData.length > 0) {
        return helper.response(
          res,
          401,
          'Phone is Registered',
          checkData[0].akun_phone
        )
      } else {
        const getDataId = await userModel.getDataById(id)
        if (getDataId.length > 0) {
          const result = await userModel.updateDataPhone(setData, id)
          return helper.response(
            res,
            200,
            `Success Update Data by id ${id}`,
            result
          )
        } else {
          return helper.response(res, 404, `Data by id ${id}, not Found`, null)
        }
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  updateImage: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        akun_image: req.file ? req.file.filename : ''
      }

      const getDataId = await userModel.getDataById(id)
      if (getDataId.length > 0) {
        const result = await userModel.updateDataImage(setData, id)
        return helper.response(res, 200, 'Success Update Data Image', result)
      } else {
        return helper.response(res, 404, `Data by id ${id}, not Found`, null)
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  deleteData: async (req, res) => {
    try {
      const { id } = req.params
      const getDataId = await userModel.getDataById(id)
      console.log(getDataId)
      if (getDataId.length > 0) {
        const result = await userModel.deleteData(id)
        return helper.response(res, 200, 'Success Delete Data', result)
      } else {
        return helper.response(res, 404, `Data by id ${id}, Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
