<template>
    <div class="container">
        <header class="header">
            <h1>Bienvenido Marvel fan Page</h1>
            <p>Explora y descubre información sobre tus personajes, cómics y series favoritas de Marvel.</p>
        </header>

        <!-- Barra de búsqueda -->
        <div class="search-bar">
            <input type="text" v-model="searchQuery" @input="search" placeholder="Buscar...">
        </div>

        <!-- Resultados de la búsqueda -->
        <div class="search-results">
            <!-- Resultados de Personajes -->
            <div v-if="searchResults.characters.length > 0">
                <h2>Resultados de Personajes</h2>
                <div class="row">
                    <div v-for="character in searchResults.characters" :key="character.id" class="col-md-3 mb-4">
                        <router-link :to="'/character/' + character.id">
                            <div class="card">
                                <img v-if="character.thumbnailUrl" :src="character.thumbnailUrl" :alt="character.name"
                                    class="card-img-top" />
                                <div class="card-body">
                                    <h5 class="card-title">{{ character.name }}</h5>
                                    <!-- Agrega cualquier otra información que desees mostrar en la tarjeta -->
                                </div>
                                <!-- Agrega un enlace en el botón si es necesario -->
                                <div class="card-footer text-muted">
                                    <!-- Puedes mostrar la fecha u otra información aquí -->
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
                const query = searchQuery.value.trim(); // Obtén la consulta de búsqueda sin espacios en blanco

                // Utiliza tus funciones de API para obtener los resultados
                const characterResults = await searchCharactersByName(query);
                const comicResults = await searchComicsByTitle(query);
                const seriesResults = await searchSeriesByTitle(query);

                // Actualiza searchResults con los resultados de la búsqueda
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

                // Agregar la información de la imagen (thumbnail) a cada personaje
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
/* Estilos para la pantalla principal */
.header {
    text-align: center;
    background-color: #333;
    color: #fff;
    padding: 20px;
}

.search-bar {
    text-align: center;
    margin-top: 20px;
}

.search-bar input {
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.search-results {
    margin-top: 20px;
}

.search-results h2 {
    margin-top: 20px;
}

/* Estilos para las tarjetas de personajes */
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

/* Agrega más estilos según tus necesidades */
</style>
