const connection = require('../../config/mysql')

module.exports = {
  getData: (search) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM akun WHERE akun_email LIKE "%"?"%" ',
        search,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM akun WHERE akun_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
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
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE akun SET ? WHERE akun_id = ?',
        [setData, id],
        (error, result) => {
          !error ? resolve({ id: id, ...setData }) : reject(new Error(error))
        }
      )
    })
  },
  updateDataPhone: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE akun SET ? WHERE akun_id = ?',
        [setData, id],
        (error, result) => {
          !error ? resolve({ id: id, ...setData }) : reject(new Error(error))
        }
      )
    })
  },
  updateDataImage: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE akun SET ? WHERE akun_id = ?',
        [setData, id],
        (error, result) => {
          !error ? resolve({ id: id, ...setData }) : reject(new Error(error))
        }
      )
    })
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM akun WHERE akun_id = ? ',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
