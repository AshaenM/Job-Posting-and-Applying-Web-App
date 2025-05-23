import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import News from '../components/News.vue'
import Jobs from '../components/Jobs.vue'
import JobDetails from '../components/JobDetails.vue';
import ApplyForm from '../components/ApplyForm.vue';
import ApplicantSignUp from '../components/ApplicantSignUp.vue';
import ApplicantLogin from '../components/ApplicantLogin.vue';
import RecruiterLogin from '../components/RecruiterLogin.vue';
import RecruiterDashboard from '../components/RecruiterDashboard.vue';
import PostJob from '../components/PostJob.vue'
import ViewApplications from '../components/ViewApplications.vue'
import ManageJobs from '../components/ManageJobs.vue'
import ApplicantSavedJobs from '../components/ApplicantSavedJobs.vue'
import ApplicantDashboard from '../components/ApplicantDashboard.vue'
import Applications from '../components/Applications.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/news', component: News },
  { path: '/jobs', component: Jobs },
  { path: '/job/:id', name: 'JobDetails', component: JobDetails },
  { path: '/apply/:id', name: 'ApplyForm', component: ApplyForm },
  { path: '/applicant-signup', name: 'ApplicantSignUp', component: ApplicantSignUp },
  { path: '/applicant-login', name: 'ApplicantLogin', component: ApplicantLogin },
  { path: '/recruiter-login', name: 'RecruiterLogin', component: RecruiterLogin },
  { path: '/recruiter-dashboard', name: 'RecruiterDashboard', component: RecruiterDashboard, meta: { requiresAuth: true, role: 'recruiter' } },
  { path: '/post-job', name: 'PostJob', component: PostJob, meta: { requiresAuth: true, role: 'recruiter' } },
  { path: '/view-applications', name: 'ViewApplications', component: ViewApplications, meta: { requiresAuth: true, role: 'recruiter' } },
  { path: '/manage-jobs', name: 'ManageJobs', component: ManageJobs, meta: { requiresAuth: true, role: 'recruiter' } },
  { path: '/applicant-dashboard', name: 'ApplicantDashboard', component: ApplicantDashboard, meta: { requiresAuth: true, role: 'applicant' } },
  { path: '/saved-jobs', name: 'ApplicantSavedJobs', component: ApplicantSavedJobs, meta: { requiresAuth: true, role: 'applicant' } },
  { path: '/applications', name: 'Applications', component: Applications, meta: { requiresAuth: true, role: 'applicant' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth) {
    if (!userStore.isLoggedIn) {
      if (to.meta.role === 'recruiter') return next('/recruiter-login');
      if (to.meta.role === 'applicant') return next('/applicant-login');
      return next('/');
    }
    if (to.meta.role && to.meta.role !== userStore.role) {
      return next('/');
    }
  }
  next();
});


export default router