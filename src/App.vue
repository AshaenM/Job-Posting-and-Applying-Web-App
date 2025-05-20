<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <div class="container-fluid">
        <h2>TalentHaven</h2>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="user.role == 'recruiter'">
              <router-link class="nav-link text-primary" to="/recruiter-dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-primary" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-primary" :to="{ path: '/about' }">About</router-link>
            </li>
            <li class="nav-item" v-if="!user.role">
              <router-link class="nav-link text-primary" to="/recruiter-login">Login (Recruiters)</router-link>
            </li>
            <li class="nav-item" v-if="!user.role">
              <router-link class="nav-link text-primary" to="/applicant-login">Login (Applicants)</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-primary" :to="{ path: '/jobs' }">Available Jobs</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="text-center">
        <h1>Welcome to TalentHaven</h1>
        <p>Connecting top talent with great opportunities — all in one place.</p>
      </div>
    </div>

    <router-view />

  </div>
</template>

<script>
import { useUserStore } from '../src/stores/user'


export default {
  name: 'App',
  setup() {
    const user = useUserStore()
    return { user }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}

h2,
h3 {
  font-weight: bold;
}

.nav-bar-container {
  background-color: rgb(250, 246, 246);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-link {
  padding: 0.9rem 2rem;
  transition: color 0.3s ease;
}

.nav-item .nav-link:hover {
  color: blue !important;
}

.navbar-nav .nav-item {
  margin-left: 2rem;
}

.container-fluid .row:nth-child(2) {
  background-image: url('../src/assets/banner.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 576px) {
  .nav-link {
    padding: 0.9rem 0rem;
  }

  .navbar-nav .nav-item {
    margin-left: 0;
  }
}
</style>
