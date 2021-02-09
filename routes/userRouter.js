//получаем Router из express
const Router = require('express')
//создаем объект этого Router
const router = new Router()
//импортируем Controller
const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')

//typeRouter, userRouter... - это будут "подроутами", являться его частью, поэтому указываем:
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)


module.exports = router