<template>
  <div class="grid">
    <div
        class="box"
        v-for:="group, index in groups"
        :key="index"
    >
      <DropDownHeader
        @click="toggle(index)"
        :title="group.title"
      />
      <DropDownList   
        :products="group.products"
        :ref="setItemRef"
      />
    </div>
  </div>
</template>

<script>
import DropDownHeader from './DropDownHeader.vue'
import DropDownList from './DropDownList.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: { DropDownHeader, DropDownList },
  data: () => ({
    itemRefs: []
  }),
  computed: {
    ...mapState(['groups'])
  },
  methods: {
    ...mapActions(['getProducts']),
    
    // Adding the component reference to array for latter calling the neaded one
    setItemRef(item) {
      this.itemRefs.push(item);
    },
    // Calling the chosen child method
    toggle(index) {
      this.itemRefs[index].toggle();
    }
  },
  mounted() {
    this.getProducts();
  }
}
</script>

<style scoped lang="scss">
  .grid {
    display: grid;
    grid-template-columns: 600px 600px;
    padding: 2rem;
    justify-content: center;
  }

  .box {
    padding: 1rem;
  }
</style>
