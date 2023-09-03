<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3" v-for="comic in comics" :key="comic.id">
                <router-link :to="'/comics/' + comic.id">
                    <div class="card bg-dark text-white mb-3">
                        <img class="card-img" :src="comic.thumbnailUrl" :alt="comic.title" />
                        <div class="card-img-overlay">
                            <h5 class="card-title">{{ comic.title }}</h5>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>

    <div v-if="comics.length === 0">
        <p>No se encontraron cómics.</p>
    </div>

    <div class="pagination container">
        <button @click="loadPage(page)" v-for="page in visiblePageNumbers" :key="page"
            :class="{ 'pagination-button': true, 'active': page === currentPage }">
            {{ page }}
        </button>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAllComics } from '@/api/api.js';

export default {
    name: 'AllComics',
    data() {
        return {
            comics: [],
            offset: 0,
            limit: 20,
            totalComics: 0,
            currentPage: 1,
            maxVisiblePages: 9,
        };
    },
    computed: {
        pageCount() {
            return Math.ceil(this.totalComics / this.limit);
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
        await this.loadAllComics();
    },
    methods: {
        async loadAllComics() {
            try {
                const response = await getAllComics(this.offset, this.limit);
                const newComics = response.data.results.map((comic) => ({
                    id: comic.id,
                    title: comic.title,
                    thumbnailUrl: comic.thumbnail ? `${comic.thumbnail.path}.${comic.thumbnail.extension}` : null,
                }));
                this.totalComics = response.data.total;
                this.comics = newComics;
            } catch (error) {
                console.error('Error al cargar los cómics:', error);
            }
        },
        async loadPage(page) {
            if (page > 0 && page <= this.pageCount) {
                this.currentPage = page;
                this.offset = (page - 1) * this.limit;
                await this.loadAllComics();
            }
        },
    },
};
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    background-color: #fff;
}

.card img {
    max-width: 100%;
}

.card-body {
    text-align: center;
}

.card-title {
    font-weight: bold;
}

.pagination {
    margin-top: 20px;
    text-align: justify;
    justify-content: center;
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

.container {
    text-align: center;
    margin-top: 20px;
}
</style>
