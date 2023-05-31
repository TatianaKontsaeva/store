<template>
  <q-card class="card-item">
   <img
      class="card-item-img"
      :src="require('../assets/img/' +  product.img)"
      alt="img"
    />
    <q-card-section>
      <div class="text-h6">{{ product.name }}</div>
      <div class="text-h8">{{ product.description }}</div>
      <div class="text-subtitle2">
        Цена: <strong>{{  product.price }}</strong> Руб.
      </div>
    </q-card-section>
    <q-card-section >
      {{ product.type }}
    </q-card-section>
    <div class="text-center">
      <q-btn
      class="addBtn"
      @click="addToCart"
      label="В корзину"
        />
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CatalogItem',
  props: {
    product: {
      type: Object,
      default() {},
    },
  },
  data () {
        return {};
    },
  methods: {
    addToCart () {
            this.$emit('addToCart',this.product)
        }
  }
})
</script>

<style lang="scss">
  .card-item {
    max-width: 250px;
    box-shadow: 0 0 8px 0 #e0e0e0;
    margin-bottom: 25px;
    border: 1px solid #3c0979;
  }
  .card-item-img {
    width: 400px;
    height: 200px;
  }
  .addBtn {
    width: 150px;
  height: 30px;
  border: 1px solid #3c0979;
  border-radius: 5px;
  margin-bottom: 20px;
  color: white;
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(60,9,121,1) 47%, rgba(57,0,255,1) 100%);
  }
  .addBtn:hover {
    background: linear-gradient(270deg, rgba(2,0,36,1) 0%, rgba(60,9,121,1) 47%, rgba(57,0,255,1) 100%);
  }
 
</style>
