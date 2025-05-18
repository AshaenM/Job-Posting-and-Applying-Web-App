<template>
  <div class="container my-5" v-if="job">
    <h2>{{ job.title }}</h2>
    <p><strong>Company:</strong> {{ job.company }}</p>
    <p><strong>Description:</strong> {{ job.desc }}</p>
    <p><strong>Location:</strong> {{ job.location }}</p>
    <p><strong>Type:</strong> {{ job.employmentType }}</p>
    <p><strong>Rate:</strong> ${{ job.rate }}/hr</p>
    <p><strong>Posted Date:</strong> {{ job.postedDate }}</p>
    <p><strong>Skills:</strong> {{ job.skills.join(', ') }}</p>

    <router-link :to="`/apply/${job.id}`" class="btn btn-success mt-3">Apply Now</router-link>
    <router-link to="/jobs" class="btn btn-secondary mt-3 ms-2">Back to Jobs</router-link>
  </div>
  <div v-else class="container my-5">
    <p>Job not found.</p>
    <router-link to="/jobs" class="btn btn-primary">Back to Jobs</router-link>
  </div>
</template>

<script>
import jobsData from '../jobs.json';

export default {
  data() {
    return {
      job: null
    };
  },
  created() {   
    const jobId = this.$route.params.id;
    this.job = jobsData.find(job => job.id == jobId);
  },
  methods: {
    applyForJob() {
      this.$router.push({ name: 'ApplyForm', params: { id: this.job.id } });
    }
  }
};
</script>
