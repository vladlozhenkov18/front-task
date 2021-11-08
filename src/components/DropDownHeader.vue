<template>
  <div @click="toggle" class="header">
      <div class="right">
        <Arrow :isActive="isActive"/>
      </div>
      <h2>{{ title }}</h2>
  </div>
</template>

<script>
import Arrow from '../UI/Arrow.vue'

export default {
    name: 'DrodDownHeader',
    components: { Arrow },
    data: () => ({
        isActive: false
    }),
    props: {
        title: {
            type: String,
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
    @import './varibles.scss';
    
    .header {
        @include flex(center, space-between);
        width: 100%;
        background-color: $drop-header-color;
        cursor: pointer;
        z-index: 10;
    }

    .right {
        @include flex(center, space-evenly);
        padding-left: 2rem;
    }

    h2 {
        padding-right: 2rem;
    }
</style>