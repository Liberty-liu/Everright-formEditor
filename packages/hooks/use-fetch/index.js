import axios from 'axios'
import { ElMessage } from 'element-plus'
import _ from 'lodash-es'
const instance = axios.create({
  // baseURL: 'http://192.168.31.181:5173',
  baseURL: 'http://localhost:8000',
  timeout: 20000
})
export const useFetch = (url, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      ...config
    }).then(({ data: { data, code, msg } }) => {
      switch (code) {
        case 0: // success
          resolve({ code, msg, data })
          break
        default:
          // other code
          ElMessage.error(msg)
          reject(new Error(msg))
          break
      }
    }).catch((e) => {
      if (_.get(e, 'code', '') !== 'ERR_CANCELED') {
        ElMessage.error(e)
      }
      reject(e)
    })
  })
}
