import express from 'express'
const router = express.Router()
import UserController from '../controllers/userController.js'
//import TreeFormRouter from '../TreeFormRouter/TreeFormRoutes.js'

router.get('/', UserController.home)


router.get('/nodeForms', UserController.nodeForms)

router.get('/tree', UserController.tree)

router.get('/edetails', UserController.edetails)
router.get('/wardDetails', UserController.wardDetails)

router.get('/registration',UserController.registration)
router.post('/registration',UserController.createUserDoc)

router.get('/login',UserController.login)
router.post('/login',UserController.verifyLogin)

router.get('/logout',UserController.logout)

router.get('/orgtreedata',UserController.orgtreedata)

router.get('/survey',UserController.survey)
router.post('/survey',UserController.createSurvey)

router.get('/surveyreport',UserController.surveyReport)

router.get('/treeNodeInfo',UserController.treeNodeInfo)

router.get('/boothCommitteeMember',UserController.boothCommitteeMember)
router.get('/boothAgent',UserController.boothAgent)
router.get('/wardIncharg',UserController.wardIncharg)
router.get('/mandalPresident',UserController.mandalPresident)
router.get('/districtPresident',UserController.districtPresident)
router.get('/boothPresident',UserController.boothPresident)

router.post('/boothVerification',UserController.boothVerification)
router.get('/getBoothVerify',UserController.getBoothVerify)

router.get('/verification',UserController.getBoothVerificationForm)
router.post('/boothVerificationList',UserController.boothVerificationList)
router.post('/boothVerificationListV1',UserController.boothVerificationListV1)

router.get('/getVerificatioListData',UserController.getVerificatioListData)

router.get('/reportv2',(req,res)=>{res.render('highChartReport',{name:''});})


router.get('/getFormBF', UserController.getFormBF)
router.post('/createUpdateBF', UserController.createUpdateBF)

router.get('/getFormInfl', UserController.getFormInfl)
router.post('/createUpdateInfl', UserController.createUpdateInfl)


router.get('/surveyColumns',UserController.surveyColumns);
router.get('/surveydata',UserController.surveydata)

router.get('/verificationColumns',UserController.verificationColumns);
router.get('/verificationData',UserController.verificationData)
router.get('/verificationDatav2',UserController.verificationDatav2)

router.get('/boothFactColumns',UserController.boothFactColumns);
router.get('/boothFactData',UserController.boothFactData)

router.get('/influencerColumns',UserController.influencerColumns);
router.get('/influencerData',UserController.influencerData)


export default router