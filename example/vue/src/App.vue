<script setup>
// import { client } from './lib.js'

const webpString = client({
  text: 'webp',
  imageType: 'webp',
})
const pngString = client({
  text: 'png',
  imageType: 'png',
})
const jpegString = client({
  text: 'jpeg',
  imageType: 'jpeg',
})
</script>

<template>
  <div>
    <div>
      <h2>Webp</h2>
      <img :src="webpString" />
    </div>
    <div>
      <h2>png</h2>
      <img :src="pngString" />
    </div>
    <div>
      <h2>jpeg</h2>
      <img :src="jpegString" />
    </div>
  </div>
</template>
