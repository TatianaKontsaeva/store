<template>
    <h2 class="flex justify-center q-pa-md">Корзина</h2>
  <q-page class="flex justify-center">
    <div v-if="!CART.length" class="text-h4 q-pa-md">В корзине пока ничего нет... </div>
    <div v-else>
      <div class="flex justify-between cart_btns">
        <q-btn class="q-ma-xs btn-back" to="/catalog" label="Назад в каталог"/>
        <q-btn class="q-ma-xs btn-pay" @click="dialog = true" label="Купить"/>
      </div>
      <CartItem 
        v-for="(item, index) in CART"
        :key="item.article" 
        :cart_item_data="item" 
        @deleteFromCart="deleteFromCart(index)"
        @increment="increment(index)"
        @decrement="decrement(index)"
        />
        <div class="cart__total">
            <p class="cart__total__quantity" v-if="CART.length>0">Количество в корзине: {{ CART.reduce((sum, item) => sum + item.quantity, 0) }}</p>
            <p class="cart__total__name" v-if="TOTAL>0">Общая сумма: {{TOTAL}} &#8381;</p>
        </div>
    </div>
  </q-page>

  <q-dialog v-model="dialog">
      <div class="q-pa-md form-pay">
      <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        standard
        v-model="userName"
        label="Ваше имя и фамилия*"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите имя']"
      />
      <q-select v-model="model" :options="options" label="Выберите способ получения" />

      <q-input
        standard
        v-model="cc"
        label="Введите номер карты *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Пожалуйста, введите номер карты',
        ]"
      />
      <q-input
        standard
        v-model="exp_date"
        label="Введите срок действия карты *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Пожалуйста, введите срок действия',
        ]"
      />
        <q-input
        standard
        v-model="cvc"
        label="Введите cvc код *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Пожалуйста, введите cvc код',
        ]"
      />
      <q-toggle v-model="accept" label="Я принимаю условия" />

      <div>
        <q-btn label="Оплатить" type="submit" class="btn_for_pay"/>
        <q-btn label="Reset" type="reset" color="dark" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import CartItem from "../components/CartItem.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default defineComponent({
    name: 'v-cart',
    components: {
        CartItem
    },
    props: {
        cart_data: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data () {
        return {};
    },
    computed: {
        ...mapGetters(['CART', "TOTAL"]), 
    },
    methods: {
        ...mapActions ([
            'DELETE_FROM_CART',
            'INCREMENT_CART_ITEM',
            'DECREMENT_CART_ITEM'
        ]),
        ...mapMutations (["SET_TOTAL"]),
        increment(index) {
            this.SET_TOTAL(this.TOTAL + this.CART[index].price);
            this.INCREMENT_CART_ITEM(index)
        },
        decrement(index) {
            this.SET_TOTAL(this.TOTAL - this.CART[index].price);
            this.DECREMENT_CART_ITEM(index)
        },
        deleteFromCart(index) {
            this.DELETE_FROM_CART(index);
            console.log(index);
        },
    },
    setup() {
    const userName = ref(null)
    const cc = ref(null)
    const exp_date = ref(null)
    const accept = ref(false)
    const cvc = ref(null)

    return {
      dialog: ref(false),
      userName,
      cc,
      exp_date,
      cvc,
      accept,
      model: ref(null),
      options: [
        'Курьером', 'В пункте выдачи', 'Самовывоз из магазина', 
      ],
      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },
      onReset () {
        userName.value = null
        age.value = null
        accept.value = false
      }
    }
  }
})
</script>

<style>
 .btn-pay {
    border: 1px solid #091b79;
    color: #091b79;
  }
  .btn-pay:hover {
    background: #091b79;
    color: white;
  }
  .btn-back {
    border: 1px solid #711297;
    color: #711297;
  }
  .btn-back:hover {
    background:  #711297;
    color: white;
  }
.cart__total {
    display: flex;
    justify-content: space-evenly;
    margin: 0 auto;
    box-shadow: 0 0 8px 0 grey;
    background: #794ae9;
    color: white;
    margin-bottom: 20px;
   }
   .cart__total__quantity,
   .cart__total__name {
    font-size: 18px;
    margin: 5px;
   }
   .form-pay {
    background: #7786d0;
    color: white;
  }
  .form-pay {
    background: #8695df;
    width: 600px;
  }
  .btn_for_pay {
    background: #091b79;
    color: white;
  }
</style>