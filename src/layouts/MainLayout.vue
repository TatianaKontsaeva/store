<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-gradient flex justify-between q-pt-md q-mb-md">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-md q-mb-md">
            <div class="text-h3">Apple Store</div>
          </div>
      <div>
        <q-toolbar class="header__bottom q-px-lg q-pt-md q-mb-md">
          <div class="bottom-header__container">
            <div class="bottom-header__column">
                <q-item id="auth-links">
                    <q-btn 
                    class="actions-header_login" 
                    icon="login"
                    label="Войти" 
                    type="button"
                    @click="login" />
                </q-item>
              <div class="q-ml-md">
                <div id="user-button"></div>
              </div>
            </div>
        </div>
      </q-toolbar>
    </div>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    <q-list padding>
        <q-item to="/" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            Главная страница
          </q-item-section>
        </q-item>
       
        <q-item to="/catalog" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="list_alt" />
          </q-item-section>
          <q-item-section>
          <q-btn-dropdown label="Каталог" outline >
              <!-- <div class="row no-wrap q-pa-md">
                <q-form @submit="onSubmit">
                  <div class="column">
                    <q-checkbox name="category" v-model="phone" label="телефоны" true-value="phone"/>
                    <q-checkbox name="category" v-model="tablet" label="планшеты" true-value="tablet"/>
                    <q-checkbox name="category" v-model="laptop" label="ноутбуки" true-value="laptop"/>
                    <q-checkbox name="category" v-model="pc" label="компьютеры" true-value="pc"/>
                    <q-checkbox name="category" v-model="smartwatch" label="smart-часы" true-value="smartwatch"/>
                    <q-btn label="Показать" type="submit" outline class="get-btn q-px-lg"/>
                    <q-btn label="Показать все" @click="getAllItems" class="getAll-btn"/>
                  </div>
                </q-form>
                
              </div> -->
      </q-btn-dropdown>
          </q-item-section>
        </q-item>
        <q-item to="/help" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="contact_support" />
          </q-item-section>
          <q-item-section>
            Если нужна помощь
          </q-item-section>
        </q-item>
        <q-item to="/about" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="info_outline" />
          </q-item-section>
          <q-item-section>
            О нас
          </q-item-section>
        </q-item>
  
        <q-item to="/cart" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="shopping_basket" />
          </q-item-section>
          <q-item-section>
            Корзина 
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { login, logout } from '../clerk/user'


//import Clerk from "@clerk/clerk-js";
const publishableKey =
  "pk_test_bXV0dWFsLWd1bGwtNTIuY2xlcmsuYWNjb3VudHMuZGV2JA";
  const script = document.createElement("script");
script.setAttribute("data-clerk-publishable-key", publishableKey);
script.async = true;
script.src = `https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
script.crossOrigin = "anonymous";
script.addEventListener("load", async function () {
  await window.Clerk.load();

  const userButton = document.getElementById("user-button");
  const authLinks = document.getElementById("auth-links");

 Clerk.addListener(({ user }) => {
    authLinks.style.display = user ? "none" : "flex";
  });

  if (window.Clerk.user) {
    window.Clerk.mountUserButton(userButton);
    userButton.style.margin = "auto";

    localStorage.setItem("session_id", window.Clerk.session.id);
  }
});
document.body.appendChild(script);



export default defineComponent({
  name: 'MainLayout',
  components: {

  },

  setup () {
    const leftDrawerOpen = ref(false);
   

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      login,
      logout,
     
    }
  }
})
</script>

<style lang="scss">
.bg-gradient {
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,27,121,1) 50%, rgba(57,0,255,1) 100%);
}
  .q-item.q-router-link--active, .q-item--active {
    color: #3900ff
  }
  .auth-links {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  .actions-header_login {
    background: #091b79;
    border: 1px solid #091b79;
    border-radius: 5px;
    height: 30px;
    width: 150px;
    color: white;
  }
   .bottom-header__text {
    font-size: 18px;
    color:white;
  }
  .actions-header_login:hover {
    background: white;
    border: 1px solid #091b79;
    cursor: pointer;
    transition-duration: 100ms;
    color: #091b79;
  }
  // .getAll-btn {
  //   margin-top: 10px;
  //   background: #091b79;
  //   border: 1px solid #091b79;
  //   border-radius: 5px;
  //   color:white;
  // }
  // .get-btn {
  //   border-radius: 5px;
  // }
</style>
