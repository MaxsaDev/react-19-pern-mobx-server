const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Basket} = require("../models/models");
const {User} = require("../models/models");

const generateJwt = (id, email, role) => {
  //передаем строку для шифрования, секретный ключ, и время жизни токена
  return jwt.sign(
    {id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}


class UserController {

  async registration(req, res, next) {
    const {email, password, role} = req.body

    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или password'))
    }

    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    //log
    console.log('hashPassword: ', hashPassword)
    const user = await User.create({email, role, password: hashPassword})
    const basket = await Basket.create({userId: user.id})

    const token = generateJwt(user.id, user.email, user.role)
    return res.json({token})
  }


  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    }


    //если пользователь есть
    //проверяем пароли password - тот, что написал пользователь, user.password - тот, что захеширован в БД
    let comparePassword = bcrypt.compareSync(password, user.password)

    if (!comparePassword) {
      return next(ApiError.internal('Пароль неверный'))
    }

    const token = generateJwt(user.id, user.email, user.role)
    console.log('token: ', token)
    return res.json({token})
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }
}

//новый объект
module.exports = new UserController()