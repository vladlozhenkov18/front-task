<template>
  <div class="cart" @click="show">
      <i class="fas fa-shopping-cart"></i>
      <div 
        class="total"
        :class="{ active: total > 0 }"
      >
          {{ total }}
      </div>
      <CardList v-if="isActive"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardList from './CartList.vue'

export default {
    name: "Cart",
    components: { CardList },
    data: () => ({
        total: 0,
        isActive: false
    }),
    methods: {
        show() {
            this.isActive = !this.isActive;
        }
    },
    computed: {
        ...mapState(['cartItems']),
        count() {
            if(!this.cartItems) {
                return;
            }

            const sum = (items, prop) => items.reduce((a, b) => a + b[prop], 0);

            this.total = sum(this.cartItems, 'number');
        }
    },
    watch: {
        count(){}
    }
}
</script>

<style scoped lang="scss">
    @import './mixins.scss';
    @import './varibles.scss';

    .cart {
        @include flex(center, center);
        position: fixed;
        top: 10%;
        right: 5%;
        @include size(40px, 40px);
        cursor: pointer;
        background-color: $cart-color;
        border-radius: 100%;
        transition: 0.5s;

        i {
            color: white;
            transition: 0.5s;
            padding: 0.5rem;
            position: relative;
        }

        .total {
            @include flex(center, center);
            position: absolute;
            bottom: -10%;
            left: -10%;
            background-color: $total-color;
            @include size(20px, 20px);
            border-radius: 100%;
            color:white;   
        }
        
        .active {
                background-color: $active-color;
        }
    }
    .cart:hover {
        background-color: $cart-hover-color;
    }
</style>