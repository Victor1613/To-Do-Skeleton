import {createRouter, createWebHistory} from "vue-router";


const router = createRouter({
    history: createWebHistory(''), //для отображение истории между страницами
    routes:[
        {
            path: '/',
            name: 'home',
            component: () => import('../views/TaskPage.vue')
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import("../views/AuthPage.vue")
        },
        {
            path:'/reg',
            name:'reg',
            component:() => import("../views/RegPage.vue")
        },
        {
            path:'/board',
            name:'board',
            component:() => import("../views/BoardPage.vue")
        }

    ]

})

export default router