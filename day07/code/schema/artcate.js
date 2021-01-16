const joi = require('@hapi/joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

exports.add_cate_schema = {
  body: {
    name,
    alias
  }
}

exports.delete_cate_schema = {
  params: {
    id
  }
}

exports.get_cate_schema = {
  params: {
    id
  }
}

exports.update_cate_schema = {
  body: {
    Id: id, // 要求传递过来的是大写 Id，这里是区分大小写的
    name,
    alias
  }
}
