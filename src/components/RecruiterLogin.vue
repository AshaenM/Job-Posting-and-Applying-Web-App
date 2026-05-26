<template>
    <div class="container my-5">
        <h2 class="mb-4">Recruiter Login</h2>
        <form @submit.prevent="handleLogin">
            <!-- Company Dropdown -->
            <div class="mb-3">
                <label for="company" class="form-label">Select Company</label>
                <select id="company" class="form-select" v-model="selectedCompany" @change="validateCompany">
                    <option disabled value="">Please select one</option>
                    <option v-for="company in companies" :key="company" :value="company">
                        {{ company }}
                    </option>
                </select>
                <div v-if="companyError" class="text-danger">{{ companyError }}</div>
            </div>

            <!-- Employee ID -->
            <div class="mb-3">
                <label for="employeeId" class="form-label">Employee ID</label>
                <input type="text" id="employeeId" class="form-control" v-model="employeeId"
                    @input="validateEmployeeId" />
                <div v-if="employeeIdError" class="text-danger">{{ employeeIdError }}</div>
            </div>

            <!-- Password -->
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-control" v-model="password"
                    @input="validatePassword" />
                <div v-if="passwordError" class="text-danger">{{ passwordError }}</div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary" :disabled="!formIsValid">
                Login
            </button>
            <button type="button" @click="goBack" class="btn btn-secondary ms-2">Back</button>
        </form>

        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        <div v-if="success" class="alert alert-success mt-3">{{ success }}</div>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user'

export default {
    data() {
        return {
            companies: [],
            selectedCompany: "",
            employeeId: "",
            password: "",

            companyError: null,
            employeeIdError: null,
            passwordError: null,

            error: null,
            success: null,
        };
    },
    computed: {
        formIsValid() {
            return (
                !this.companyError &&
                !this.employeeIdError &&
                !this.passwordError &&
                this.selectedCompany &&
                this.employeeId &&
                this.password
            );
        },
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        validateCompany() {
            this.companyError = this.selectedCompany ? null : "Company is required.";
        },
        validateEmployeeId() {
            if (!this.employeeId) {
                this.employeeIdError = "Employee ID is required.";
            } else if (!/^[0-9]+$/.test(this.employeeId)) {
                this.employeeIdError = "Employee ID must be a number.";
            } else {
                this.employeeIdError = null;
            }
        },
        validatePassword() {
            this.passwordError = this.password ? null : "Password is required.";
        },
        async fetchCompanies() {
            try {
                const response = await fetch('https://ashaenmanuel.infinityfreeapp.com/read.php?file=recruiters');
                if (!response.ok) throw new Error("Failed to load recruiters.");

                const recruiters = await response.json();
                this.companies = [...new Set(recruiters.map(r => r.company))];
            } catch (err) {
                console.error("Error loading companies:", err);
                this.error = "Could not load companies.";
            }
        },
        async handleLogin() {
            this.validateCompany();
            this.validateEmployeeId();
            this.validatePassword();

            if (!this.formIsValid) {
                this.error = "Please fix the errors above before submitting.";
                this.success = null;
                return;
            }

            try {
                const response = await fetch('https://ashaenmanuel.infinityfreeapp.com/read.php?file=recruiters');
                if (!response.ok) throw new Error("Failed to load recruiters file.");

                const recruiters = await response.json();

                const employee = recruiters.find(
                    recruiter => recruiter.employeeId === this.employeeId
                );

                const isValidLogin = recruiters.find(
                    recruiter =>
                        recruiter.company === this.selectedCompany &&
                        recruiter.employeeId === this.employeeId &&
                        recruiter.password === this.password
                );

                if (isValidLogin) {
                    const nameParts = isValidLogin.name.trim().split(" ");
                    const firstName = nameParts[0] || '';
                    const lastName = nameParts.slice(1).join(" ") || '';

                    const userStore = useUserStore();
                    userStore.setName(firstName, lastName);
                    userStore.setRole("recruiter");
                    userStore.setID(this.employeeId);
                    userStore.setLoggedIn(true);

                    this.success = "Login successful!";
                    this.error = null;

                    this.$router.push('/recruiter-dashboard');
                } else if (!employee) {
                    this.error = "Employee ID not found. Contact admin if you believe this is an error.";
                    this.success = null;
                } else {
                    this.error = "Invalid login credentials.";
                    this.success = null;
                }

            } catch (err) {
                console.error(err);
                this.error = "An error occurred while logging in.";
                this.success = null;
            }

            this.selectedCompany = "";
            this.employeeId = "";
            this.password = "";
        }
    },
    mounted() {
        this.fetchCompanies();
    }
};
</script>

<style scoped>
.text-danger {
    font-size: 1rem;
}
</style>
