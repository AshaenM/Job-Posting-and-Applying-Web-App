<template>
  <div class="container my-5">
    <h2 class="mb-4 text-center">Jobs You've Posted</h2>

    <div class="table-responsive mb-4">
      <table class="table table-bordered table-striped">
        <caption>Jobs</caption>
        <thead>
          <tr>
            <th class="bg-primary text-white" scope="col" id="title">Title</th>
            <th class="bg-primary text-white" scope="col" id="location">Location</th>
            <th class="bg-primary text-white" scope="col" id="type">Type</th>
            <th class="bg-primary text-white" scope="col" id="rate">Rate ($/hr)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="job in paginatedJobs" :key="job.id" @click="goToJobDetail(job.id)" style="cursor: pointer;">
            <td headers="title">{{ job.title }}</td>
            <td headers="location">{{ job.location }}</td>
            <td headers="type">{{ job.employmentType }}</td>
            <td headers="rate">{{ job.rate }}</td>
          </tr>
          <tr v-if="paginatedJobs.length === 0">
            <td colspan="4" class="text-center">No jobs found.</td>
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
          <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
        </li>
      </ul>
    </nav>

    <div v-if="selectedJobId">
      <div ref="applicationsSection">
        <h3 class="mb-4">Applicant List</h3>
        <div v-for="application in filteredApplications" :key="application.applicationId" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ application.name }}</h5>
            <p class="card-text"><strong>Resume Link:</strong> {{ application.resume }}</p>
            <p class="card-text"><strong>Email:</strong> {{ application.email }}</p>
            <p class="card-text"><strong>Status:</strong> {{ application.status }}</p>
            <button class="btn btn-success me-2"
              @click="updateStatus(application.applicationId, 'Accepted')">Accept</button>
            <button class="btn btn-danger me-2"
              @click="updateStatus(application.applicationId, 'Rejected')">Reject</button>
            <button class="btn btn-outline-danger" @click="deleteApplication(application.applicationId)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user';
import { mapState } from 'pinia';

export default {
  name: 'ViewApplications',
  data() {
    return {
      applications: [],
      jobs: [],
      recruiters: [],
      currentPage: 1,
      jobsPerPage: 5,
      selectedJobId: null,
    };
  },
  computed: {
    ...mapState(useUserStore, ['id']),
    recruiterCompany() {
      const recruiter = this.recruiters.find(r => r.employeeId === this.id);
      return recruiter ? recruiter.company : '';
    },
    myJobs() {
      return this.jobs.filter(job => job.company === this.recruiterCompany);
    },
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.jobsPerPage;
      return this.myJobs.slice(start, start + this.jobsPerPage);
    },
    totalPages() {
      return Math.ceil(this.myJobs.length / this.jobsPerPage);
    },
    filteredApplications() {
      return this.applications.filter(app => app.jobId === this.selectedJobId);
    }
  },
  methods: {
    goToJobDetail(id) {
      this.selectedJobId = id;

      this.$nextTick(() => {
        const target = this.$refs.applicationsSection;
        if (target && target.scrollIntoView) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },
    async fetchData() {
      try {
        const [appsRes, jobsRes, recsRes] = await Promise.all([
          fetch('http://ashaenmanuel.infinityfreeapp.com/read.php?file=applications'),
          fetch('http://ashaenmanuel.infinityfreeapp.com/read.php?file=jobs'),
          fetch('http://ashaenmanuel.infinityfreeapp.com/read.php?file=recruiters')
        ]);

        this.applications = await appsRes.json();
        this.jobs = await jobsRes.json();
        this.recruiters = await recsRes.json();
      } catch (error) {
        console.error('Error loading data:', error);
      }
    },
    async updateStatus(applicationId, newStatus) {
      try {
        const res = await fetch(`http://ashaenmanuel.infinityfreeapp.com/update_application_status.php?id=${applicationId}&status=${newStatus}`);
        if (!res.ok) throw new Error('Failed to update status');

        const result = await res.json();
        alert(result.message);

        // Update local data
        const app = this.applications.find(a => a.applicationId === applicationId);
        if (app) app.status = newStatus;
      } catch (error) {
        console.error(error);
        alert('Error updating status.');
      }
    },
    async deleteApplication(applicationId) {
      if (!confirm('Are you sure you want to delete this application?')) return;

      try {
        const res = await fetch(`http://ashaenmanuel.infinityfreeapp.com/delete_application.php?id=${applicationId}`);
        if (!res.ok) throw new Error('Failed to delete');

        const result = await res.json();
        console.log(result.message);
        alert(result.message);
        this.applications = this.applications.filter(app => app.applicationId !== applicationId);
      } catch (error) {
        console.error(error);
        alert('Error deleting application.');
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>
caption {
  text-align: center;
}

.card {
  border-radius: 10px;
}
</style>
