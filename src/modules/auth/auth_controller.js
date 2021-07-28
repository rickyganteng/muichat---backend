const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authModel = require('./auth_model')
const nodemailer = require('nodemailer')
const fs = require('fs')

require('dotenv').config()

module.exports = {
  sayHello: async (req, res) => {
    try {
      return helper.response(res, 200, 'Test', null)
    } catch (error) {
      return helper.response(res, 400, 'Failed', error)
    }
  },
  register: async (req, res) => {
    try {
      const { userName, userEmail, userPassword } = req.body

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)

      const randomNumber = () => {
        return Math.ceil(Math.random() * 9999)
      }

      const checkEmail = await authModel.getDataCondition({
        akun_email: userEmail
      })

      if (checkEmail.length > 0) {
        return helper.response(
          res,
          401,
          'Email is Registered',
          checkEmail[0].akun_email
        )
      } else {
        const setData = {
          akun_name: userName,
          akun_email: userEmail,
          akun_password: encryptPassword,
          akun_add_id: randomNumber()
        }
        console.log(setData)
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
          }
        })

        const result = await authModel.register(setData)
        delete result.akun_password

        const mailOption = {
          from: '"MuiCHat" <putericky@gmail.com>', // sender address
          to: userEmail, // list of receivers
          subject: 'MuiChat - Activation Email', // Subject line
          html: `<b>Click Here to activate your account</b><form action='http://localhost:3009/backend3/api/v1/auth/patch/${result.id}' method="post">
          <button type="submit" name="your_name" value="your_value">Go</button>
      </form>` // html body
        }

        await transporter.sendMail(mailOption, function (error, info) {
          if (error) {
            console.log(error)
          } else {
            console.log('Email Sent : ' + info.response)
          }
        })
        return helper.response(res, 200, 'Success Register', result)
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmail = await authModel.getDataCondition({
        akun_email: userEmail
      })

      if (checkEmail.length > 0) {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmail[0].akun_password
        )

        if (checkPassword) {
          const payload = checkEmail[0]
          delete payload.akun_password
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '24h'
          })

          const result = { ...payload, token }
          return helper.response(res, 200, 'Success Login', result)
        } else {
          return helper.response(res, 400, 'Wrong Password')
        }
      } else {
        return helper.response(res, 404, 'Email Not Registered')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateImage: async (req, res) => {
    try {
      const { id } = req.params
      // const {
      //   AccountName,
      //   AccountEmail,
      //   AccountPhone
      // } = req.body
      const setData = {
        // akun_name: AccountName,
        // akun_email: AccountEmail,
        // akun_phone: AccountPhone,
        akun_image: req.file ? req.file.filename : '',
        akun_updated_at: new Date(Date.now())
      }

      const dataToUpdate = await authModel.getDataById(id)
      if (dataToUpdate.length > 0) {
        if (dataToUpdate.length > 0) {
          const imageToDelete = dataToUpdate[0].akun_image
          const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)

          if (isImageExist && imageToDelete) {
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const result = await authModel.updateData(setData, id)
        return helper.response(res, 200, 'Success Update Image', result)
      } else {
        return helper.response(res, 404, 'Failed! No Image Is Updated')
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  verificationUser: async (req, res) => {
    try {
      const { id } = req.params
      const AkunId = `akun_id = ${id}`
      const setData = 'akun_verification = 1'
      const table = 'akun'
      const checkIdWorker = await authModel.getUserDataConditions({
        akun_id: id
      })
      const result = await authModel.verfication(table, setData, AkunId)
      console.log(result)
      if (checkIdWorker.length > 0) {
        return helper.response(res, 200, `Succes verification worker id: ${id}`)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found`, null)
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  }
}
