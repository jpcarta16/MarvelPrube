<template>
    <div>
        <h1>{{ character.name }}</h1>
        <div>
            <img :src="character.thumbnail.path + '.' + character.thumbnail.extension" :alt="character.name" />
        </div>
        <div>
            <h2>Descripción</h2>
            <p v-if="character.description">{{ character.description }}</p>
            <p v-else>No hay descripción disponible.</p>
        </div>

        <!-- Cómics en los que aparece -->
        <div>
            <h2>Cómics en los que aparece</h2>
            <ul>
                <li v-for="comic in comics" :key="comic.id">
                    <!-- Enlace a la vista de detalles del cómic -->
                    <router-link :to="'/comic/' + comic.id">{{ comic.title }}</router-link>
                </li>
            </ul>
        </div>

        <!-- Series en las que aparece -->
        <div>
            <h2>Series en las que aparece</h2>
            <ul>
                <li v-for="serie in series" :key="serie.id">
                    <!-- Enlace a la vista de detalles de la serie -->
                    <router-link :to="'/serie/' + serie.id">{{ serie.title }}</router-link>
                </li>
            </ul>
        </div>

        <!-- Manejo de errores -->
        <div v-if="error">
            <p>{{ error }}</p>
        </div>

        <!-- Botón de retorno al personaje -->
        <router-link to="/character">Volver al personaje</router-link>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getCharacters } from '@/api/api.js';

export default {
    props: {
        character: Object,
        comics: Array,
        series: Array,
    },
    data() {
        return {
            error: null, // Variable para almacenar mensajes de error
            characters: [], // Aquí almacenaremos los personajes
        };
    },
    // Agrega un watcher para manejar errores
    watch: {
        character() {
            this.error = null; // Reinicia el mensaje de error
        },
        comics() {
            this.error = null; // Reinicia el mensaje de error
        },
        series() {
            this.error = null; // Reinicia el mensaje de error
        },
    },
    // Llama a getCharacters cuando el componente se monta
    async mounted() {
        try {
            const charactersData = await getCharacters();
            this.characters = charactersData;
        } catch (error) {
            this.error = 'Error al cargar los personajes.';
            console.error('Error al cargar los personajes:', error);
        }
    },
};
</script>

<style scoped>
/* Estilos específicos para este componente */
h1 {
    font-size: 24px;
    color: #333;
}

/* Agrega más estilos según sea necesario */
</style>
