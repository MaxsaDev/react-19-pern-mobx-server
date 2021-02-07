//получаем Router из express
const Router = require('express')
//создаем объект этого Router
const router = new Router()
const typeController = require('../controller/typeController')


//typeRouter, userRouter... - это будут "подроутами", являться его частью, поэтому указываем:
router.post('/', typeController.create)
router.get('/', typeController.getAll)


module.exports = router