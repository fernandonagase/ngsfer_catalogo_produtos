<template>
  <div>
    <ul class="featured-categories-list row q-col-gutter-sm">
      <li
        v-for="category in categories"
        :key="category.slug"
        class="col-xs-6 col-sm-4 col-md-2 col-lg-1 flex flex-center"
      >
        <router-link
          :to="{ name: 'produto-categoria', params: { categorySlug: category.slug } }"
          class="featured-categories-list__link column items-center"
        >
          <q-img
            :src="category.imagemUrl"
            width="80px"
            height="80px"
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
  margin: 0;

  &__link {
    text-decoration: none;
    color: #000;
  }

  &__img {
    border-radius: 50%;
  }
}
</style>
