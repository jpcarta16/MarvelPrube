<template>
    <div class="container">
        <header class="header">
            <h1 class="title">Bienvenido a Marvel Fan Page</h1>
            <p class="subtitle">Explora y descubre información sobre tus personajes, cómics y series favoritas de Marvel.
            </p>
        </header>

        <div class="search-bar">
            <input type="text" v-model="searchQuery" @input="search" placeholder="Busca tu Personaje...">
        </div>

        <div class="search-results">
            <div v-if="searchResults.characters.length > 0">
                <h2 class="section-title">Resultados de Personajes</h2>
                <div class="row">
                    <div v-for="character in searchResults.characters" :key="character.id" class="col-md-3 mb-4">
                        <router-link :to="'/character/' + character.id">
                            <div class="card">
                                <img v-if="character.thumbnailUrl" :src="character.thumbnailUrl" :alt="character.name"
                                    class="card-img-top" style="max-width: 100%; height: auto;" />
                                <div class="card-body">
                                    <h5 class="card-title">{{ character.name }}</h5>
                                </div>
                                <div class="card-footer text-muted">
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {
    getCharacters,
    searchCharactersByName,
    searchComicsByTitle,
    searchSeriesByTitle,
} from '@/api/api.js';

export default {
    props: {
        characters: Array,
    },
    setup() {
        const characters = ref([]);
        const searchQuery = ref('');
        const searchResults = ref({ characters: [], comics: [], series: [] });


        const search = async () => {
            try {
                const query = searchQuery.value.trim();

                const characterResults = await searchCharactersByName(query);
                const comicResults = await searchComicsByTitle(query);
                const seriesResults = await searchSeriesByTitle(query);

                searchResults.value = {
                    characters: characterResults.map((character) => {
                        return {
                            ...character,
                            thumbnailUrl: character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : null,
                        };
                    }),
                    comics: comicResults,
                    series: seriesResults,
                };
            } catch (error) {
                console.error('Error en la búsqueda:', error);
            }
        };

        onMounted(async () => {
            try {
                const data = await getCharacters();

                characters.value = data.map((character) => {
                    return {
                        ...character,
                        thumbnailUrl: character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : null,
                    };
                });
            } catch (error) {
                console.error('Error al cargar la lista de personajes:', error);
            }
        });

        return {
            searchQuery,
            searchResults,
            search,
        };
    },
};
</script>

<style scoped>
.header {
    text-align: center;
    color: #333;
    padding: 20px;
}

.title {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 10px;
}

.subtitle {
    font-size: 18px;
    color: #ccc;
    margin-bottom: 20px;
}

.search-bar {
    background: black;
    padding: 16px 32px;
    color: #FFF;
    font-size: 24px;
    font-weight: bold;
    position: relative;
    border-radius: 12px;
}

.search-bar::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, red, blue, deeppink, blue, red, blue, deeppink, blue);
    background-size: 800%;
    border-radius: 10px;
    filter: blur(8px);
    animation: glowing 20s linear infinite;
}

@keyframes glowing {
    0% {
        background-position: 0 0;
    }

    50% {
        background-position: 400% 0;
    }

    100% {
        background-position: 0 0;
    }
}

.search-results {
    margin-top: 20px;
}

.section-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
}

.card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-4px);
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
</style>
