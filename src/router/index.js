import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Jobs from '../components/Jobs.vue'
import JobDetails from '../components/JobDetails.vue';
import ApplyForm from '../components/ApplyForm.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/jobs', component: Jobs },
    { path: '/job/:id', name: 'JobDetails', component: JobDetails },
    { path: '/apply/:id', name: 'ApplyForm', component: ApplyForm }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router