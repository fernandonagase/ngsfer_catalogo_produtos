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

function selectImage(image) {
  selectedImage.value = image
}
</script>

<template>
  <div>
    <div class="full-height row q-col-gutter-md">
      <div
        v-if="images.length > 1"
        class="col-xs-12 col-md-auto q-gutter-sm full-height no-wrap scroll"
        :class="{ column: $q.screen.gt.sm, row: $q.screen.lt.md, 'order-last': $q.screen.lt.md }"
      >
        <q-img
          v-for="image in images"
          :key="image.url"
          :src="image.url"
          :ratio="1"
          width="70px"
          spinner-color="primary"
          spinner-size="82px"
          fit="scale-down"
          class="product-image__frame cursor-pointer col-auto"
          :class="{
            'product-image__frame--selected': image.url === selectedImage.url,
          }"
          @click="selectImage(image)"
        />
      </div>
      <div class="col product-image__main">
        <q-img
          :src="selectedImage.url"
          :alt="selectedImage.altText"
          height="100%"
          spinner-color="primary"
          spinner-size="82px"
          fit="scale-down"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-image__main {
  height: 300px;

  @media (min-width: $breakpoint-md-min) {
    height: 100%;
  }
}

.product-image__frame {
  border: 1px solid $grey-3;
}

.product-image__frame--selected {
  border: 1px solid $primary;
}
</style>
