<template>
    <div class="container my-5 text-center">
        <div class="card shadow p-4">
            <h4 class="mb-3">💡 Daily Motivation</h4>
            <blockquote class="blockquote">
                <p class="mb-0">{{ quote.text }}</p>
                <footer class="blockquote-footer mt-2">{{ quote.author || "Unknown" }}</footer>
            </blockquote>
            <button @click="fetchQuote" class="btn btn-outline-primary mt-3">
                New Quote
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Motivation',
    data() {
        return {
            quote: {
                text: '',
                author: ''
            }
        };
    },
    methods: {
        async fetchQuote() {
            try {
                const response = await axios.get('https://dummyjson.com/quotes/random');
                this.quote = {
                    text: response.data.quote,
                    author: response.data.author
                };
            } catch (error) {
                console.error("Failed to fetch quote:", error);
                this.quote = {
                    text: "Stay positive, work hard, and make it happen.",
                    author: "Unknown"
                };
            }
        }
    },
    mounted() {
        this.fetchQuote();
    }
};
</script>

<style scoped>
.card {
    max-width: 600px;
    margin: auto;
    border-radius: 1rem;
}

.blockquote {
    font-size: 1.2rem;
    font-style: italic;
}
</style>
