<template>
  <transition name="fade">
    <div 
      v-if:="isActive" 
      class="list"
      :class="{mark: product.selected}"
      @click="addCartItem(product)"
    >
        <h3>{{ product.name }} ({{ product.amount }})</h3>
        <h3>{{ product.price }}</h3>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "DropDownList",
  data: () => ({
    isActive: false
  }),
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
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
    z-index: 1;
    height: 150px;
    background-color: $drop-list-color;
    cursor: pointer;
  }

  .mark {
      background-color: $drop-mark-color;
  }

  h3 {
    padding: 0 2rem;
  }

  .fade-enter-active, .fade-leave-active {
    opacity: 1;
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>