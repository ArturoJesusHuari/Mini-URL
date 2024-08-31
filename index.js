const express = require('express')

const app = express()
const port = 3000 | process.env.port

app.use(express.json())

const linksRouter = require('./routes/linksroutes')

app.use("/", linksRouter)

app.listen(port, async () => {
  console.log(`App listening on http://localhost:${port}`)
})