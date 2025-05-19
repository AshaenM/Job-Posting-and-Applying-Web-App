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
  export default {
    data() {
      return {
        jobsData: [],
        loading: true,
        error: null,
      };
    },
    async created() {
      try {
        const res = await fetch('/jobs.json');
        if (!res.ok) throw new Error('Failed to load jobs data');
        this.jobsData = await res.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    computed: {
      job() {
        const jobId = this.$route.params.id;
        return this.jobsData.find(job => job.id === jobId);
      }
    }
  };
</script>
