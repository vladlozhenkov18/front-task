<template>
    <div  
      class="list"
      :class="{mark: product.selected}"
      @click="addCartItem(product)"
    >
        <h3>{{ product.name }} ({{ product.amount }})</h3>
        <h3>{{ product.price }}</h3>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "DropDowItem",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(['addCartItem'])
  },
  computed: {
    ...mapState(['cartItems'])
  }
}
</script>

<style scoped lang="scss">
  @import './mixins.scss';
  @import './varibles.scss';
  
  .list {
    @include flex(center, space-between);
    @include size(100%, 100%);
    background-color: $drop-list-color;
    cursor: pointer;
  }

  .mark {
      background-color: $drop-mark-color;
  }

  h3 {
    padding: 0 2rem;
  }
</style>