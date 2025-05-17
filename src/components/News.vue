<template>
  <div class="container my-5">
    <h2 class="mb-4 text-center">Available Jobs</h2>

    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Search by title, company, or type"
        v-model="searchQuery"
      />
    </div>

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
        <tr v-for="job in paginatedJobs" :key="job.id">
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

    <nav v-if="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">Previous</button>
        </li>

        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
        >
          <button class="page-link" @click="currentPage = page">{{ page }}</button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import jobsData from '../jobs.json';

export default {
  data() {
    return {
      jobs: jobsData,
      currentPage: 1,
      jobsPerPage: 5,
      searchQuery: '',
    };
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
  }
};
</script>

<style scoped>
caption{
    text-align: center;
}
</style>
