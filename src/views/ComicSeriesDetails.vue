<template>
    <div>
        <header>
            <h1>{{ isComic ? 'Detalles del Cómic' : 'Detalles de la Serie' }}</h1>
        </header>

        <div v-if="comic || serie">
            <h2>
                {{ isComic ? (comic ? comic.title : 'Cargando...') : (serie ? serie.title : 'Cargando...') }}
            </h2>
            <p>
                {{ isComic ? (comic ? comic.description : 'Cargando...') : (serie ? serie.description : 'Cargando...') }}
            </p>
            <router-link :to="`/${isComic ? 'comic' : 'serie'}/${itemId}`">Volver</router-link>
        </div>

        <div v-else>
            <p>Cargando detalles...</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getComic, getSeries } from '@/api/api.js';

export default {
    props: {
        isComic: Boolean,
        itemId: String,
    },
    setup(props) {
        const comic = ref(null);
        const serie = ref(null);

        const loadComicSeriesDetails = async () => {
            try {
                if (props.isComic) {
                    comic.value = await getComic(props.itemId);
                    console.log('Comic Data:', comic.value);
                } else {
                    serie.value = await getSeries(props.itemId);
                    console.log('Series Data:', serie.value);
                }
            } catch (error) {
                console.error('Error al cargar los detalles:', error);
            }
        };

        onMounted(() => {
            loadComicSeriesDetails();
        });

        return {
            comic,
            serie,
        };
    },
};
</script>

<style scoped></style>
