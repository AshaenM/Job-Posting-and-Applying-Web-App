<script setup>
import { ref, computed, watch } from 'vue'
import { useUserStore } from '../stores/user'

const firstName = ref('')
const lastName = ref('')
const pictureChoice = ref('')

const userStore = useUserStore()

const welcomeMessage = computed(() => {
    if (firstName.value || lastName.value) {
        return `Hi ${firstName.value} ${lastName.value}!`
    }
    return ''
})

watch([firstName, lastName], ([newFirst, newLast]) => {
    userStore.setName(newFirst, newLast)
})

</script>

<template>
    <div class="container mt-5 p-4 bg-light rounded shadow">
        <h2 v-if="welcomeMessage" class="text-primary text-center mb-4">{{ welcomeMessage }}</h2>

        <p class="mb-4">
            Welcome to our simple and user-friendly web app! Whether you're a recruiter looking to post jobs or an
            applicant searching for your next opportunity, this platform is here to make things easier. Just enter your
            name, select your role, and enjoy a personalized experience tailored to you. It's a small but helpful tool
            designed to connect the right people with the right roles.
        </p>

        <form>
            <p class="h5 mb-3">What is your name?</p>

            <div class="row mb-4">
                <div class="col-md-6">
                    <label for="fname" class="form-label">First Name</label>
                    <input type="text" class="form-control" v-model="firstName" id="fname" />
                </div>
                <div class="col-md-6">
                    <label for="lname" class="form-label">Last Name</label>
                    <input type="text" class="form-control" v-model="lastName" id="lname" />
                </div>
            </div>

            <p class="h5 mb-3">Are you a recruiter or applicant?</p>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="recruiter" value="recruiter" v-model="pictureChoice" />
                <label class="form-check-label" for="recruiter">Recruiter</label>
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" id="applicant" value="applicant" v-model="pictureChoice" />
                <label class="form-check-label" for="applicant">Applicant</label>
            </div>
        </form>

        <div v-if="pictureChoice" class="mt-4 text-center">
            <img v-if="pictureChoice === 'applicant'" src="../assets/applicant.jpg" alt="Applicant Image"
                class="img-fluid rounded shadow mb-3" width="400" />
            <img v-else-if="pictureChoice === 'recruiter'" src="../assets/recruiter.jpg" alt="Recruiter Image"
                class="img-fluid rounded shadow mb-3" width="400" />

            <p class="lead">
                <span v-if="pictureChoice === 'applicant'">
                    Ready to apply for jobs? Click the button below to sign up and start your application journey!
                </span>
                <span v-else-if="pictureChoice === 'recruiter'">
                    If your company is registered with us, you can access the recruiter portal with your Employee ID
                    using the button below to
                    view your dashboard and manage your listings.
                </span>
            </p>

            <!-- Show Sign Up button for applicants -->
            <router-link v-if="pictureChoice === 'applicant'" to="/applicant-signup" class="btn btn-success">
                Sign Up as Applicant
            </router-link>

            <!-- Show Login button for recruiters -->
            <router-link v-if="pictureChoice === 'recruiter'" to="/recruiter-login" class="btn btn-success">
                Login as Recruiter
            </router-link>
        </div>
    </div>
</template>


<style scoped>
body {
    background-color: #f8f9fa;
}
</style>
