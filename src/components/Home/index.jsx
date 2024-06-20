import React, {useContext, useEffect, useState} from 'react';
import './index.css';
import Tmdb from '../../../Tmdb';
import MovieRow from '../MovieRow';
import FeaturedMovie from '../FeaturedMovie';
import { AuthContext } from '../../contexts/Auth/AuthContext';



const moviesURL = 'https://api.themoviedb.org/3/movie/';
const apiKey = '88e4d334c4c27155e9da9847ae68cf9b';

const Home = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [movieRegistrados, setMovieRegistrados] = useState([]);
  const auth = useContext(AuthContext)

  

  const mergeArrays = () => {
    const mergedArray = [...movieList, ...movieRegistrados];
   
    setMovieList(mergedArray);
  };

  useEffect(() => {
    const loadAll = async () => {
      //pegando a lista dos filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegando o destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);

      const registros = await auth.getAllRegistros(auth.user.id)
      const data = JSON.parse(registros)
      try{
        const items = await Promise.all(
          data.map(async (item) => {
            const response = await fetch(`${moviesURL}${item.movie_id}?language=pt-BR&api_key=${apiKey}`);
            return response.json();
          })
        );
        setMovieRegistrados([{slug: 'favoritos', title: 'Favoritos / Quero assistir', items: {results: items}}])
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }

    //const getAllRegistros = async () => {    }

    loadAll();
    //getAllRegistros()
  }, []);

  return (
    <div className="page">  
      {featuredData && 
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieRegistrados.map((item, key) => (          
          <div>
            <MovieRow key={key} title={item.title} itens={item.items}/>
          </div>
        ))}
        {movieList.map((item, key) => (          
          <div>
            <MovieRow key={key} title={item.title} itens={item.items}/>
          </div>
        ))}
      </section>

      <footer>
        VivoFlix -- Matheus D.
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando"/>
        </div>
      }
    </div>
  )
}

export default Home