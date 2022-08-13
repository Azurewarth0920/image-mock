# Image Mock

The image mocker for local web developing compatible with client and server side.

## Installation

    npm install image-mock

## Usage

`image-mock` provides mock image in base64 string format and buffer format (Node.js), object url (Browser) for web development, especially useful on mocking image responses on frontend development and visual regression test.

With options, it can generate kinds of mock image with different size, background, text, border radius, etc.

```JavaScript
const imageMock = require('image-mock')

imageMock({
  width: 100
  height: 100
}) // -> data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eA...........
```

The default exported function can work on both browser and Node.js environment, returning mock image in base64 format.  
You can also specifically import client or server mock function.

### Client

```JavaScript
import { client } from 'image-mock'

const imageMock = imageMock({
  width: 100
  height: 100
  imageType: 'webp'
})

imageMock.toBase64() // -> data:image/png;base64,iVBORw0KGgoA
imageMock.toUrl() // -> localhost:xxxx/mock-url
```

### Server

Exampling with express.js.

```JavaScript
const express = require('express')
const { server: imageMock } = require('image-mock')

const app = express()

const imageMock = imageMock({
      width: 100
      height: 100
    })

app.get('/base64', (_, res) => {
  res.send(imageMock.toBase64())
  // It will response with base64 string of mock image.
})

app.get('/image', (_, res) => {
  res.send(imageMock.toBuffer())
  // It will response with mock image.
})
```

## Options

### width

- Type: number
- Default: `100`

The width of the image mock.

### height

- Type: number
- Default: `100`

The height of the image mock.

### backgroundColor

- Type: string
- Default: `"#000000"`

The background color of the image mock.

### text

- Type: string
- Default: `#000000`

The background color of the image mock.

### text

- Type: string
- Default: `''`

The text will be rendered the image mock.

### font

- Type: string
- Default: `'Roboto'`

The font of the text will be rendered the image mock.

### fontSize

- Type: number
- Default: `20`

The font size of the text will be rendered the image mock.

### color

- Type: string
- Default: `'#fff'`

The color of the text will be rendered the image mock.

### imageType

- Type: `'png' | 'jpeg'` on Node.js
- Type: `'png' | 'jpeg' | 'webp'` on client
- Default: `'png'`

The image type of the image mock.
