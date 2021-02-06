//конфигурируем подключение к базе данных
//импортируем и сразу проводим деструктуризацию, потому что модуль большой, а нам нужен только этот класс
const {Sequelize} = require('sequelize')
//экспортируем объект, который создаем из этого класса
//в нем и укажем конфигурацию (DB, user, pass, dialect/postgres, MySQL.../, host, port)
module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
)