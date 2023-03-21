import _ from 'lodash-es'
import Database from '../db/index.js'
class LowCodeD extends Database {
  createObj (params) {
    return new Promise(async (resolve, reject) => {
      const {
        name,
        content
      } = params
      try {
        await this.connect()
        const insert = this.db.prepare('INSERT INTO object (name, content) VALUES (@name, @content)')
        const { lastInsertRowid } = insert.run({
          name,
          content: JSON.stringify(params.content)
        })
        const insertFiled = this.db.prepare('INSERT INTO field (obj_id, content) VALUES (@obj_id, @content)')
        insertFiled.run({
          obj_id: String(lastInsertRowid),
          content: JSON.stringify([])
        })
        const data = await this.getAllObjData(lastInsertRowid)
        await this.close()
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  modifyDataByid (id, params) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connect()
        const updataStmt = this.db.prepare('UPDATE object SET id =@id, name=@name ,content=@content, update_timestamp=unixepoch(\'now\') WHERE id=@id')
        updataStmt.run({
          id,
          name: params.name,
          content: JSON.stringify(params.content)
        })
        const newFields = params.content.fields
        const data = await this.getAllFieldsData(id, false)
        const oldFields = data.content
        const delFields = _.differenceBy(oldFields, newFields, 'key')
        const addFields = _.differenceBy(newFields, oldFields, 'key')
        const universeFields = _.unionBy(newFields, oldFields, 'key')
        delFields.forEach((e) => {
          const index = _.findIndex(universeFields, {
            key: e.key
          })
          if (index !== -1) {
            universeFields.splice(index, 1)
          }
        })
        addFields.forEach(e => {
          e.width = 200
          e.isShow = true
        })
        universeFields.forEach(e => {
          const findOld = _.find(oldFields, { key: e.key })
          if (!_.isEmpty(findOld)) {
            e.width = findOld.width
            e.isShow = findOld.isShow
          }
        })
        await this.modifyFieldsByObjid(id, {
          content: universeFields
        })
        await this.close()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  modifyFieldsByObjid (id, params) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connect()
        const updataStmt = this.db.prepare('UPDATE field SET obj_id =@obj_id, content=@content, update_timestamp=unixepoch(\'now\') WHERE obj_id=@obj_id')
        updataStmt.run({
          obj_id: id,
          content: JSON.stringify(params.content)
        })
        await this.close()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  getAllFieldsData (objid, isClose = true) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connect()
        const stmt = this.db.prepare(`SELECT * FROM field${objid ? ' WHERE obj_id = ?' : ' ORDER BY update_timestamp DESC'}`)
        const data = objid ? stmt.get(objid) : stmt.all()
        if (Array.isArray(data)) {
          data.map(e => {
            e.content = JSON.parse(e.content)
            return e
          })
        } else {
          data.content = JSON.parse(data.content)
        }
        if (isClose) {
          await this.close()
        }
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  delObjDataByid (id) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connect()
        const delStmt = this.db.prepare('DELETE FROM object WHERE id=@id')
        delStmt.run({ id })
        await this.close()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  getAllObjData (id, isClose = true) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connect()
        const stmt = this.db.prepare(`SELECT * FROM object${id ? ' WHERE id = ?' : ' ORDER BY update_timestamp DESC'}`)
        const data = id ? stmt.get(id) : stmt.all()
        if (Array.isArray(data)) {
          data.map(e => {
            e.content = JSON.parse(e.content)
            return e
          })
        } else {
          data.content = JSON.parse(data.content)
        }
        if (isClose) {
          await this.close()
        }
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  createActionByObjid (objid, content) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connect()
        const insert = this.db.prepare('INSERT INTO object_table (obj_id, content) VALUES (@obj_id, @content)')
        insert.run({
          obj_id: objid,
          content: JSON.stringify(content)
        })
        await this.close()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  modifyActionByObjidAndId (objid, id, content) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connect()
        const updataStmt = this.db.prepare('UPDATE object_table SET id =@id, obj_id=@obj_id, content=@content, update_timestamp=unixepoch(\'now\') WHERE id=@id AND obj_id=@obj_id')
        updataStmt.run({
          id,
          obj_id: objid,
          content: JSON.stringify(content)
        })
        await this.close()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  getAllActionData (objid, id) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connect()
        const stmt = this.db.prepare(`SELECT * FROM object_table${id ? ' WHERE obj_id = ? AND id = ?' : ' WHERE obj_id = ? ORDER BY update_timestamp DESC'}`)
        const data = id ? stmt.get(objid, id) : stmt.all(objid)
        if (Array.isArray(data)) {
          data.map(e => {
            e.content = JSON.parse(e.content)
            return e
          })
        } else {
          data.content = JSON.parse(data.content)
        }
        await this.close()
        resolve(data)
      } catch (e) {
        reject(e)
      }
    })
  }

  deleteActionByObjidAndId (objid, id) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.connect()
        const delStmt = this.db.prepare('DELETE FROM object_table WHERE obj_id=@objid AND id=@id')
        delStmt.run({ objid, id })
        await this.close()
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }
}
export default new LowCodeD()
