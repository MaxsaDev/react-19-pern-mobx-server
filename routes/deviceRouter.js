//получаем Router из express
const Router = require('express')
//создаем объект этого Router
const router = new Router()

//typeRouter, userRouter... - это будут "подроутами", являться его частью, поэтому указываем:
router.post('/')
router.get('/')
router.get('/:id')


module.exports = router