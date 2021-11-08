<template>
  <div class="overlay">
  </div>
  <div class="cart-list">
      <!-- Preventing the click method when using the cart component !-->
      <div @click.prevent.stop class="box">
          <div class="header">
              <h2>Наименования товара</h2>
              <h2>Количество</h2>
              <h2>Цена</h2>
              <div class="delete"></div>
          </div>
          <div class="content">
                <div 
                class="row" 
                v-for="item, index in cartItems" 
                :key="index" 
                >
                    <div class="title">
                        <h3>{{ item.title }}, {{ item.name }}</h3>
                    </div>
                        
                    <div class="amount">
                        <input type="number" name="number" id="number" v-model="item.number" min="0">
                        <div v-if="item.number > item.amount" class="danger"> Количество ограничено </div>
                    </div>

                    <div class="price">
                        <h3 :value="countPrice(item)">{{ price }} руб./шт.</h3>
                    </div>

                    <button @click="deleteCartItem(index)"> Удалить </button>
                </div>
                <div v-if="isActive" class="empty">
                    Ваша корзина пуста
                </div>
          </div>
          
          <div class="footer">
              <div class="range">
                    <h3>Курс:</h3>
                    <input @input="updateCurrency" type="range" min="20" max="80" v-model="currency" class="slider" id="myRange">
                    <h3>{{ currency }}</h3>
              </div>
              <div class="total">
                  Общая стоимость: {{ total }}
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: "CartList",
    data: () => ({
        price: 0,
        isActive: false,
        total: 0
    }),
    methods: {
        ...mapActions(['deleteCartItem', 'updateCurrency']),

        countPrice(item) {
            let { price, number } = item;
            this.price = this.convertPrice(price, number);
        },

        // Counting the price based on amount and currency
        convertPrice(price, number) {
            return Math.round(price * number * this.currency);
        }
    },
    computed: {
        ...mapState(['cartItems', 'currency']),
        // Getting sum of all products price
        sum() {
            if(!this.cartItems.length) {
                this.total = 0;
                return;
            }

            if(this.cartItems.length === 1) {
                let { price, number } = this.cartItems[0];
                this.total =  this.convertPrice(price, number);
                return;
            }

            this.total = this.cartItems
                             .map(({ price , number }) =>  this.convertPrice(price, number))
                             .reduce((prev, next) => prev + next);
        },
        // Showing the empty cart message
        show() {
            if(this.cartItems.length <= 0) {
                this.isActive = true;
            }   
        }
    },
    watch: {
        show(){},
        sum(){}
    }
}
</script>

<style scoped lang="scss">
    @import './mixins.scss';
    @import './varibles.scss';

    .overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: $overlay-color;
    }

    .cart-list {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        max-height: 100%;
        @include flex(center, space-evenly);

        .content {
            @include flex(center, space-evenly, column);
            @include size(100%, 400px);
            overflow-y: scroll;
            overflow-x: hidden;
            padding: 1rem 0rem;

            &::-webkit-scrollbar {
                appearance: none;
                width: 4px;
                background-color: $scrollbar-color;
            }
        }

        .box {
            @include flex(center, space-between, column);
            padding: 2rem;
            background: white;
            width: 70%;
            min-height: 60%;
            border-radius: 1%;
            cursor: default;
        }

        .row {
            @include flex(center, space-between);
            @include size();
            z-index: 20;
            color: rgb(0, 0, 0);
            padding: 0 1rem 1rem 4rem;

            .title, .price, .amount {
                @include flex(center, center);
                @include size(20%, 20%);
            }

            .amount {
                position: relative;
            }

            input {
                @include size(30px, 30px);
                padding-left: 1rem;
            }

            button {
                background: transparent;
                border: none;
                padding-right: 4rem;
                font-size: 1rem;
                color: $button-color;
                cursor: pointer;
            }

            .danger {
                color: $danger-color;
                position: absolute;
                transform: translate(50%, 180%);
            }
        }
        
        .empty {
            @include flex(center, center);
            height: 100%;
            font-size: 2rem;
        }

        .header {
            @include flex(flex-start, space-between);
            @include size();
            padding: 3rem 0 0 3rem;
            color: $cart-header-text-color;

            .delete {
                @include size(20%);
            }
        }

        .footer {
            @include flex(center, space-evenly);
            padding: 2rem 0rem;
            width: 100%;

            .range {
                @include flex(center, center);
            }
        }
    }
</style>