<template>
   <div class="app">
     <DropDown/>
     <Cart/>
   </div>
</template>

<script>
import Cart from './components/Cart.vue'
import DropDown from './components/DropDown.vue'

export default {
  name: 'App',
  components: { DropDown, Cart }
}
</script>

<style lang="scss">
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: serif;
    color: rgb(39, 39, 39);
  }
</style>
