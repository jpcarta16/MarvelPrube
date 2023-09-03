<template>
    <div class="character-details">
        <h1>{{ character.name }}</h1>
        <div class="character-image">
            <img :src="character.thumbnail ? (character.thumbnail.path + '.' + character.thumbnail.extension) : ''"
                :alt="character.name" />
        </div>
        <div class="character-description">
            <h2>Descripción</h2>
            <p v-if="character.description">{{ character.description }}</p>
            <p v-else>No hay descripción disponible.</p>
        </div>
        <div class="character-comics">
            <h2>Comics en los que aparece</h2>
            <ul>
                <li v-for="comic in comics" :key="comic.id">
                    <router-link :to="'/comic/' + comic.id">{{ comic.title }}</router-link>
                </li>
            </ul>
        </div>
        <div class="character-series">
            <h2>Series en las que aparece</h2>
            <ul>
                <li v-for="serie in series" :key="serie.id">
                    <router-link :to="'/serie/' + serie.id">{{ serie.title }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, toRefs } from 'vue';
import { getCharacter, getCharacterComics, getCharacterSeries } from '@/api/api.js';

export default {
    props: {
        characterId: Number,
    },
    setup(props) {
        const { characterId } = toRefs(props); // Usa toRefs para desestructurar los props
        const character = ref({});
        const comics = ref([]);
        const series = ref([]);

        onMounted(async () => {
            try {
                console.log('Character ID:', characterId.value); // Verifica el ID del personaje
                // Obtener los detalles del personaje
                const characterData = await getCharacter(characterId.value);
                console.log('Character Data:', characterData); // Verifica los datos del personaje
                character.value = characterData;

                // Obtener los cómics en los que aparece el personaje
                const comicsData = await getCharacterComics(characterId.value);
                comics.value = comicsData;

                // Obtener las series en las que aparece el personaje
                const seriesData = await getCharacterSeries(characterId.value);
                series.value = seriesData;
            } catch (error) {
                console.error('Error al cargar los detalles del personaje:', error);
            }
        });

        return {
            character,
            comics,
            series,
        };
    },
};
</script>

<style scoped>
.character-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.character-image img {
    max-width: 300px;
    /* Ajusta el tamaño máximo de la imagen según tus necesidades */
}

/* Agrega estilos adicionales según tus preferencias */
</style>