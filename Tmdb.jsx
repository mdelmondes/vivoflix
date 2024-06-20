import { useContext } from "react";
import { AuthContext } from "./src/contexts/Auth/AuthContext"


const API_KEY = '88e4d334c4c27155e9da9847ae68cf9b';
const API_BASE = 'https://api.themoviedb.org/3';
const API_BASE_SEARCH = 'https://api.themoviedb.org/3/search/movie';


const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}`);
  const json = await req.json();
  return json;
}

const basicSearch = async (endpoint) => {
  const req = await fetch(`${API_BASE_SEARCH}${endpoint}`);
  const json = await req.json();
  return json;
}



export default {
  getHomeList: async () => {
    return [
      {
        slug: 'toprated',
        title: 'Em alta',
        items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'trendigs',
        title: 'Recomendados',
        items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
      },      
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'documentary',
        title: 'Documentário',
        items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'drama',
        title: 'Drama',
        items: await basicFetch(`/discover/movie?with_genres=18&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'originals',
        title: 'Originais das plataformas',
        items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
      },
    ]
  },

  getMovieInfo: async (movieId, type) => {
    let info = {};
    if(movieId){
      switch(type) {
        case 'movie':
          info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
        break;
        default:
          info = null;
        break;
      }
    }

    return info;
  },

  getMovieSearch: async (query) => {
    let info = {};
    if(query){
      info = await basicSearch(`?language=pt-BR&api_key=${API_KEY}&query=${query}`);
    }

    return info;
  }
}