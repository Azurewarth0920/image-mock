import express from 'express'
import { server } from '../lib'
import path from 'path'

const app = express()
const port = 3000

app.use(express.static(path.resolve(__dirname, './public')))
app.get('/dummy', (_, res) => {
  res.send(
    server({
      width: 300,
      height: 300,
      color: '#000',
      imageType: 'jpeg',
      text: 'Dummy ImageImage Image',
      backgroundColor: '#0c83eb',
      font: 'Times',
      fontSize: 32,
      borderRadius: 50,
    }).toBuffer()
  )
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
