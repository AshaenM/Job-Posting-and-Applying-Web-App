<template>
  <div class="container my-5">
    <h2 class="mb-4">Applicant Sign Up</h2>
    <form @submit.prevent="handleSignUp">
      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input type="text" class="form-control" id="name" v-model="name" @input="validateName" />
        <div v-if="nameError" class="text-danger">{{ nameError }}</div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" v-model="email" @input="validateEmail" />
        <div v-if="emailError" class="text-danger">{{ emailError }}</div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" @input="validatePassword" />
        <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
      </div>

      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" v-model="confirmPassword"
          @input="validateConfirmPassword" />
        <div v-if="confirmPasswordError" class="text-danger">{{ confirmPasswordError }}</div>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="!formIsValid">Sign Up</button>
      <router-link :to="`/about`" class="btn btn-secondary ms-2">Back</router-link>
    </form>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>

    <div class="mt-4">
      Already have an account?
      <router-link to="/applicant-login" class="btn btn-outline-primary btn-sm ms-2">Log In</router-link>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user"
import { readData, writeData } from '../github.js';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
      error: null,
      success: null,
      userStore: null,
    };
  },
  computed: {
    formIsValid() {
      return (
        !this.nameError &&
        !this.emailError &&
        !this.passwordError &&
        !this.confirmPasswordError &&
        this.name &&
        this.email &&
        this.password &&
        this.confirmPassword
      );
    },
  },
  created() {
    this.userStore = useUserStore();
    if (this.userStore.firstName || this.userStore.lastName) {
      this.name = `${this.userStore.firstName} ${this.userStore.lastName}`.trim();
    }
  },
  methods: {
    validateName() {
      if (!this.name) {
        this.nameError = 'Name is required.';
      } else if (!/^[a-zA-Z\s]+$/.test(this.name)) {
        this.nameError = 'Name must contain only letters.';
      } else {
        this.nameError = null;
      }
    },
    validateEmail() {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (!this.email) {
        this.emailError = 'Email is required.';
      } else if (!emailRegex.test(this.email)) {
        this.emailError = 'Email must be valid.';
      } else {
        this.emailError = null;
      }
    },
    validatePassword() {
      const specialCharRegex = /[$%^&*]/;
      if (!this.password) {
        this.passwordError = 'Password is required.';
      } else if (this.password.length < 8) {
        this.passwordError = 'Password must be at least 8 characters.';
      } else if (!specialCharRegex.test(this.password)) {
        this.passwordError = 'Password must include a special character: $, %, ^, &, *';
      } else {
        this.passwordError = null;
      }
      this.validateConfirmPassword();
    },
    validateConfirmPassword() {
      if (!this.confirmPassword) {
        this.confirmPasswordError = 'Please confirm your password.';
      } else if (this.confirmPassword !== this.password) {
        this.confirmPasswordError = 'Passwords do not match.';
      } else {
        this.confirmPasswordError = null;
      }
    },
    async handleSignUp() {
      this.validateName();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();

      if (!this.formIsValid) {
        this.error = 'Please fix the errors above before submitting.';
        return;
      }

      try {
        const { content: applicants, sha } = await readData('applicants');

        const emailExists = applicants.some(a => a.email === this.email);
        if (emailExists) {
          alert('An account with this email already exists.');
          return;
        }

        const newId = 'A' + Date.now();
        const newApplicant = {
          applicant_id: newId,
          name: this.name,
          email: this.email,
          password: this.password,
        };

        const updated = [...applicants, newApplicant];
        await writeData('applicants', updated, sha);

        this.userStore.setRole("applicant");
        this.userStore.setLoggedIn(true);
        this.userStore.setID(newId);

        const nameParts = this.name.trim().split(' ');
        this.userStore.setName(nameParts[0] || '', nameParts.slice(1).join(' ') || '');

        alert('Applicant successfully added!');
        this.name = this.email = this.password = this.confirmPassword = '';
        this.$router.push('/applicant-dashboard');

      } catch (error) {
        console.error('Submission failed:', error.message);
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped>
.text-danger {
  font-size: 1rem;
}
</style>
