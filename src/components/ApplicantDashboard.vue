<template>
  <div class="container my-5">
    <h2>Welcome, {{ fullName }}</h2>

    <hr />

    <div class="my-4">
      <h4>Applicant Actions</h4>
      <ul>
        <li><router-link to="/jobs">Browse Available Jobs</router-link></li>
        <li><router-link to="/applications">View My Applications</router-link></li>
      </ul>
    </div>

    <button class="btn btn-danger mt-3" @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const user = useUserStore()
const router = useRouter()

const fullName = computed(() => `${user.firstName} ${user.lastName}`.trim())

function logout() {
  user.$reset()
  router.replace('/applicant-login')
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  margin-bottom: 10px;
}
</style>
