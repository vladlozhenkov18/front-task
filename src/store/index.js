import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
    cartItems: [],
    currency: 20,
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    ADD_CART_ITEM(state, cartItem) {
      state.cartItems.push(cartItem);
    },
    INCREMENT_CART_ITEM_NUMBER(state, index) {
      state.cartItems[index].number++;
    },
    DELETE_CART_ITEM(state, index) {
      state.cartItems.splice(index, 1);
    },
    UPDATE_CURRENCY(state, currency) {
      if(currency >= 20 && currency <= 80) {
        state.currency = currency;
      }
    }
  },
  
  actions: {
    // Getting product info from json files
    async getProducts({ commit }) {
      try {
        const data_1 = await axios.get('data.json');
        const data_2 = await axios.get('names.json');
        const goods =  data_1.data.Value.Goods;
        const names = data_2.data;

        // Mapping values and putting the into array
        const result = goods.map(({C, G, P, T}) => {
            const element = names[G];
            return {
              id: T, 
              title: element.G,
              name: element.B[T].N,
              amount: P,
              price: C,
              number: 1,
              selected: false
            }; 
        });
        commit('SET_PRODUCTS', result)
      } catch(error) {
        console.log(error.message);
      }
    },
    // Adding the new item to cart and also setting the selected field and adding the number of purcheses
    addCartItem({ commit, state }, cartItem) {
      state.products.find(({ id }) => id === cartItem.id).selected = true;

      if(state.cartItems.length <= 0) {
        commit('ADD_CART_ITEM', cartItem);
        return;
      }

      const index = state.cartItems.findIndex(({ id }) => id === cartItem.id);

      if(index >= 0) {
        commit('INCREMENT_CART_ITEM_NUMBER', index);
        return;
      }

      commit('ADD_CART_ITEM', cartItem);
    },
    // Deleting the cart item and reseting the selected and number property to default ones
    deleteCartItem({ commit, state }, index) {
      const product = state.products.find(({ id }) => id === state.cartItems[index].id);
      product.number = 1;
      product.selected = false;
      commit('DELETE_CART_ITEM', index);
    },
    // Action for updating the current currenct for price
    updateCurrency({ commit }, event) {
      commit('UPDATE_CURRENCY', event.target.value);
    }
  }
})
