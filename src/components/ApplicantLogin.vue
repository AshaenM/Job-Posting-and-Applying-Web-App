<template>
    <div class="container my-5">
        <h2 class="mb-4">Applicant Login</h2>
        <form @submit.prevent="handleLogin">
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" v-model="email" @input="validateEmail" />
                <div v-if="emailError" class="text-danger">{{ emailError }}</div>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password"
                    @input="validatePassword" />
                <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="!formIsValid">Log In</button>
            <button @click="goBack" class="btn btn-secondary ms-2">Back</button>

        </form>

        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>

        <div class="mt-4">
            Don't have an account?
            <router-link to="/applicant-signup" class="btn btn-outline-primary btn-sm ms-2">Sign Up</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            emailError: null,
            passwordError: null,
            error: null,
            success: null,
        };
    },
    computed: {
        formIsValid() {
            return !this.emailError && !this.passwordError && this.email && this.password;
        },
    },
    methods: {
        validateEmail() {
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
            if (!this.email) {
                this.emailError = 'Email is required.';
            } else if (!emailRegex.test(this.email)) {
                this.emailError = 'Enter a valid email.';
            } else {
                this.emailError = null;
            }
        },
        validatePassword() {
            if (!this.password) {
                this.passwordError = 'Password is required.';
            } else {
                this.passwordError = null;
            }
        },
        handleLogin() {
            this.validateEmail();
            this.validatePassword();

            if (!this.formIsValid) {
                this.error = 'Please fix the errors above before logging in.';
                return;
            }

            console.log('Logging in with', { email: this.email, password: this.password });
            this.success = 'Login successful!';
            this.error = null;

            this.email = '';
            this.password = '';
        },
        goBack() {
            this.$router.go(-1);
        }
    },
};
</script>

<style scoped>
.text-danger {
    font-size: 1rem;
}
</style>