<template>
    <div class="container my-5">
        <h2 class="mb-4">My Applications</h2>

        <div v-if="loading" class="text-muted">Loading your applications...</div>

        <div v-else-if="applications.length === 0" class="alert alert-info">
            You haven't applied to any jobs yet.
        </div>

        <div v-else>
            <div class="card mb-3" v-for="(application, index) in applications" :key="index">
                <div class="card-body">
                    <h5 class="card-title">{{ application.jobTitle }}</h5>
                    <p class="card-text mb-1">
                        <strong>Company:</strong> {{ application.company }}
                    </p>
                    <p class="card-text mb-1 d-flex align-items-center gap-2">
                        <strong>Status:</strong>
                        <span :class="statusBadgeClass(application.status)" class="badge">
                            <i :class="statusIcon(application.status)" class="me-1"></i>
                            {{ application.status }}
                        </span>
                    </p>
                    <p class="card-text">
                        <strong>Applied on:</strong>
                        {{ formatDate(application.date) }}
                    </p>
                    <p v-if="application.status.toLowerCase() === 'accepted'" class="mt-2 text-success fw-semibold">
                        🎉 You will be contacted for an interview!
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from "../stores/user";

export default {
    data() {
        return {
            applications: [],
            jobs: [],
            loading: true,
        };
    },
    methods: {
        // Fetches applications and corresponding jobs for the logged-in user
        async fetchApplicationsAndJobs() {
            try {
                const userStore = useUserStore();
                const userID = userStore.id;

                // Fetch all data from server
                const appsRes = await fetch('http://ashaenmanuel.infinityfreeapp.com/read.php?file=applications');
                if (!appsRes.ok) throw new Error("Failed to fetch applications");
                const allApplications = await appsRes.json();

                const jobsRes = await fetch('http://ashaenmanuel.infinityfreeapp.com/read.php?file=jobs');
                if (!jobsRes.ok) throw new Error("Failed to fetch jobs");
                this.jobs = await jobsRes.json();

                // Filter applications to only include those that belong to the current user
                const userApplications = allApplications.filter(
                    (app) => app.applicantId === userID
                );

                // Map user applications to include job details (company and title)
                this.applications = userApplications.map((app) => {
                    const job = this.jobs.find((j) => j.id === app.jobId);
                    return {
                        ...app,
                        company: job ? job.company : "Unknown Company",
                        jobTitle: job ? job.title : "Unknown Job Title",
                    };
                });
            } catch (err) {
                console.error("Error loading data:", err);
                this.applications = [];
            } finally {
                this.loading = false;
            }
        },

        formatDate(dateString) {
            const options = { year: "numeric", month: "long", day: "numeric" };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },

        // Return Bootstrap badge class based on application status string
        statusBadgeClass(status) {
            switch (status.toLowerCase()) {
                case 'accepted':
                    return 'bg-success';
                case 'rejected':
                    return 'bg-danger';
                case 'pending review':
                default:
                    return 'bg-secondary';
            }
        },
        statusIcon(status) {
            switch (status.toLowerCase()) {
                case 'accepted':
                    return 'bi bi-check-circle-fill';
                case 'rejected':
                    return 'bi bi-x-circle-fill';
                case 'pending review':
                default:
                    return 'bi bi-hourglass-split';
            }
        }
    },
    // Lifecycle hook that calls fetchApplicationsAndJobs when component is mounted
    mounted() {
        this.fetchApplicationsAndJobs();
    },
};
</script>

<style scoped>
.card {
    border-left: 5px solid #0d6efd;
}
</style>
