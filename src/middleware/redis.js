
// const redis = require('redis')
// const client = redis.createClient({
//   host: process.env.REDIS_HOSTNAME,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD
// })
// const helper = require('../helpers/wrapper')

// module.exports = {
//   getUserByIdRedis: (req, res, next) => {
//     const { id } = req.params
//     // console.log('Get data by id redis', id)
//     client.get(`getUserid:${id}`, (error, result) => {
//       if (!error && result != null) {
//         console.log('data ada di dalam redis')
//         return helper.response(
//           res,
//           200,
//           `Succes Get Data by Id ${id} (Redis)`,
//           JSON.parse(result)
//         )
//       } else {
//         console.log('data tidak ada dalam redis')
//         next()
//       }
//     })
//   },
//   getUserRedis: (req, res, next) => {
//     // console.log('Get data by id redis', id)
//     client.get(`getUser:${JSON.stringify(req.query)}`, (error, result) => {
//       if (!error && result != null) {
//         console.log('data ada dalam redis')
//         const newResult = JSON.parse(result)
//         return helper.response(
//           res,
//           200,
//           'Succes get user All (redis)',
//           newResult.result,
//           newResult.pageInfo
//         )
//       } else {
//         console.log('data tidak ada dalam redis')
//         next()
//       }
//     })
//   },
//   clearDataUserRedis: (req, res, next) => {
//     // cari yang berawalan getmovie akhiran apapun
//     client.keys('getuser*', (_error, result) => {
//       // _untuk param yang tidak dipakai tapi harus ada
//       console.log('isi key dalam redis', result) // [array isi semua kunci yang ada awalan getmovie]
//       if (result.length > 0) {
//         result.forEach((item) => {
//           client.del(item)
//         })
//       }
//       next()
//     })
//   }

// }
