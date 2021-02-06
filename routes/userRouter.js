//получаем Router из express
const Router = require('express')
//создаем объект этого Router
const router = new Router()
//импортируем Controller
const userController = require('../controller/userController')

//typeRouter, userRouter... - это будут "подроутами", являться его частью, поэтому указываем:
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', userController.check)


module.exports = router