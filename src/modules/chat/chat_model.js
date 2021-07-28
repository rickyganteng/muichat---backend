const connection = require('../../config/mysql')

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * From chat', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM chat WHERE chat.room_chat= ?',
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
        'SELECT * FROM  chat WHERE chat_id = ?',
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
        'INSERT INTO chat SET ?',
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
        'DELETE FROM chat WHERE chat_id = ?',
        id,
        (error, result) => {
          // console.log(error)
          // console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
