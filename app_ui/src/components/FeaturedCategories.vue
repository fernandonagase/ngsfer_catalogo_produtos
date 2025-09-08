<template>
  <div>
    <ul class="featured-categories-list scroll flex no-wrap q-gutter-md">
      <li v-for="category in categories" :key="category.slug">
        <router-link
          :to="{ name: 'produto-categoria', params: { categorySlug: category.slug } }"
          class="featured-categories-list__link column items-center"
        >
          <q-img
            :src="category.imagemUrl"
            :ratio="1"
            spinner-color="primary"
            spinner-size="82px"
            class="featured-categories-list__img"
            no-spinner
          />
          {{ category.nome }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.featured-categories-list {
  list-style: none;
  padding: 0;

  &__link {
    text-decoration: none;
    color: #000;
  }

  &__img {
    border-radius: 50%;
    width: 80px;

    @media screen and (min-width: $breakpoint-md) {
      width: 80px;
    }
  }
}
</style>
