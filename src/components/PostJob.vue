<template>
    <div class="container mt-5">
        <h2 class="mb-4">Post a New Job</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label class="form-label">Job Title</label>
                <input type="text" class="form-control" v-model="job.title" required />
            </div>

            <div class="mb-3">
                <label class="form-label">Company</label>
                <input type="text" class="form-control" v-model="job.company" required />
            </div>

            <div class="mb-3">
                <label class="form-label">Location</label>
                <input type="text" class="form-control" v-model="job.location" required />
            </div>

            <div class="mb-3">
                <label class="form-label">Salary</label>
                <input type="number" class="form-control" v-model="job.salary" />
            </div>

            <div class="mb-3">
                <label class="form-label">Job Type</label>
                <select class="form-select" v-model="job.type" required>
                    <option value="">Select...</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" v-model="job.description" rows="5" required></textarea>
            </div>

            <div class="mb-3">
                <label class="form-label">Required Skills</label>
                <div class="form-check" v-for="skill in skillOptions" :key="skill">
                    <input class="form-check-input" type="checkbox" :id="skill" :value="skill" v-model="job.skills" />
                    <label class="form-check-label" :for="skill">{{ skill }}</label>
                </div>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="!isFormValid">Submit Application</button>
        </form>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { readData, writeData } from '../github.js'

const router = useRouter()

const job = reactive({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: '',
    description: '',
    skills: []
})

const skillOptions = [
    'JavaScript',
    'Python',
    'Java',
    'C#',
    'Vue.js',
    'React',
    'Django',
    'PostgreSQL',
    'SQL',
    'Node.js'
]

const isFormValid = computed(() => {
    return (
        job.title.trim() !== '' &&
        job.company.trim() !== '' &&
        job.location.trim() !== '' &&
        job.salary !== '' &&
        job.type.trim() !== '' &&
        job.description.trim() !== '' &&
        job.skills.length > 0
    )
})

const submitForm = async () => {
    const jobData = {
        id: 'JOB' + Date.now(),
        title: job.title,
        company: job.company,
        desc: job.description,
        rate: job.salary,
        location: job.location,
        employmentType: job.type,
        skills: job.skills,
        postedDate: new Date().toISOString().split('T')[0]
    }

    try {
        const { content: jobs, sha } = await readData('jobs')
        const updated = [...jobs, jobData]
        await writeData('jobs', updated, sha)

        alert('Job posted successfully!')
        router.push('/manage-jobs')
    } catch (error) {
        console.error('Submission failed:', error)
        alert('Failed to post job.')
    }

    job.title = ''
    job.company = ''
    job.location = ''
    job.salary = ''
    job.type = ''
    job.description = ''
    job.skills = []
}
</script>

<style scoped>
.container {
    max-width: 700px;
}
</style>
