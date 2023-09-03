<template>
    <div class="character-details">
        <h1>{{ character.name }}</h1>
        <div class="character-image">
            <img :src="character.thumbnail ? character.thumbnail.path + '.' + character.thumbnail.extension : ''"
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
                <li v-for="comic in paginatedComics" :key="comic.id">
                    <router-link :to="'/comic/' + comic.id">{{ comic.title }}</router-link>
                </li>
            </ul>
            <div class="pagination">
                <button @click="changePage('prevComics')" :disabled="currentPageComics === 1">
                    Anterior
                </button>
                <button @click="changePage('nextComics')" :disabled="currentPageComics === pageCountComics">
                    Siguiente
                </button>
            </div>
        </div>
        <div class="character-series">
            <h2>Series en las que aparece</h2>
            <ul>
                <li v-for="serie in paginatedSeries" :key="serie.id">
                    <router-link :to="'/serie/' + serie.id">{{ serie.title }}</router-link>
                </li>
            </ul>
            <div class="pagination">
                <button @click="changePage('prevSeries')" :disabled="currentPageSeries === 1">
                    Anterior
                </button>
                <button @click="changePage('nextSeries')" :disabled="currentPageSeries === pageCountSeries">
                    Siguiente
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, toRefs, computed } from 'vue';
import { getCharacter, getCharacterComics, getCharacterSeries } from '@/api/api.js';

export default {
    props: {
        characterId: Number,
    },
    setup(props) {
        const { characterId } = toRefs(props);
        const character = ref({});
        const comics = ref([]);
        const series = ref([]);
        const currentPageComics = ref(1);
        const currentPageSeries = ref(1);
        const itemsPerPage = 20; // Cantidad de elementos por página

        onMounted(async () => {
            try {
                const characterData = await getCharacter(characterId.value);
                character.value = characterData;

                const comicsData = await getCharacterComics(characterId.value);
                comics.value = comicsData;

                const seriesData = await getCharacterSeries(characterId.value);
                series.value = seriesData;
            } catch (error) {
                console.error('Error al cargar los detalles del personaje:', error);
            }
        });

        const changePage = (section, direction) => {
            const currentPage = section === 'comics' ? currentPageComics : currentPageSeries;
            const pageCount = section === 'comics' ? pageCountComics.value : pageCountSeries.value;

            if (direction === 'prev') {
                if (currentPage.value > 1) {
                    currentPage.value--;
                }
            } else if (direction === 'next') {
                if (currentPage.value < pageCount) {
                    currentPage.value++;
                }
            }
        };

        const pageCountComics = computed(() => Math.ceil(comics.value.length / itemsPerPage));
        const pageCountSeries = computed(() => Math.ceil(series.value.length / itemsPerPage));

        const paginatedComics = computed(() => {
            const startIndex = (currentPageComics.value - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return comics.value.slice(startIndex, endIndex);
        });

        const paginatedSeries = computed(() => {
            const startIndex = (currentPageSeries.value - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return series.value.slice(startIndex, endIndex);
        });

        return {
            character,
            comics,
            series,
            currentPageComics,
            currentPageSeries,
            changePage,
            pageCountComics,
            pageCountSeries,
            paginatedComics,
            paginatedSeries,
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
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.pagination button {
    margin: 0 5px;
    cursor: pointer;
}

.pagination button:disabled {
    cursor: not-allowed;
}
</style>
