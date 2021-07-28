const helper = require('../../helpers/wrapper')
const chatModel = require('./chat_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getChat: async (req, res) => {
    try {
      const result = await chatModel.getDataAll()
      return helper.response(res, 200, 'Succes Get All Data Chat', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getChatById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await chatModel.getDataById(id)
      // kondisi pengecekan dalam id
      // console.log(result)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data By Id', result)
      } else {
        return helper.response(res, 404, 'Data By id .... Not Found !', null)
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  },
  postChat: async (req, res) => {
    try {
      console.log(req.body)
      const {
        userId,
        friendId,
        roomChat,
        Message
      } = req.body
      const setData = {
        room_chat: roomChat,
        sender_id: userId,
        receiver_id: friendId,
        message: Message,
        created_at: new Date(Date.now())
      }
      const result = await chatModel.createData(setData)
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
  deleteChat: async (req, res) => {
    try {
      const { id } = req.params
      const initialResult = await chatModel.getDataById(id)
      if (initialResult.length > 0) {
        const result = await chatModel.deleteData(id)
        // kondisi pengecekan dalam id
        // console.log(result)
        if (result) {
          return helper.response(
            res,
            200,
            'Success Delete By Id',
            initialResult[0]
          )
        } else {
          return helper.response(res, 404, 'Data By id .... Not Found !', null)
        }
      } else {
        // return helper.response(res, 404, 'Data By id .... Not Found !', null)
        console.log(null)
      }
    } catch (error) {
      // return helper.response(res, 400, 'Bad Request', error)
      console.log(error)
    }
  }
}
