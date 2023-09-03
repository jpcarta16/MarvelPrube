import HomeView from '@/views/HomeView.vue';
import CharacterDetails from '@/views/CharacterDetails.vue';
import ComicSeriesDetails from '@/views/ComicSeriesDetails.vue';
import Character from '@/views/AllCharacter.vue';
import AllComics from '@/views/AllComics.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
    },
    {
        path: '/character/:characterId',
        name: 'CharacterDetails',
        component: CharacterDetails,
        props: (route) => ({
            characterId: parseInt(route.params.characterId),
        }),
    },
    {
        path: '/comic/:id',
        name: 'ComicSeriesDetails',
        component: ComicSeriesDetails,
        props: true,
    },
    {
        path: '/allcomics',
        name: 'AllComics',
        component: AllComics,
    },
    {
        path: '/allcharacters',
        name: 'allCharacter',
        component: Character,
    },
];

export default routes;
