<template>
  <div class="container my-5" v-if="job">
    <h2>Apply for {{ job.title }} at {{ job.company }}</h2>

    <form @submit.prevent="submitApplication">
      <div class="mb-3">
        <label for="name" class="form-label">Full Name</label>
        <input type="text" v-model="name" class="form-control" id="name" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input type="email" v-model="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="resume" class="form-label">Resume (URL or brief text)</label>
        <textarea v-model="resume" class="form-control" id="resume" rows="4" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit Application</button>
      <router-link :to="`/job/${job.id}`" class="btn btn-secondary ms-2">Back</router-link>
    </form>
  </div>
  <div v-else>
    <p>Job not found.</p>
    <router-link to="/" class="btn btn-primary">Back to Jobs</router-link>
  </div>
</template>

<script>
import jobsData from '../jobs.json';

export default {
  data() {
    return {
      name: '',
      email: '',
      resume: ''
    };
  },
  computed: {
    job() {
      const jobId = this.$route.params.id;
      return jobsData.find(job => job.id === jobId);
    }
  },
  methods: {
    submitApplication() {
      alert(`Application submitted for ${this.name} to ${this.job.title} at ${this.job.company}!`);
      this.$router.push('/');
    }
  }
};
</script>

