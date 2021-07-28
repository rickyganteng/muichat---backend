const connection = require('../../config/mysql')

module.exports = {
  register: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO akun SET ? ', setData, (error, result) => {
        !error
          ? resolve({ id: result.insertId, ...setData })
          : reject(new Error(error))
      })
    })
  },
  getDataCondition: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM akun WHERE ?',
        setData,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM akun where akun_id = ?',
        id,
        (error, result) => {
          // console.log(error)
          // console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE akun SET ? WHERE akun_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
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
  getUserDataConditions: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM akun WHERE ?',
        data,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  verfication: (table, setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE ${table} SET ${setData} WHERE ${id}`,
        (error, result) => {
          console.log(error)
          if (!error) {
            const newResult = {
              id: id,
              setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
