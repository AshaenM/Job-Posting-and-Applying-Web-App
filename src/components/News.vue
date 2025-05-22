<template>
    <div class="container my-5">
        <h2 class="text-center mb-4">Latest News</h2>

        <!-- Search -->
        <div class="row mb-4">
            <div class="col-md-6 mx-auto">
                <input v-model="searchQuery" class="form-control" type="text"
                    placeholder="Search by title, content or category..." />
            </div>
        </div>

        <!-- Category Filter -->
        <div class="row mb-4">
            <div class="col-md-8 mx-auto text-center">
                <div class="form-check form-check-inline" v-for="cat in allCategories" :key="cat">
                    <input class="form-check-input" type="radio" :id="cat" :value="cat" v-model="selectedCategory" />
                    <label class="form-check-label" :for="cat">{{ cat }}</label>
                </div>
            </div>
        </div>

        <!-- News List -->
        <div v-if="paginatedNews.length > 0">
            <div v-for="news in paginatedNews" :key="news.id" class="card mb-3 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">{{ news.title }}</h5>
                    <h6 class="card-subtitle text-muted mb-2">{{ formatDate(news.date) }}</h6>
                    <p class="card-text">{{ news.content }}</p>
                    <span class="badge bg-primary">{{ news.category }}</span>
                </div>
            </div>

            <!-- Pagination -->
            <nav v-if="totalPages > 1">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
                            Previous
                        </button>
                    </li>

                    <li class="page-item" v-for="page in totalPages" :key="page"
                        :class="{ active: page === currentPage }">
                        <button class="page-link" @click="changePage(page)">
                            {{ page }}
                        </button>
                    </li>

                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <button class="page-link" @click="changePage(currentPage + 1)"
                            :disabled="currentPage === totalPages">
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>

        <div v-else class="text-center text-muted">
            No news items match your search.
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";

export default {
    name: "News",
    setup() {
        const newsItems = ref([]);
        const searchQuery = ref("");
        const selectedCategory = ref("All");
        const currentPage = ref(1);
        const itemsPerPage = 5;

        onMounted(async () => {
            try {
                const res = await fetch('./read.php?file=news');
                newsItems.value = await res.json();
            } catch (error) {
                console.error("Failed to load news:", error);
            }
        });

        // Extract all unique categories
        const allCategories = computed(() => {
            const categories = new Set(newsItems.value.map(item => item.category));
            return ["All", ...Array.from(categories)];
        });

        // Filtered by search and category
        const filteredNews = computed(() => {
            return newsItems.value.filter((item) => {
                const q = searchQuery.value.toLowerCase();
                const matchesQuery =
                    item.title.toLowerCase().includes(q) ||
                    item.content.toLowerCase().includes(q) ||
                    item.category.toLowerCase().includes(q)

                const matchesCategory =
                    selectedCategory.value === "All" || item.category === selectedCategory.value;

                return matchesQuery && matchesCategory;
            });
        });

        const totalPages = computed(() =>
            Math.ceil(filteredNews.value.length / itemsPerPage)
        );

        const paginatedNews = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            return filteredNews.value.slice(start, start + itemsPerPage);
        });

        const changePage = (page) => {
            if (page >= 1 && page <= totalPages.value) {
                currentPage.value = page;
            }
        };

        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            return date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        };

        watch([searchQuery, selectedCategory], () => {
            currentPage.value = 1;
        });

        return {
            searchQuery,
            selectedCategory,
            currentPage,
            totalPages,
            paginatedNews,
            changePage,
            formatDate,
            allCategories,
        };
    }
};
</script>

<style scoped>
.card-title {
    font-weight: bold;
}

.card-subtitle {
    font-size: 0.9rem;
}

.badge {
    font-size: 0.85rem;
}

.pagination .page-item.disabled .page-link {
    pointer-events: none;
}
</style>
