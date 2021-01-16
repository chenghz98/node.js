const db = require('../db')

// 获取文章分类
exports.getArticleCates = (req, res) => {
  const sql = `select * from ev_article_cate where is_delete=0 order by id asc`
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取文章分类列表成功',
      data: results
    })
  })
}

// 新增文章分类
exports.addArticleCates = (req, res) => {
  const sql = `select * from ev_article_cate where name=? or alias=?`
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)

    // name 被一条数据占用了，alias 被另一条数据占用了
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')

    // name 和 alias 被一条数据完全占用了
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')

    // 分类名称被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')

    // 分类别名被占用
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

    const sql = `insert into ev_article_cate set ?`
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
      res.cc('新增文章分类成功！', 0)
    })
  })
}

// 根据文章 Id 删除分类
exports.deleteCateById = (req, res) => {
  // 这里的 Id 不区分大小写的
  const sql = `update ev_article_cate set is_delete=1 where Id=?`
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    res.cc('删除文章分类成功！', 0)
  })
}

// 根据 Id 获取文章分类数据
exports.getArtCateById = (req, res) => {
  const sql = `select * from ev_article_cate where id=?`
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取文章分类数据失败！')
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results[0]
    })
  })
}

// 根据 Id 更新文章分类数据
exports.updateCateById = (req, res) => {
  // 先检查提交过来的分类名称或别名在其他 Id 下是否有，查重！
  const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`

  db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)

    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

    // 更新
    const sql = `update ev_article_cate set ? where Id=?`
    db.query(sql, [req.body, req.body.Id], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
      res.cc('更新文章分类成功！', 0)
    })
  })
}
