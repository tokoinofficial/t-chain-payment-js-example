import Vue from 'vue';
import VueRouter from 'vue-router';

import Simple from "@views/Simple.vue";
import Product from "@views/Product.vue";
import HomePage from "@views/HomePage.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage
    },
    {
        path: "/simple",
        name: "SimplePayment",
        component: Simple
    },
    {
        path: "/cart-checkout-example",
        name: "ProductCheckout",
        component: Product
    }
];
  
const router = new VueRouter({
    mode: "history",
    routes
});

export default router;