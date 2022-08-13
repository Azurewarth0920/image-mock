<script setup>
import { ref } from 'vue'
import { client } from 'image-mock'

const webpString = client({
  text: 'webp',
  imageType: 'webp',
}).toBase64()
const pngString = client({
  text: 'png',
  imageType: 'png',
}).toBase64()
const jpegString = ref('')

client({
  text: 'jpeg',
  imageType: 'jpeg',
}).toUrl()
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
      <img v-if="jpegString" :src="jpegString" />
    </div>
  </div>
</template>
