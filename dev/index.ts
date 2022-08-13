import express from 'express'
import { server } from '../src'
import path from 'path'

const app = express()
const port = 3000

app.use(express.static(path.resolve(__dirname, './public')))
app.get('/dummy-image', (_, res) => {
  res.send(
    server({
      width: 300,
      height: 300,
    }).toBuffer()
  )
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
