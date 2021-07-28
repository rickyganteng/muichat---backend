const connection = require('../../config/mysql')

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * fROM contact', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM contact JOIN akun ON contact.contact_friend_id = akun.akun_id WHERE contact.contact_akun_id = ?',
        id,
        (error, result) => {
          // console.log(error)
          // console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataByIdContact: (idd) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT contact.contact_akun_id, contact.contact_friend_id,akun.akun_name,akun.akun_email,akun.akun_image,akun.akun_phone FROM contact INNER JOIN akun ON contact_friend_id = akun.akun_id where contact.contact_akun_id = ? ',
        idd, (error, result) => {
          // console.log(error)
          // console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO contact SET ?',
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
  getDataId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM contact   WHERE contact_id=?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
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
        'DELETE FROM contact WHERE contact_id = ?',
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
