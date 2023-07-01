const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// '/api/users'

router.post('/',usersCtrl.create)
router.post('/login',usersCtrl.login)
router.get('/check-token',ensureLoggedIn,usersCtrl.checkToken)
router.get('/:userId',ensureLoggedIn,usersCtrl.getAccount)
router.put('/:userId/pic',ensureLoggedIn,usersCtrl.updatePic)
router.put('/:userId/password',ensureLoggedIn,usersCtrl.updatePass)
router.put('/:userId/friend',ensureLoggedIn,usersCtrl.updateFriend)
router.get('/:userId/your-following-recommended',ensureLoggedIn,usersCtrl.getAllRecommendedForAnAccount)


module.exports = router