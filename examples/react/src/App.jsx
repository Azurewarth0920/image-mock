import { client } from 'image-mock'

function App() {
  const webpString = client({
    text: 'webp',
    imageType: 'webp',
  }).toBase64()
  const pngString = client({
    text: 'png',
    imageType: 'png',
  }).toBase64()
  const jpegString = client({
    text: 'jpeg',
    imageType: 'jpeg',
  }).toBase64()

  return (
    <div>
      <div>
        <h2>Webp</h2>
        <img src={webpString} />
      </div>
      <div>
        <h2>png</h2>
        <img src={pngString} />
      </div>
      <div>
        <h2>jpeg</h2>
        <img src={jpegString} />
      </div>
    </div>
  )
}

export default App
