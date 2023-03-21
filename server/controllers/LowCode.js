import LowCodeDb from '../models/LowCode.js'
function sleep (s) {
  s = s || 0
  s = parseInt(s) * 1000
  const now = +new Date()
  let timer = null
  return new Promise((resolve, reject) => {
    timer = setInterval(() => {
      if (now + s < +new Date()) {
        clearInterval(timer)
        resolve(true)
      }
    }, 10)
  })
}
export default {
  async createObj (req, res) {
    try {
      const data = await LowCodeDb.createObj(req.body)
      res.json({
        code: 0,
        data
      })
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  },
  async getAllObjData (req, res) {
    try {
      const data = await LowCodeDb.getAllObjData()
      res.json({
        code: 0,
        data
      })
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  },
  async getObjDataByid (req, res) {
    try {
      const data = await LowCodeDb.getAllObjData(req.params.objid)
      res.json({
        code: 0,
        data
      })
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  },
  async modifyDataByid (req, res) {
    try {
      await LowCodeDb.modifyDataByid(req.params.objid, req.body)
      res.json({
        code: 0,
        data: {}
      })
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  },
  async delObjDataByid (req, res) {
    try {
      await LowCodeDb.delObjDataByid(req.params.objid)
      res.json({
        code: 0,
        data: {}
      })
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  },
  async createActionByObjid (req, res) {
    try {
      await LowCodeDb.createActionByObjid(req.params.objid, req.body.content)
      res.json({
        code: 0,
        data: {}
      })
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  },
  async modifyActionByObjidAndId (req, res) {
    try {
      await LowCodeDb.modifyActionByObjidAndId(req.params.objid, req.params.id, req.body.content)
      res.json({
        code: 0,
        data: {}
      })
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  },
  async getAllActionData (req, res) {
    try {
      const data = await LowCodeDb.getAllActionData(req.params.objid)
      res.json({
        code: 0,
        data
      })
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  },
  async getAllActionDataByid (req, res) {
    try {
      const data = await LowCodeDb.getAllActionData(req.params.objid, req.params.id)
      res.json({
        code: 0,
        data
      })
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  },
  async deleteActionByObjidAndId (req, res) {
    try {
      await LowCodeDb.deleteActionByObjidAndId(req.params.objid, req.params.id)
      res.json({
        code: 0,
        data: {}
      })
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  },
  async getFieldsByObjid (req, res) {
    try {
      const data = await LowCodeDb.getAllFieldsData(req.params.objid)
      res.json({
        code: 0,
        data
      })
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  },
  async modifyFieldsByObjid (req, res) {
    try {
      const data = await LowCodeDb.modifyFieldsByObjid(req.params.objid, req.body)
      res.json({
        code: 0,
        data
      })
    } catch (e) {
      res.json({
        code: 1,
        msg: e.toString()
      })
    }
  }
}
