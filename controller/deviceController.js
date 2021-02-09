const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')

const {Device, DeviceInfo} = require('../models/models')

class DeviceController {
  async create(req, res, next) {
    try {
      const {name, price, brandId, typeId, info} = req.body
      const {img} = req.files
      //для файла надо сгенерировать уникальное имя
      let fileName = uuid.v4() + '.jpg'
      //создадим папку static, в которую будем перемещать все файлы, которые будут перемещать с клиента
      //а потом научим наш сервер отдавать эти файлы как статику, чтобы мы могли через браузер эти файлы получать
      //path.resolve - адаптирует путь к операционной системе
      //__dirname - название текущей директтории, '..' - поднимаемся вверх на 1 уровень, static - переходим в папку static
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const device = await Device.create({name, price, brandId, typeId, img: fileName})

      if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        )
      }

      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))
      console.log(e)
    }

  }

  async getAll(req, res) {
    const {brandId, typeId, limit, page} = req.query
    //страница (по умолчанию 1)
    page = page || 1
    //количество записей (по умолчанию 9)
    limit = limit || 9
    //отступ, например страница 10 * 9 = 90 - 9 = 81
    let offset = page * limit - limit
    let devices
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({limit, offset})
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
    }
    return res.json(devices)
  }

  async getOne(req, res) {
    const {id} = req.params
    const device = await Device.findOne(
      {
        where: {id},
        include: [{model: DeviceInfo, as: 'info'}]
      },
    )
    return res.json(device)
  }
}

//новый объект
module.exports = new DeviceController()