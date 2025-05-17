import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import News from '../components/News.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/news', component: News }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router