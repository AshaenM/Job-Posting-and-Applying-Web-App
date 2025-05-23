<template>
    <div class="container my-5">
        <h2 class="mb-4 text-center">My Shortlisted Jobs</h2>

        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else-if="error" class="alert alert-danger text-center">{{ error }}</div>

        <table v-else class="table table-bordered table-striped">
            <caption class="text-center">Shortlisted Jobs</caption>
            <thead>
                <tr>
                    <th class="bg-secondary text-white" scope="col" id="title">Title</th>
                    <th class="bg-secondary text-white" scope="col" id="company">Company</th>
                    <th class="bg-secondary text-white" scope="col" id="location">Location</th>
                    <th class="bg-secondary text-white" scope="col" id="type">Type</th>
                    <th class="bg-secondary text-white" scope="col" id="rate">Rate ($/hr)</th>
                    <th class="bg-secondary text-white" scope="col" id="actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="job in shortlistedJobs" :key="job.id">
                    <td headers="title">{{ job.title }}</td>
                    <td headers="company">{{ job.company }}</td>
                    <td headers="location">{{ job.location }}</td>
                    <td headers="type">{{ job.employmentType }}</td>
                    <td headers="rate">{{ job.rate }}</td>
                    <td>
                        <button class="btn btn-success" @click="apply(job.id)">Apply</button>
                    </td>
                </tr>
                <tr v-if="shortlistedJobs.length === 0">
                    <td colspan="6" class="text-center">No shortlisted jobs found.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user';

export default {
    data() {
        return {
            applicantId: null,
            allJobs: [],
            shortlistedIds: [],
            shortlistedJobs: [],
            loading: true,
            error: null,
        };
    },
    async created() {
        const userStore = useUserStore();
        this.applicantId = userStore.id;

        try {
            // Fetch shortlisted jobs and all jobs simultaneously
            const [shortlistRes, jobsRes] = await Promise.all([
                fetch('./read.php?file=shortlists'),
                fetch('./read.php?file=jobs'),
            ]);

            // Check if both requests were successful
            if (!shortlistRes.ok || !jobsRes.ok)
                throw new Error("Failed to load data");

            // Parse the responses as JSON
            const shortlists = await shortlistRes.json();
            const jobs = await jobsRes.json();

            // Filter shortlist entries that belong to the current applicant and map to an array of job IDs that are shortlisted by this applicant
            this.shortlistedIds = shortlists
                .filter((item) => item.applicant_id === this.applicantId)
                .map((item) => item.job_id);

            this.allJobs = jobs;

            this.shortlistedJobs = this.allJobs.filter((job) =>
                this.shortlistedIds.includes(job.id)
            );
        } catch (err) {
            this.error = err.message;
        } finally {
            this.loading = false;
        }
    },
    methods: {
        apply(jobId) {
            this.$router.push({ name: 'ApplyForm', params: { id: jobId } });
        },
    },
};
</script>

<style scoped>
h2 {
    font-weight: bold;
}
</style>
