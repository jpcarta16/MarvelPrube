import axios from 'axios';
import { MARVEL_PUBLIC_KEY, MARVEL_PRIVATE_KEY } from '@/config';
import CryptoJS from 'crypto-js';

// Función para calcular el hash MD5
const generateHash = () => {
    const timestamp = Date.now(); // Obtener la marca de tiempo actual
    const privateKey = MARVEL_PRIVATE_KEY; // Clave privada de Marvel
    const publicKey = MARVEL_PUBLIC_KEY; // Clave pública de Marvel

    const hashInput = `${timestamp}${privateKey}${publicKey}`; // Combinar timestamp y claves
    return CryptoJS.MD5(hashInput).toString(); // Calcular el hash MD5 y convertirlo a cadena
};

// Función para obtener todos los personajes
export async function getAllCharacters(offset, limit) {
    try {
        const timestamp = Date.now();
        const publicKey = MARVEL_PUBLIC_KEY;
        const hash = generateHash();

        // Realizar una solicitud GET a la API de Marvel para obtener la lista de personajes
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&offset=${offset}&limit=${limit}`
        );

        return response.data; // Retornar la respuesta de la API
    } catch (error) {
        console.error('Error al obtener la lista de personajes:', error); // Manejo de errores
        throw error; // Lanzar el error para que se maneje en otro lugar
    }
}

// Función para obtener una lista de personajes
export const getCharacters = async () => {
    try {
        const timestamp = Date.now();
        const publicKey = MARVEL_PUBLIC_KEY;
        const hash = generateHash();

        // Realizar una solicitud GET a la API de Marvel para obtener la lista de personajes
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );

        // Mapear los resultados para obtener información específica de cada personaje
        const characters = response.data.data.results.map((character) => {
            return {
                id: character.id,
                name: character.name,
                thumbnail: character.thumbnail, // Agregar información de la imagen
            };
        });

        return characters; // Retornar la lista de personajes
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
        console.log('URL de la API:', url); // Agregar esta línea para verificar la URL

        const response = await axios.get(url);
        console.log('Respuesta de la API:', response.data); // Agregar esta línea para verificar la respuesta

        return response.data.data.results[0]; // Retornar el primer resultado
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

        return response.data.data.results; // Retornar los cómics en los que aparece el personaje
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

        return response.data.data.results; // Retornar las series en las que aparece el personaje
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

        // Realizar una solicitud GET para buscar personajes por nombre
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );

        return response.data.data.results; // Retornar la lista de personajes encontrados
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

        // Realizar una solicitud GET para buscar cómics por título
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${title}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );

        return response.data.data.results; // Retornar la lista de cómics encontrados
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

        // Realizar una solicitud GET para buscar series por título
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/series?titleStartsWith=${title}&apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );

        return response.data.data.results; // Retornar la lista de series encontradas
    } catch (error) {
        console.error('Error al buscar series por título:', error);
        throw error;
    }
};

// Función para obtener los detalles de un cómic por su ID
export const getComic = async (comicId) => {
    try {
        const publicKey = MARVEL_PUBLIC_KEY;

        // Realizar una solicitud GET a la API de Marvel para obtener los detalles del cómic
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/comics/${comicId}?apikey=${publicKey}`
        );

        // Verificar si la solicitud fue exitosa y retornar los detalles del cómic
        if (response && response.data && response.data.data && response.data.data.results) {
            return response.data.data.results[0];
        } else {
            throw new Error('No se encontraron detalles para el cómic.');
        }
    } catch (error) {
        console.error('Error al obtener los detalles del cómic:', error);
        throw error;
    }
}

// Función para obtener los detalles de una serie por su ID
export const getSeries = async (seriesId) => {
    try {
        const publicKey = MARVEL_PUBLIC_KEY;

        // Realizar una solicitud GET a la API de Marvel para obtener los detalles de la serie
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/series/${seriesId}?apikey=${publicKey}`
        );

        // Verificar si la solicitud fue exitosa y retornar los detalles de la serie
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

        // Realizar una solicitud GET a la API de Marvel para obtener la lista de cómics
        const response = await axios.get(
            `https://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&ts=${timestamp}&hash=${hash}&offset=${offset}&limit=${limit}`
        );

        return response.data; // Retornar la respuesta de la API
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

        return response.data; // Retornar la respuesta de la API
    } catch (error) {
        console.error('Error al obtener la lista de series:', error);
        throw error;
    }
};
