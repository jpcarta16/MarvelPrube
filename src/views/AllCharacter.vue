<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-3" v-for="character in characters" :key="character.id">
                    <router-link :to="'/character/' + character.id" class="nav-link">
                        <div class="card bg-dark text-white mb-3">
                            <img class="card-img" :src="character.thumbnail" :alt="character.name" />
                            <div class="card-img-overlay">
                                <h5 class="card-title">{{ character.name }}</h5>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <div v-if="characters.length === 0">
            <p>No se encontraron personajes.</p>
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
import { getAllCharacters } from "@/api/api.js";

export default {
    name: "AllCharacter",
    data() {
        return {
            characters: [],
            offset: 0,
            limit: 20,
            totalCharacters: 0,
            currentPage: 1,
            maxVisiblePages: 9,
        };
    },
    computed: {
        pageCount() {
            return Math.ceil(this.totalCharacters / this.limit);
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
        await this.loadAllCharacters();
    },
    methods: {
        async loadAllCharacters() {
            try {
                const response = await getAllCharacters(this.offset, this.limit);
                const newCharacters = response.data.results.map((character) => ({
                    id: character.id,
                    name: character.name,
                    thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
                }));
                this.totalCharacters = response.data.total; // Almacena el total de personajes
                this.characters = newCharacters;
            } catch (error) {
                console.error("Error al cargar los personajes:", error);
            }
        },
        async loadPage(page) {
            if (page > 0 && page <= this.pageCount) {
                this.currentPage = page;
                this.offset = (page - 1) * this.limit;
                await this.loadAllCharacters();
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
