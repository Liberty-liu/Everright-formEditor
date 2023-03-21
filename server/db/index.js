import Database from 'better-sqlite3'
import path from 'path'
import url from 'url'
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export default class Db {
  constructor () {
    this.db = ''
  }

  connect () {
    return new Promise((resolve, reject) => {
      try {
        this.db = new Database(path.resolve(__dirname, './', 'Everright.db'))
        resolve(this.db)
      } catch (e) {
        reject(e)
      }
    })
  }

  close () {
    return new Promise((resolve, reject) => {
      try {
        this.db.close()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }
}
