<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-3" v-for="serie in currentSeries" :key="serie.id">
                    <div class="card bg-dark text-white mb-3">
                        <img class="card-img" :src="serie.thumbnail" :alt="serie.title" />
                        <div class="card-img-overlay">
                            <h5 class="card-title">{{ serie.title }}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="currentSeries.length === 0">
            <p>No se encontraron series.</p>
        </div>

        <div class="pagination container">
            <button @click="loadPage(page)" v-for="page in visiblePageNumbers" :key="page"
                :class="{ 'pagination-button': true, 'active': page === currentPage }">
                {{ page }}
            </button>
        </div>
    </div>
</template>

<script>
import { getAllSeriesList } from '@/api/api.js';

export default {
    name: "AllSeries",
    data() {
        return {
            series: [],
            currentSeries: [],
            offset: 0,
            limit: 20,
            totalSeries: 0,
            currentPage: 1,
            maxVisiblePages: 9,
        };
    },
    computed: {
        pageCount() {
            return Math.ceil(this.totalSeries / this.limit);
        },
        visiblePageNumbers() {
            const currentPage = this.currentPage;
            const maxVisiblePages = this.maxVisiblePages;
            const pageCount = this.pageCount;
            const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
            let startPage = Math.max(currentPage - halfMaxVisiblePages, 1);
            let endPage = Math.min(startPage + maxVisiblePages - 1, pageCount);

            if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(endPage - maxVisiblePages + 1, 1);
            }

            const visiblePages = [];
            for (let page = startPage; page <= endPage; page++) {
                visiblePages.push(page);
            }
            return visiblePages;
        },
    },
    async mounted() {
        await this.loadAllSeries();
    },
    methods: {
        async loadAllSeries() {
            try {
                const response = await getAllSeriesList(this.offset, this.limit);
                const newSeries = response.data.results.map((serie) => ({
                    id: serie.id,
                    title: serie.title,
                    thumbnail: `${serie.thumbnail.path}.${serie.thumbnail.extension}`,
                }));
                this.totalSeries = response.data.total;
                this.series = newSeries;
                this.updateCurrentSeries();
            } catch (error) {
                console.error("Error al cargar las series:", error);
            }
        },
        updateCurrentSeries() {
            const startIndex = (this.currentPage - 1) * this.limit;
            const endIndex = startIndex + this.limit;
            this.currentSeries = this.series.slice(startIndex, endIndex);
        },
        async loadPage(page) {
            if (page > 0 && page <= this.pageCount) {
                this.currentPage = page;
                this.updateCurrentSeries();
            }
        },
    },
};
</script>

<style scoped>
.card-custom {
    margin-bottom: 1px;
}

.pagination {
    margin-top: 20px;
    text-align: justify;
    justify-content: center;
}

.pagination button {
    margin-right: 5px;
    cursor: pointer;
}

.container {
    text-align: center;
    margin-top: 20px;
}

.pagination-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
    cursor: pointer;
}

.pagination-button.active {
    background-color: #555;
}

.pagination-button:hover {
    background-color: #0056b3;
}
</style>
