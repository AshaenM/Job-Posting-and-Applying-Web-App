<script setup>
import { ref, computed } from 'vue'

const firstName = ref('')
const lastName = ref('')
const pictureChoice = ref('')

const welcomeMessage = computed(() => {
    if (firstName.value || lastName.value) {
        return `Welcome ${firstName.value} ${lastName.value}!`
    }
    return ''
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
                    This image represents dedicated job applicants.
                </span>
                <span v-else-if="pictureChoice === 'recruiter'">
                    This image represents a professional recruiter.
                </span>
            </p>
        </div>
    </div>
</template>


<style scoped>
body {
    background-color: #f8f9fa;
}
</style>
