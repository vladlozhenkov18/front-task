<template>
    <transition name="fade">
      <div 
        class="drop-list"
        v-if:="isActive"
      >
        <div 
            class="elements"
            v-for:="product, index in products"
            :v-key='index'
        >
            <DropDownItem :product="product"/>
        </div>  
      </div>
    </transition>  
</template>

<script>
import DropDownItem from './DropDownItem.vue'

export default {
    name: "DropDownList",
    components: { DropDownItem },
    data: () => ({
        isActive: false
    }),
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    methods: {
        toggle() {
        this.isActive = !this.isActive;
        }
    }
}
</script>

<style scoped lang="scss">
  @import './mixins.scss';

  .elements {
        @include flex(center, space-evenly, column);
        @include size(100%, 100%);
  }
  
  .fade-enter-active, .fade-leave-active {
    opacity: 1;
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>