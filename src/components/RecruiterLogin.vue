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
import { useUserStore } from '../stores/user';
import { readData, writeData } from '../github.js';

export default {
  data() {
    return {
      jobs: [],
      currentPage: 1,
      jobsPerPage: 5,
      searchQuery: '',
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const { content } = await readData('jobs');
      this.jobs = content;
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },
  computed: {
    filteredJobs() {
      if (!this.searchQuery) return this.jobs;
      const query = this.searchQuery.toLowerCase();
      return this.jobs.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.employmentType.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    },
    totalPages() {
      return Math.ceil(this.filteredJobs.length / this.jobsPerPage);
    },
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.jobsPerPage;
      return this.filteredJobs.slice(start, start + this.jobsPerPage);
    },
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    }
  },
  methods: {
    goToJobDetail(id) {
      this.$router.push({ name: 'JobDetails', params: { id } });
    },
    async saveJob(jobId) {
      const userStore = useUserStore();
      const applicantId = userStore.id;

      try {
        const { content: shortlists, sha } = await readData('shortlists');
        const alreadySaved = shortlists.some(
          s => s.job_id === jobId && s.applicant_id === applicantId
        );
        if (alreadySaved) {
          alert('Job already saved to shortlist!');
          return;
        }
        const newEntry = { job_id: jobId, applicant_id: applicantId };
        const updated = [...shortlists, newEntry];
        await writeData('shortlists', updated, sha);
        alert('Job saved to shortlist!');
      } catch (err) {
        console.error(err);
        alert('Could not save job.');
      }
    }
  }
};
</script>

<style scoped>
.text-danger {
    font-size: 1rem;
}
</style>
