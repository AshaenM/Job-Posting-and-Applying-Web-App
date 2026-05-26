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
        <label for="resume" class="form-label">Resume (URL)</label>
        <textarea v-model="resume" class="form-control" id="resume" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit Application</button>
      <router-link :to="`/job/${job.id}`" class="btn btn-secondary ms-2">Back</router-link>
    </form>
  </div>
  <div v-else>
    <p>Job not found.</p>
    <button @click="goBack" class="btn btn-secondary ms-2">Back</button>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user'

export default {
  data() {
    return {
      jobs: [],
      name: '',
      email: '',
      resume: '',
      loadingJobs: true,
      errorLoadingJobs: null,
    };
  },
  computed: {
    job() {
      const jobId = this.$route.params.id;
      return this.jobs.find(job => job.id === jobId);
    }
  },
  async created() {
    this.userStore = useUserStore();
    if (this.userStore.firstName || this.userStore.lastName) {
      this.name = `${this.userStore.firstName} ${this.userStore.lastName}`.trim();
    }
    try {
      const response = await fetch('http://ashaenmanuel.infinityfreeapp.com/read.php?file=jobs');
      if (!response.ok) throw new Error('Failed to load jobs data');
      this.jobs = await response.json();
    } catch (err) {
      this.errorLoadingJobs = err.message;
    } finally {
      this.loadingJobs = false;
    }
  },

  methods: {
    submitApplication() {
      const userStore = useUserStore();

      const application = {
        applicantId: userStore.id,
        jobId: this.job.id,
        name: this.name,
        email: this.email,
        resume: this.resume,
      };

      fetch('http://ashaenmanuel.infinityfreeapp.com/apply.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(application),
      })
        .then(response => {
          if (!response.ok) throw new Error('Network error');
          return response.json();
        })
        .then(data => {
          alert('Application submitted successfully!');
          this.$router.push('/applications');
        })
        .catch(error => {
          console.error('Submission failed:', error);
          alert('Failed to submit application.');
        });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
