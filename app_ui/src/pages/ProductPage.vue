<template>
    {{ produto.id }}
    {{ produto.name }}
    {{ produto.price }}
</template>

<script>
import { defineComponent } from 'vue';

import { useProductStore } from 'src/stores/product-store';

export default defineComponent({
    name: 'ProductPage',
    props: {
        productId: {
            type: String,
            required: true,
        },
    },
    preFetch({currentRoute}) {
        const productStore = useProductStore();
        return productStore.fetchById(currentRoute.params.productId);
    },
    setup() {
        const productStore = useProductStore();

        return {
            produto: productStore.product
        };
    }
})
</script>