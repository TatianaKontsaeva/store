<template>
     <q-page class="flex justify-center q-pa-md">
        <div class="flex items-center justify-between cart-item">
            <img 
            class="cart-item__img" 
            :src="require('../assets/img/' + cart_item_data.img)" 
            alt="picture">
        
            <div>
                <p>{{ cart_item_data.name }}</p>
                <p>{{ cart_item_data.price }} &#8381;</p>
                <p>{{ cart_item_data.description }}</p>
            </div>
            <div class="v-cart-item__quantity">
            <p>Количество:</p>
                <span>
                    <span class="quantity__btn" @click="decrementItem">&#8722;</span>
                    {{cart_item_data.quantity }}
                    <span  class="quantity__btn" @click="incrementItem">&#43;</span>
                </span>
            </div>
            <button class="btn deleteBtn" @click="deleteFromCart">Удалить</button>
        </div>
    </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent ({
    name: "CartItem",
    props: {
        cart_item_data: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {};
    },
    computed: {},
    methods: {
        decrementItem() {
            this.$emit('decrement')
        },
        incrementItem () {
            this.$emit('increment')
        },
        deleteFromCart() {
            this.$emit("deleteFromCart")
        }
    },
    watch: {},
    mounted () {}
})
</script>

<style lang="scss">
    .cart-item {
        max-width: 600px;
        border: 1px solid rgb(50, 8, 87);
        padding: 20px;
        margin: 20px;
    }
    .cart-item__img {
        width: 300px;
        height: 200px;
    }
    .quantity__btn {
        cursor: pointer; 
        padding-top: 8px;
        background: linear-gradient(90deg, rgb(2, 0, 36) 0%, rgb(9, 9, 121) 35%, rgb(139, 0, 255) 100%);
        border: 1px solid #b39ddb;
        border-radius: 50%;
        padding-left: 15px;
        padding-right: 15px;
        padding-bottom: 8px;
        margin: 10px;
        color: white;
    }
    .deleteBtn {
        width: 150px;
        height: 35px;
        color:#b39ddb;
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(139,0,255,1) 100%);
        border-radius: 20px;
        border:1px solid #b39ddb;
    }
    .deleteBtn:hover {
        background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(139,0,255,1) 100%);
        color: white;
    }
</style>