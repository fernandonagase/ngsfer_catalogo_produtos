<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
})

const selectedImage = ref(
  (props.images.find((image) => image.position === 1) || props.images[0]) ?? {
    url: 'https://placedog.net/1024/768',
    altText: '',
  },
)
</script>

<template>
  <div>
    <q-img
      :src="selectedImage.url"
      :alt="selectedImage.altText"
      :ratio="16 / 9"
      spinner-color="primary"
      spinner-size="82px"
    />
  </div>
</template>
