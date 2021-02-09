//получаем Router из express
const Router = require('express')
//создаем объект этого Router
const router = new Router()
const brandController = require('../controller/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

//typeRouter, userRouter... - это будут "подроутами", являться его частью, поэтому указываем:
router.post('/', checkRole('ADMIN'), brandController.create)
router.get('/', brandController.getAll)


module.exports = router