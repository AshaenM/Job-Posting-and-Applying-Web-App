<template>
    <div class="container my-5">
        <h2 class="mb-4 text-center">Manage Your Job Posts</h2>

        <div class="mb-3">
            <input type="text" class="form-control" placeholder="Search jobs by title, location, type, or rate"
                v-model="searchQuery" />
        </div>

        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <caption class="text-center">Jobs</caption>
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
                    <tr v-for="job in filteredJobs" :key="job.id">
                        <td headers="title">{{ job.title }}</td>
                        <td headers="company">{{ job.company }}</td>
                        <td headers="location">{{ job.location }}</td>
                        <td headers="type">{{ job.employmentType }}</td>
                        <td headers="rate">{{ job.rate }}</td>
                        <td>
                            <button class="btn btn-sm btn-warning me-2" @click="editJob(job)">Edit</button>
                            <button class="btn btn-sm btn-danger" @click="deleteJob(job.id)">Delete</button>
                        </td>
                    </tr>
                    <tr v-if="filteredJobs.length === 0">
                        <td colspan="5" class="text-center">No jobs match your search.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="editingJob" class="modal d-block" tabindex="-1" role="dialog"
            style="background-color: rgba(0,0,0,0.5);">
            <div class="modal-dialog" role="document">
                <div class="modal-content p-3">
                    <h5>Edit Job</h5>
                    <div class="mb-2">
                        <input v-model="editingJob.title" class="form-control" placeholder="Job Title" />
                    </div>
                    <div class="mb-2">
                        <input v-model="editingJob.location" class="form-control" placeholder="Location" />
                    </div>
                    <div class="mb-2">
                        <input v-model="editingJob.employmentType" class="form-control" placeholder="Employment Type" />
                    </div>
                    <div class="mb-2">
                        <input v-model="editingJob.rate" class="form-control" placeholder="Rate" />
                    </div>
                    <div class="text-end">
                        <button class="btn btn-secondary me-2" @click="editingJob = null">Cancel</button>
                        <button class="btn btn-success" @click="saveEdit">Save</button>
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
    name: 'ManageJobs',
    data() {
        return {
            jobs: [],
            recruiters: [],
            searchQuery: '',
            editingJob: null,
        };
    },
    computed: {
        // Map the 'id' state from the user store into this component
        ...mapState(useUserStore, ['id']),

        // Find the company of the recruiter based on the current user's id
        recruiterCompany() {
            const recruiter = this.recruiters.find(r => r.employeeId === this.id);
            return recruiter ? recruiter.company : '';
        },
        myJobs() {
            return this.jobs.filter(job => job.company === this.recruiterCompany);
        },
        filteredJobs() {
            if (!this.searchQuery) return this.myJobs;

            const query = this.searchQuery.toLowerCase();
            return this.myJobs.filter(job =>
                Object.values(job).some(value =>
                    String(value).toLowerCase().includes(query)
                )
            );
        }
    },
    methods: {
        async fetchJobs() {
            try {
                const [jobsRes, recsRes] = await Promise.all([
                    fetch('https://ashaenmanuel.infinityfreeapp.com/read.php?file=jobs'),
                    fetch('https://ashaenmanuel.infinityfreeapp.com/read.php?file=recruiters'),
                ]);

                this.jobs = await jobsRes.json();
                this.recruiters = await recsRes.json();
            } catch (error) {
                console.error('Error loading job data:', error);
            }
        },
        deleteJob(id) {
            if (!confirm('Are you sure you want to delete this job?')) return;

            fetch(`https://ashaenmanuel.infinityfreeapp.com/delete_job.php?id=${id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to delete');
                    return res.json();
                })
                .then(data => {
                    console.log(data.message);
                    alert('Job successfully deleted.');
                    this.jobs = this.jobs.filter(job => job.id !== id);
                })
                .catch(err => {
                    console.error(err);
                    alert('Failed to delete job.');
                });
        },
        editJob(job) {
            // Clone the object to prevent immediate binding
            this.editingJob = { ...job };
        },
        saveEdit() {
            fetch('https://ashaenmanuel.infinityfreeapp.com/edit_job.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.editingJob),
            })
                .then(res => {
                    if (!res.ok) throw new Error('Failed to update');
                    return res.json();
                })
                .then(data => {
                    console.log(data.message);
                    alert('Changes successfully saved');
                    const index = this.jobs.findIndex(j => j.id === this.editingJob.id);
                    if (index !== -1) this.jobs[index] = { ...this.editingJob };
                    this.editingJob = null;
                })
                .catch(err => {
                    console.error(err);
                    alert('Failed to save job changes.');
                });
        },
    },
    mounted() {
        this.fetchJobs();
    }
};
</script>

<style scoped>
.modal-dialog {
    max-width: 500px;
}

.modal-content {
    border-radius: 10px;
}
</style>
