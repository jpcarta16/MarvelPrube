<template>
    <div class="container">
        <h1>Todos los Comics</h1>
        <ul class="comic-list">
            <li v-for="comic in comics" :key="comic.id" class="comic-item">
                <div class="comic-details">
                    <h5 class="comic-title">{{ comic.title }}</h5>
                </div>
            </li>
        </ul>

        <div v-if="comics.length === 0">
            <p>No se encontraron comics.</p>
        </div>

        <div class="pagination-container">
            <button @click="loadPage(page)" v-for="page in visiblePageNumbers" :key="page"
                :class="{ 'pagination-button': true, 'active': page === currentPage }">
                {{ page }}
            </button>
        </div>
    </div>
</template>

<script>
import { getAllComicsList } from "@/api/api.js";

export default {
    name: "AllComics",
    data() {
        return {
            comics: [],
            offset: 0,
            limit: 20,
            totalComics: 0,
            currentPage: 1,
            maxVisiblePages: 9,
            orderBy: 'title', // Agregamos un nuevo dato para controlar el orden por título
        };
    },
    computed: {
        pageCount() {
            return Math.ceil(this.totalComics / this.limit);
        },
        visiblePageNumbers() {
            const maxVisiblePages = this.maxVisiblePages;
            const pageCount = this.pageCount;
            const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
            let startPage = Math.max(this.currentPage - halfMaxVisiblePages, 1);
            let endPage = Math.min(startPage + maxVisiblePages - 1, pageCount);
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);

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
                const response = await getAllComicsList(this.offset, this.limit, this.orderBy); // Usamos el valor de orderBy para ordenar los cómics
                const newComics = response.data.results.map((comic) => {
                    return {
                        id: comic.id,
                        title: comic.title,
                    };
                });
                this.totalComics = response.data.total;
                this.comics = newComics;
            } catch (error) {
                console.error("Error al cargar los cómics:", error);
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
.container {
    text-align: center;
}

.comic-list {
    list-style-type: none;
    padding: 0;
}

.comic-item {
    border: 1px solid #ddd;
    margin-bottom: 20px;
    padding: 10px;
    display: flex;
    align-items: center;
}

.comic-details {
    flex: 1;
}

.comic-title {
    font-size: 18px;
    margin: 0;
    color: #007bff;
    /* Cambia el color de las letras a azul */
}

.pagination-container {
    margin-top: 20px;
    text-align: center;
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
