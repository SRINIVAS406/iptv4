import express from 'express'

const treeRouter = express.Router()
import TreeNodeController from '../controllers/TreeControler.js'

treeRouter.get('/getFormBA', TreeNodeController.getFormBA)
treeRouter.post('/createUpdateBA', TreeNodeController.createUpdateBA)

treeRouter.get('/getFormBCM', TreeNodeController.getFormBCM)
treeRouter.post('/createUpdateBCM', TreeNodeController.createUpdateBCM)

treeRouter.get('/getFormBP', TreeNodeController.getFormBP)
treeRouter.post('/createUpdateBP', TreeNodeController.createUpdateBP)

treeRouter.get('/getFormGS', TreeNodeController.getFormGS)
treeRouter.post('/createUpdateGS', TreeNodeController.createUpdateGS)

treeRouter.get('/getFormWIC', TreeNodeController.getFormWIC)
treeRouter.post('/createUpdateWIC', TreeNodeController.createUpdateWIC)

treeRouter.get('/getFormMP', TreeNodeController.getFormMP)
treeRouter.post('/createUpdateMP', TreeNodeController.createUpdateMP)

treeRouter.get('/getFormDPS', TreeNodeController.getFormDPS)
treeRouter.post('/createUpdateDPS', TreeNodeController.createUpdateDPS)


treeRouter.get('/getTreeChildNode', TreeNodeController.getTreeChildNode)

export default treeRouter