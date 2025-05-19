<template>
    <div class="container my-5">
        <h2 class="mb-4 text-center">Available Jobs</h2>

        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Search by title, company, location or type"
                v-model="searchQuery" />
        </div>

        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <caption>Jobs</caption>
                <thead>
                    <tr>
                        <th class="bg-primary text-white" id="title" scope="col">Title</th>
                        <th class="bg-primary text-white" id="company" scope="col">Company</th>
                        <th class="bg-primary text-white" id="location" scope="col">Location</th>
                        <th class="bg-primary text-white" id="type" scope="col">Type</th>
                        <th class="bg-primary text-white" id="rate" scope="col">Rate ($/hr)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="job in paginatedJobs" :key="job.id" @click="goToJobDetail(job.id)"
                        style="cursor: pointer;">
                        <td headers="title">{{ job.title }}</td>
                        <td headers="company">{{ job.company }}</td>
                        <td headers="location">{{ job.location }}</td>
                        <td headers="type">{{ job.employmentType }}</td>
                        <td headers="rate">{{ job.rate }}</td>
                    </tr>
                    <tr v-if="paginatedJobs.length === 0">
                        <td colspan="5" class="text-center">No jobs found.</td>
                    </tr>
                </tbody>
            </table>
        </div>


        <nav v-if="totalPages > 1">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
                </li>

                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                    <button class="page-link" @click="currentPage = page">{{ page }}</button>
                </li>

                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="currentPage++"
                        :disabled="currentPage === totalPages">Next</button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
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
      const response = await fetch('/jobs.json');
      if (!response.ok) throw new Error('Failed to load jobs data');
      this.jobs = await response.json();
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
    }
  }
};
</script>

<style scoped>
caption {
    text-align: center;
}
</style>
