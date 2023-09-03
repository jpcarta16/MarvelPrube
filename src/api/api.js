import axios from 'axios';
import { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } from '@/config';
import CryptoJS from 'crypto-js';

// Función para calcular el hash MD5
const generateHash = () => {
    const timestamp = Date.now();
    const privateKey = MARVEL_PRIVATE_KEY;
    const publicKey = MARVEL_PUBLIC_KEY;

    const hashInput = `${timestamp}${privateKey}${publicKey}`;
    return CryptoJS.MD5(hashInput).toString();
};

// Función para obtener todos los personajes
export async function getAllCharacters(offset, limit) {
    try {
        const timestamp = Date.now();
        const publicKey = MARVEL_PUBLIC_KEY;
        const hash = generateHash();

        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&offset=${offset}&limit=${limit}`
        );
        return response.data;
    } catch (error) {
        console.error('Error al obtener la lista de personajes:', error);
        throw error;
    }
}


// Función para obtener una lista de personajes
export const getCharacters = async () => {
    try {
        const timestamp = Date.now();
        const publicKey = MARVEL_PUBLIC_KEY;
        const hash = generateHash();

        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );

        const characters = response.data.data.results.map((character) => {
            return {
                id: character.id,
                name: character.name,
                // Agrega la información de la imagen
                thumbnail: character.thumbnail,
            };
        });

        return characters;
    } catch (error) {
        console.error('Error al obtener la lista de personajes:', error);
        throw error;
    }
};

// Función para obtener los detalles de un personaje específico
export const getCharacter = async (characterId) => {
    try {
        const timestamp = Date.now();
        const publicKey = MARVEL_PUBLIC_KEY;
        const hash = generateHash();

        const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`;
        console.log('URL de la API:', url); // Agrega esta línea para verificar la URL

        const response = await axios.get(url);
        console.log('Respuesta de la API:', response.data); // Agrega esta línea para verificar la respuesta

        return response.data.data.results[0];
    } catch (error) {
        console.error('Error al cargar los detalles del personaje:', error);
        throw error;
    }
};

// Función para obtener los cómics en los que aparece un personaje
export const getCharacterComics = async (characterId) => {
    try {
        const timestamp = Date.now();
        const publicKey = MARVEL_PUBLIC_KEY;
        const hash = generateHash();

        const url = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`;
        const response = await axios.get(url);

        return response.data.data.results;
    } catch (error) {
        console.error('Error al obtener los cómics del personaje:', error);
        throw error;
    }
};

// Función para obtener las series en las que aparece un personaje
export const getCharacterSeries = async (characterId) => {
    try {
        const timestamp = Date.now();
        const publicKey = MARVEL_PUBLIC_KEY;
        const hash = generateHash();

        const url = `https://gateway.marvel.com/v1/public/characters/${characterId}/series?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`;
        const response = await axios.get(url);

        return response.data.data.results;
    } catch (error) {
        console.error('Error al obtener las series del personaje:', error);
        throw error;
    }
};

// Función para buscar personajes por nombre
export const searchCharactersByName = async (name) => {
    try {
        const timestamp = Date.now();
        const publicKey = MARVEL_PUBLIC_KEY;
        const hash = generateHash();
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );
        return response.data.data.results;
    } catch (error) {
        console.error('Error al buscar personajes por nombre:', error);
        throw error;
    }
};

// Función para buscar cómics por título
export const searchComicsByTitle = async (title) => {
    try {
        const timestamp = Date.now();
        const publicKey = MARVEL_PUBLIC_KEY;
        const hash = generateHash();
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${title}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );
        return response.data.data.results;
    } catch (error) {
        console.error('Error al buscar cómics por título:', error);
        throw error;
    }
};

// Función para buscar series por título
export const searchSeriesByTitle = async (title) => {
    try {
        const timestamp = Date.now();
        const publicKey = MARVEL_PUBLIC_KEY;
        const hash = generateHash();
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/series?titleStartsWith=${title}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );
        return response.data.data.results;
    } catch (error) {
        console.error('Error al buscar series por título:', error);
        throw error;
    }
};

// Función para obtener los detalles de un cómic por su ID
export const getComic = async (comicId) => {
    try {
        const publicKey = MARVEL_PUBLIC_KEY;

        // Realiza una solicitud GET a la API de Marvel para obtener los detalles del cómic
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/comics/${comicId}?apikey=${publicKey}`
        );

        // Verifica si la solicitud fue exitosa y retorna los detalles del cómic
        if (response && response.data && response.data.data && response.data.data.results) {
            return response.data.data.results[0];
        } else {
            throw new Error('No se encontraron detalles para el cómic.');
        }
    } catch (error) {
        console.error('Error al obtener los detalles del cómic:', error);
        throw error;
    }
};

// Función para obtener los detalles de una serie por su ID
export const getSeries = async (seriesId) => {
    try {
        const publicKey = MARVEL_PUBLIC_KEY;

        // Realiza una solicitud GET a la API de Marvel para obtener los detalles de la serie
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/series/${seriesId}?apikey=${publicKey}`
        );

        // Verifica si la solicitud fue exitosa y retorna los detalles de la serie
        if (response && response.data && response.data.data && response.data.data.results) {
            return response.data.data.results[0];
        } else {
            throw new Error('No se encontraron detalles para la serie.');
        }
    } catch (error) {
        console.error('Error al obtener los detalles de la serie:', error);
        throw error;
    }
};

// Función para obtener todos los cómics
export async function getAllComicsList(offset, limit) {
    try {
        const timestamp = Date.now();
        const publicKey = MARVEL_PUBLIC_KEY;
        const hash = generateHash();

        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&offset=${offset}&limit=${limit}`
        );

        return response.data;
    } catch (error) {
        console.error('Error al obtener la lista de cómics:', error);
        throw error;
    }
}

// Función para obtener la lista de todas las series de Marvel
export const getAllSeriesList = async (offset, limit) => {
    try {
        const timestamp = Date.now();
        const publicKey = MARVEL_PUBLIC_KEY;
        const hash = generateHash();

        const url = `https://gateway.marvel.com/v1/public/series?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&offset=${offset}&limit=${limit}`;
        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error al obtener la lista de series:', error);
        throw error;
    }
};

