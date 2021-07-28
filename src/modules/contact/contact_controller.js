const helper = require('../../helpers/wrapper')
const contactModel = require('./contact_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getContact: async (req, res) => {
    try {
      const result = await contactModel.getDataAll()
      return helper.response(res, 200, 'Succes Get All Data Contact', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getContactByIdUser: async (req, res) => {
    try {
      const { idd } = req.params
      const result = await contactModel.getDataByIdContact(idd)
      // kondisi pengecekan dalam id
      // console.log(result)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By id .... Not Found !', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getContactById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await contactModel.getDataById(id)
      // kondisi pengecekan dalam id
      // console.log(result)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By id .... Not Found !', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postContact: async (req, res) => {
    try {
      const {
        contactUserId,
        contactFriendId
      } = req.body
      const setData = {
        contact_akun_id: contactUserId,
        contact_friend_id: contactFriendId,
        contact_created_at: new Date(Date.now())
      }
      console.log(setData)
      const result = await contactModel.createData(setData)
      return helper.response(res, 200, 'Success Create Room Chat', result)
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  // updateExperience: async (req, res) => {
  //   try {
  //     const { id } = req.params
  //     // kondisi pengecekan dalam id
  //     const {
  //       workerId,
  //       experienceCompany,
  //       experiencePosition,
  //       experienceDateStart,
  //       experienceDateEnd,
  //       experienceDesc,
  //       experienceCreatedAt
  //     } = req.body
  //     const setData = {
  //       worker_id: workerId,
  //       experience_company: experienceCompany,
  //       experience_position: experiencePosition,
  //       experience_date_start: experienceDateStart,
  //       experience_date_end: experienceDateEnd,
  //       experience_desc: experienceDesc,
  //       experience_created_at: experienceCreatedAt,
  //       experience_updated_at: new Date(Date.now())
  //     }
  //     const result = await experienceModel.updateData(setData, id)
  //     return helper.response(res, 200, 'Success Update Experience', result)
  //     // console.log(req.params)
  //     // console.log(req.body)
  //   } catch (error) {
  //     // return helper.response(res, 400, 'Bad Request', error)
  //     console.log(error)
  //   }
  // },
  deleteContact: async (req, res) => {
    try {
      const { id } = req.params
      const getId = await contactModel.getDataId(id)
      if (getId.length > 0) {
        const result = await contactModel.deleteData(id)
        return helper.response(res, 200, 'Succes Delete Data', result)
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
