<template>
    <div class="container my-5">
        <h2 class="mb-4">Applicant Login</h2>
        <form @submit.prevent="handleLogin" autocomplete="off">
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" name="email" v-model="email" @input="validateEmail" autocomplete="off"/>
                <div v-if="emailError" class="text-danger">{{ emailError }}</div>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" v-model="password"
                    @input="validatePassword" autocomplete="new-password"/>
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
        async handleLogin() {
            this.validateEmail();
            this.validatePassword();

            if (!this.formIsValid) {
                this.error = 'Please fix the errors above before logging in.';
                this.success = null;
                return;
            }

            try {
                const response = await fetch('/applicants.json');
                if (!response.ok) {
                    throw new Error('Failed to load applicants data.');
                }

                const applicants = await response.json();

                // Trim inputs to avoid leading/trailing space issues
                const trimmedEmail = this.email.trim();
                const trimmedPassword = this.password.trim();

                const applicant = applicants.find(app =>
                    app.email === trimmedEmail && app.password === trimmedPassword
                );

                if (applicant) {
                    this.success = 'Login successful!';
                    this.error = null;

                } else {
                    this.error = 'Invalid email or password.';
                    this.success = null;
                }
            } catch (err) {
                this.error = 'An error occurred while logging in.';
                this.success = null;
                console.error(err);
            }

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