const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))

const userRouter = require('./router/user')
app.use('/api', userRouter)

app.listen(3007, () => console.log('api server running at http://127.0.0.1:3007'))
