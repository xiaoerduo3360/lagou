const db = require('../utiles/utiles-mongodb')

const positionSchema = db.Schema({
  city: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  positionName: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createTime: {
    type: String,
    required: true,
  }
})

// 设置集合的名称，如果传单数，就会变成复数
const Position = db.model('positions',positionSchema)
// 插入数据
const save = (data) => {
  let position = new Position(data)
  return position.save()
    .then(() => {
      return true
    }).catch(() => {
      return false
    })
}

// 查找数据
const find = () => {
  return Position.find()
}

// 根据id找
const findById = id => {
  return Position.findById(id)
}

// 更新
const update = data => {
  return Position.findByIdAndUpdate(data.id, data).then(() => {
    return true
  }).catch(() => {
    return false
  })
}

// 删除
const remove = id => {
  return Position.findByIdAndRemove(id).then(() => {
    return true
  }).catch(() => {
    return false
  })
}

// 搜索
const query = keywords => {
  return Position.find({
    positionName: new RegExp(keywords, 'ig')
  })
}



module.exports = {
  save,
  find,
  findById,
  update,
  remove,
  query
}