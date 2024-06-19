import React, {useEffect, useState} from 'react';
import './index.css';
import Tmdb from '../../../Tmdb';
import MovieRow from '../MovieRow';
import FeaturedMovie from '../FeaturedMovie';


const Home = () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

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
    }

    loadAll();
  }, []);

  return (
    <div className="page">  
      {featuredData && 
        <FeaturedMovie item={featuredData}/>
      }
      <section className="lists">
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