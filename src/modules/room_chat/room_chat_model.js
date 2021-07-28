const connection = require('../../config/mysql')

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM akun INNER JOIN room_chat ON akun.akun_id = room_chat.friend_id', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM akun INNER JOIN room_chat ON akun.akun_id = room_chat.friend_id WHERE room_chat.akun_id = ?',
        id,
        (error, result) => {
          // console.log(error)
          // console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM  room_chat WHERE room_chat_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  // getDataByIdDelete: (id) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       'SELECT experiences.experience_id , workers.worker_name, experiences.experience_company, experiences.experience_position, experiences.experience_desc FROM experiences INNER JOIN workers ON experiences.worker_id = workers.worker_id WHERE experiences.experience_id = ?',
  //       id,
  //       (error, result) => {
  //         console.log(error)
  //         console.log(result)
  //         !error ? resolve(result) : reject(new Error(error))
  //       }
  //     )
  //   })
  // },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO room_chat SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  // updateData: (setData, id) => {
  //   return new Promise((resolve, reject) => {
  //     connection.query(
  //       'UPDATE experiences SET ? WHERE experience_id = ?',
  //       [setData, id],
  //       (error, result) => {
  //         if (!error) {
  //           const newResult = {
  //             id: id,
  //             ...setData
  //           }
  //           resolve(newResult)
  //         } else {
  //           reject(new Error(error))
  //         }
  //       }
  //     )
  //   })
  // },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM room_chat WHERE room_chat_id = ?',
        id,
        (error, result) => {
          // console.log(error)
          // console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataByIdRoom: (idd) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT room_chat.room_chat, chat.sender_id, chat.receiver_id,chat.message, chat.created_at FROM chat INNER JOIN room_chat ON room_chat.room_chat = chat.room_chat where room_chat.room_chat = ? ',
        idd, (error, result) => {
          // console.log(error)
          // console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataCondition: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM room_chat WHERE ?',
        setData,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  deleteChat: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM chat WHERE room_chat = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
