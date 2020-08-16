const positionModule = require('../models/position')
const moment = require('moment')
const { json } = require('express')

const add = async (req,res,next) => {
  res.setHeader("content-type","application/json;charset=UTF-8")
  req.body.createTime = moment().format('YYYY-MM-DD HH:mm')
  const result = await positionModule.save(req.body)
  if(result) {
    res.render('position.success.ejs', {
      data: JSON.stringify({
        message: 'success'
      })
    })
  } else {
    res.render('position.fail.ejs', {
      data: JSON.stringify({
        message: 'fail'
      })
    })
  }
}

// 查找列表
const find = async(req, res, next) => {
  let result = await positionModule.find()
  res.render('position.success.ejs', {
    data: JSON.stringify(result)
  })
}

//根据id查找result
const findById = async(req, res, next) => {
  let result = await positionModule.findById(req.params.id)
  res.render('position.success.ejs', {
    data: JSON.stringify(result)
  })
}

// 更新
const update = async(req, res, next) => {
  req.body.createTime = moment().format('YYYY-MM-DD HH:mm')
  console.log(req.body)
  let result = await positionModule.update(req.body)
  if(result) {
    res.render('position.success.ejs', {
      data: JSON.stringify({
        message: 'success'
      })
    })
  } else {
    res.render('position.fail.ejs', {
      data: JSON.stringify({
        message: 'fail'
      })
    })
  }
}

// 删除
const remove = async(req, res, next) => {
  res.setHeader("content-type","application/json;charset=UTF-8")
  let result = await positionModule.remove(req.body.id)
  if(result) {
    res.render('position.success.ejs', {
      data: JSON.stringify({
        message: 'success'
      })
    })
  } else {
    res.render('position.fail.ejs', {
      data: JSON.stringify({
        message: 'fail'
      })
    })
  }
}

// 搜索
const query = async(req, res, next) => {
  res.setHeader("content-type","application/json;charset=UTF-8")
  let result = await positionModule.query(req.body.keywords)
  if(result) {
    res.render('position.success.ejs', {
      data: JSON.stringify(result)
    })
  } else {
    res.render('position.fail.ejs', {
      data: JSON.stringify({
        message: 'fail'
      })
    })
  }
}

module.exports = {
  add,
  find,
  findById,
  update,
  remove,
  query
}