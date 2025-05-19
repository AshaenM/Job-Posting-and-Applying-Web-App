import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Jobs from '../components/Jobs.vue'
import JobDetails from '../components/JobDetails.vue';
import ApplyForm from '../components/ApplyForm.vue';
import ApplicantSignUp from '../components/ApplicantSignUp.vue';
import ApplicantLogin from '../components/ApplicantLogin.vue';
import RecruiterLogin from '../components/RecruiterLogin.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/jobs', component: Jobs },
    { path: '/job/:id', name: 'JobDetails', component: JobDetails },
    { path: '/apply/:id', name: 'ApplyForm', component: ApplyForm },
    { path: '/applicant-signup', name: 'ApplicantSignUp', component: ApplicantSignUp },
    { path: '/applicant-login', name: 'ApplicantLogin', component: ApplicantLogin },
    { path: '/recruiter-login', name: 'RecruiterLogin', component: RecruiterLogin }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router