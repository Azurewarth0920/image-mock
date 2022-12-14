# Image Mock

The image mocker for mocking image response for web development, compatible with client and server side.

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

// As canvas.toBlob is an asynchronous function, a promise with url will be returned.
await imageMock.toUrl() // -> blob:localhost:xxxx/mock-url
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

## Quick start

You can refer the examples for having a quick setup for project

- ### [Express](https://github.com/Azurewarth0920/image-mock/tree/main/examples/express)
- ### [React](https://github.com/Azurewarth0920/image-mock/tree/main/examples/react)
- ### [Vue](https://github.com/Azurewarth0920/image-mock/tree/main/examples/vue)

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
- Default: `''`

The text that will be rendered on the image mock.

### font

- Type: string
- Default: `'Roboto'`

The font of the text that will be rendered on the image mock.

### fontSize

- Type: number
- Default: `20`

The font size of the text that will be rendered on the image mock.

### color

- Type: string
- Default: `'#fff'`

The color of the text that will be rendered on the image mock.

### imageType

- Type: `'png' | 'jpeg'` on server
- Type: `'png' | 'jpeg' | 'webp'` on client
- Default: `'png'`

The image type of the image mock.
