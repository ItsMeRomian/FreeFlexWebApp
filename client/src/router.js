import Vue from "vue";
import Router from 'vue-router'
import HomeView from "../views/Home/HomeView";
import ItemView from "../views/Item/ItemView";
import ItemAdd from "../views/Item/ItemAdd";
import NotFound from "../views/NotFound";

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/item/:type/:id',
            name: 'ItemView',
            component: ItemView
        },
        {
            path: '/add/:type',
            name:  'ItemAdd',
            component: ItemAdd
        },
        {
            path: '/notFound',
            name: 'notFound',
            component: NotFound
         },
        // {
        //     path: '/testPage',
        //     name: 'testPage',
        //     component: TestPage
        // },
        {
            path: '*',
            redirect: { name: 'notFound' }
        }
    ]
})
Vue.use(Router);