/*
echo "# react-19-pern-mobx-server" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/MaxsaDev/react-19-pern-mobx-server.git
git push -u origin main
*/

/*
express
pg
pg-hstore
sequelize - ORM для автоматизации запросов
cors - для обращения из браузера к нашему серверу
dotenv - для установки переменных окружения
-D nodemon - для автоматической перезагрузки сервера
*/

//для считывания данных переменных окружения
require('dotenv').config()
//импортируем express
const express = require('express')
//импортируем объект из файла с натройками БД
const sequelize = require('./db')
//импортируем модели
const models = require('./models/models')
//cors - для возможности отправлять запросы из браузера
const cors = require('cors')
//импортируем основной, связующий роутер
const router = require('./routes/index')
//импортируем middleware для ошибок
const errorHandler = require('./middleware/ErrorHandlingMiddleware')


//получаем порт на котором будет работать сервер из переменных окружения (.env)
const PORT = process.env.PORT || 5000
//создаем объект, вызывая функцию express
const app = express()
app.use(cors())
//для парсинга json-формата
app.use(express.json())
//вызываем use для роутера c 1- url по которому роутер обрабатывается, а 2 - сам роутер
app.use('/api', router)




//обязательно!!! middleware, который работает с ошибками, должен идти в самом конце!
app.use(errorHandler)

app.get('/',(req, res)=>{
  res.status(200).json({message: 'Working!!!'})
})

const start = async () => {
  try {
    //authenticate - функция, с помощью которой, мы устанавливаем связь с БД
    await sequelize.authenticate()
    //sync - функция, которая будет сверять состояние БД со схемой БД
    await sequelize.sync()
    //вызываем у приложения функцию listen, который указывает какой порт должно слушать наше приложение
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
