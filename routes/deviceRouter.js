//получаем Router из express
const Router = require('express')
//создаем объект этого Router
const router = new Router()
const deviceController = require('../controller/deviceController')


//typeRouter, userRouter... - это будут "подроутами", являться его частью, поэтому указываем:
router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)


module.exports = router