import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Jobs from '../components/Jobs.vue'
import JobDetails from '../components/JobDetails.vue';
import ApplyForm from '../components/ApplyForm.vue';
import ApplicantSignUp from '../components/ApplicantSignUp.vue';
import ApplicantLogin from '../components/ApplicantLogin.vue';
import RecruiterLogin from '../components/RecruiterLogin.vue';
import RecruiterDashboard from '../components/RecruiterDashboard.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/jobs', component: Jobs },
    { path: '/job/:id', name: 'JobDetails', component: JobDetails },
    { path: '/apply/:id', name: 'ApplyForm', component: ApplyForm },
    { path: '/applicant-signup', name: 'ApplicantSignUp', component: ApplicantSignUp },
    { path: '/applicant-login', name: 'ApplicantLogin', component: ApplicantLogin },
    { path: '/recruiter-login', name: 'RecruiterLogin', component: RecruiterLogin },
    { path: '/recruiter-dashboard', name: 'RecruiterDashboard', component: RecruiterDashboard, meta: { requiresAuth: true, role: 'recruiter' } }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && userStore.role !== to.meta.role) {
    next('/recruiter-login')  // redirect to login if not authenticated
  } else {
    next()
  }
})

export default router