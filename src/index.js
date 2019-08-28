const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})

const User = require('./models/user')

const main = async () => {
  const user  = await User.findById('5d662ae42f7c3c364840d09c')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)
}

main()
