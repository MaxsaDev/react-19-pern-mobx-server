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
//получаем порт на котором будет работать сервер из переменных окружения (.env)
const PORT = process.env.PORT || 5000
//создаем объект, вызывая функцию express
const app = express()
//вызываем у приложения функцию listen, который указывает какой порт должно слушать наше приложение
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
