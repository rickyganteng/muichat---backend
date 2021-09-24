const helper = require('../../helpers/wrapper')
const contactModel = require('./room_chat_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getRoom: async (req, res) => {
    try {
      const result = await contactModel.getDataAll()
      return helper.response(res, 200, 'Succes Get All Data Room', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getRoomByIdRoom: async (req, res) => {
    try {
      const { idd } = req.params
      const result = await contactModel.getDataByIdRoom(idd)
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
  getRoomById: async (req, res) => {
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
  // postRoom: async (req, res) => {
  //   try {
  //     console.log(req.body)
  //     const {
  //       roomChat,
  //       userId,
  //       friendId
  //     } = req.body
  //     const setData = {
  //       room_chat: roomChat,
  //       akun_id: userId,
  //       friend_id: friendId,
  //       room_created_at: new Date(Date.now())
  //     }
  //     const result = await contactModel.createData(setData)
  //     return helper.response(res, 200, 'Success Create Room Chat', result)
  //   } catch (error) {
  //     // return helper.response(res, 400, 'Bad Request', error)
  //     console.log(error)
  //   }
  // },
  postRoom: async (req, res) => {
    try {
      const { userId, friendId } = req.body
      const getDataCondition = await contactModel.getDataCondition({
        friend_id: friendId
      })
      console.log(getDataCondition)
      if (getDataCondition.length > 0) {
        return helper.response(res, 404, 'Room is Added', null)
      } else {
        const randomNumber = Math.ceil(Math.random() * 9999)
        console.log(randomNumber)
        const setData = {
          room_chat: randomNumber,
          akun_id: userId,
          friend_id: friendId,
          room_created_at: new Date(Date.now())
        }
        console.log(req.body)
        const setData2 = {
          room_chat: randomNumber,
          akun_id: friendId,
          friend_id: userId,
          room_created_at: new Date(Date.now())
        }

        const result = await contactModel.createData(setData)
        await contactModel.createData(setData2)
        return helper.response(res, 200, 'Success Post Data', result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
      // console.log(error);
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
  // deleteRoom: async (req, res) => {
  //   try {
  //     const { id } = req.params
  //     const initialResult = await contactModel.getDataId(id)
  //     if (initialResult.length > 0) {
  //       const result = await contactModel.deleteData(id)
  //       // kondisi pengecekan dalam id
  //       // console.log(result)
  //       if (result) {
  //         return helper.response(
  //           res,
  //           200,
  //           'Success Delete By Id',
  //           initialResult[0]
  //         )
  //       } else {
  //         return helper.response(res, 404, 'Data By id .... Not Found !', null)
  //       }
  //     } else {
  //       // return helper.response(res, 404, 'Data By id .... Not Found !', null)
  //       console.log(null)
  //     }
  //   } catch (error) {
  //     // return helper.response(res, 400, 'Bad Request', error)
  //     console.log(error)
  //   }
  // }
  deleteRoom: async (req, res) => {
    try {
      const { id } = req.params
      const getId = await contactModel.getDataId(id)
      const idRoom = getId[0].room_chat
      if (getId.length > 0) {
        // console.log(idRoom);
        const result = await contactModel.deleteData(id)
        await contactModel.deleteChat(idRoom)
        return helper.response(res, 200, 'Succes Delete Data', result)
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      console.log('wddw', req.params)
      return helper.response(res, 400, 'Bad Request', error)
      // console.log(error);
    }
  }
}
