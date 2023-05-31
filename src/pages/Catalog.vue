<template>
    <q-page class="flex">
      <div class="q-pa-lg">
        <div class="flex column">
          <div class="flex justify-between items-center">
        <div><h2>Каталог</h2></div>
        <div>   
          <q-item to="/cart" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="shopping_basket" />
            </q-item-section>
            <q-item-section>
              {{ CART.length }}
            </q-item-section>
          </q-item>
       </div>
      </div>
      
            <div class="flex wrap q-pa-md catalog-item">
                <catalog-item
                v-for="product in PRODUCTS"
                :key="product.id"
                :product="product"
                @addToCart="addToCart"
        
        />
        
            </div>
        </div>
      <!-- <div v-if="!products.length" class="flex column justify-center">
        <div>
        <q-spinner-ball
          color="primary"
          size="10em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerBall</q-tooltip>
      </div>
    <h3 >Cкоро здесь появятся товары...</h3>
    </div> -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import CatalogItem from '../components/CatalogItem.vue'
import { mapActions, mapGetters, mapMutations } from "vuex";



export default defineComponent({
  name: 'Catalog',

  components: {
    CatalogItem
  },
  data() {
    return {
    }
  },
  computed: {
        ...mapGetters(['PRODUCTS', 'CART', "TOTAL"])
    },
    methods: {
        ...mapActions (['GET_PRODUCTS_FROM_API', 'ADD_TO_CART']),
        addToCart(data) {
            this.ADD_TO_CART(data);
        },
        ...mapMutations(["SET_TOTAL"]),
        addToCart(data) {
            data.quantity += 1;
            this.ADD_TO_CART(data);
            this.SET_TOTAL(this.TOTAL + data.price);
    },
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API().then((response) => {
            if(response.data) {
            console.log("ok");
            }
        })
    }

})
</script>

<style lang="scss">
    .catalog-item {
        column-gap: 10px;
    }
</style>