import express from 'express'
import LowCode from '../controllers/LowCode.js'
const router = express.Router()
router.post('/obj', LowCode.createObj)
router.get('/obj', LowCode.getAllObjData)
router.get('/obj/:objid', LowCode.getObjDataByid)
router.put('/obj/:objid', LowCode.modifyDataByid)
router.delete('/obj/:objid', LowCode.delObjDataByid)
router.get('/obj/:objid/fields', LowCode.getFieldsByObjid)
router.put('/obj/:objid/fields', LowCode.modifyFieldsByObjid)
router.post('/obj/:objid/action/create', LowCode.createActionByObjid)
router.post('/obj/:objid/action', LowCode.getAllActionData)
router.get('/obj/:objid/action/:id', LowCode.getAllActionDataByid)
router.put('/obj/:objid/action/:id', LowCode.modifyActionByObjidAndId)
router.delete('/obj/:objid/action/:id', LowCode.deleteActionByObjidAndId)
router.post('/uploads', (req, res) => {
  let result = []
  if (Array.isArray(req.files.file)) {
    result = req.files.file.map(e => {
      const arr = e.path.split('/')
      return {
        name: arr[arr.length - 1],
        url: `/${e.path}`
      }
    })
  } else {
    const arr = req.files.file.path.split('/')
    result = [
      {
        name: arr[arr.length - 1],
        url: `/${req.files.file.path}`
      }
    ]
  }
  res.json({
    data: result,
    code: 0
  })
})
export default router
