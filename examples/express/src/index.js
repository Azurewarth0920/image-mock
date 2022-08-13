const express = require('express')
const path = require('path')
const { server: mockImage } = require('image-mock')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../public')))
app.get('/dummy-image', (req, res) => {
  res.send(
    mockImage({
      width: 200,
      height: 200,
      text: 'Buffer',
      imageType: 'png',
    }).toBuffer() // response with file buffer.(png type)
  )
})

app.get('/dummy-image/base64', (req, res) => {
  res.send(
    mockImage({
      width: 200,
      height: 200,
      text: 'Base64',
    }).toBase64() // response with base64 string.
  )
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
