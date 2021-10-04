import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Models from '../views/Models.vue'
import Process from '../views/Process.vue'
import Ingredients from '../views/Ingredients.vue'
import Steps from '../views/Steps.vue'

Vue.use(VueRouter)
// Set up different views with routes
const routes = [
    {
        path: '/',
        name: "Home",
        component: Home

    },
    {
        path: '/models',
        name: 'Models',
        component: Models
    },
    {
        path: '/process',
        name: 'Process',
        component: Process
    },
    {
        path: '/ingredients',
        name: 'Ingredients',
        component: Ingredients
    },
    {
        path: '/steps',
        name: 'Steps',
        component: Steps
    }
]


const router = new VueRouter({
    mode: "history",
    routes
})

export default router