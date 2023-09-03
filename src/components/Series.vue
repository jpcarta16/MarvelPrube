<template>
    <div>
        <h1>{{ serie.title }}</h1>
        <div>
            <img :src="serie.thumbnail.path + '.' + serie.thumbnail.extension" :alt="serie.title" />
        </div>
        <div>
            <h2>Descripción</h2>
            <p v-if="serie.description">{{ serie.description }}</p>
            <p v-else>No hay descripción disponible.</p>
        </div>
        <div>
            <h2>Personajes en esta serie</h2>
            <ul>
                <li v-for="character in characters" :key="character.id">
                    <!-- Enlace a la vista de detalles del personaje -->
                    <router-link :to="'/character/' + character.id">{{ character.name }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getSeries, getSeriesCharacters } from '@/api/api.js'; // Asegúrate de importar las funciones necesarias

export default {
    props: {
        serieId: Number, // Debe recibir el ID de la serie
    },
    setup(props) {
        const serie = ref({});
        const characters = ref([]);

        onMounted(async () => {
            try {
                // Obtener los detalles de la serie
                const serieData = await getSeries(props.serieId);
                serie.value = serieData;

                // Obtener los personajes en esta serie
                const charactersData = await getSeriesCharacters(props.serieId);
                characters.value = charactersData;
            } catch (error) {
                console.error('Error al cargar los detalles de la serie:', error);
            }
        });

        return {
            serie,
            characters,
        };
    },
};
</script>

<style scoped>
/* Estilos específicos para este componente */
</style>
