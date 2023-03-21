import LowCode from './LowCode.js'
const prefix = '/Everright-api'
export default (app) => {
  app.use(`${prefix}/lowCode`, LowCode)
}
