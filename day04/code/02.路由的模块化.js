const express = require('express')
const app = express()

app.use(require('./03.router'))

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
