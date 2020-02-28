import Vue from 'vue'
import VueRouter from 'vue-router'
import CurrencyQuotes from '../components/CurrencyQuotes.vue'
import About from '../components/About.vue'
import NotFound from '../components/404.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'main',
        component: CurrencyQuotes
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '*',
        component: NotFound
    }
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;