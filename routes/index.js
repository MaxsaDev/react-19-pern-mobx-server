//получаем Router из express
const Router = require('express')
//создаем объект этого Router
const router = new Router()
//импортируем роуты
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const deviceRouter = require('./deviceRouter')

//typeRouter, userRouter... - это будут "подроутами", являться его частью, поэтому указываем:
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)


module.exports = router