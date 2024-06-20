import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthContext"
import {
  BsFillCalendarDateFill,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import "./index.css";

const moviesURL = 'https://api.themoviedb.org/3/movie/';
const apiKey = '88e4d334c4c27155e9da9847ae68cf9b';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [favorito, setFavorito] = useState(false);
  const [depois, setDepois] = useState(false);
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const getMovie = async (url) => {
    try {
      const res = await fetch(url);
      console.log(res.status)
      const data = await res.json();
      if(res.status != 200){
        navigate('/404')
      }
      setMovie(data);
    } catch (error) {
      navigate('/404')
    }
  };

  const getRegistro = async () => {
    const registros = await auth.getRegistro(id, auth.user.id)
    const data = JSON.parse(registros)
    if(data.length >= 1){ 
      setFavorito(data[0].favorite)
      setDepois(data[0].watch_later)
    }
    
  }

  const formatDate = (data) => {
    var ano  = data.split("-")[0];
    var mes  = data.split("-")[1];
    var dia  = data.split("-")[2];
  
    return dia+'/'+mes+'/'+ano
  }

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?language=pt-BR&api_key=${apiKey}`;
    getMovie(movieUrl);
    getRegistro();
  }, []);

  const handleClickFav = async () => {
    setFavorito(prevClicked => !prevClicked)
    const favoritar = await auth.registrar(id, auth.user.id, !favorito, 'favorito')
    const data = JSON.parse(favoritar) 
    if (favorito === true){
      setFavorito(false)
    } else {
      setFavorito(true)
    }
    
  };

  const handleClickDepois = async () => {
    const favoritar = await auth.registrar(id, auth.user.id, !depois, 'later')
    const data = JSON.parse(favoritar)     
    setDepois(!depois); // Alterna entre true e false
  };


  return (
    <div className="movie-page">
      {movie && (
        
        <>
          <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title} />
            <button
              className={`custom-button ${favorito ? 'clicked' : ''}`}
              onClick={handleClickFav}
            >
              {favorito ? 'Favoritado' : '+ Favoritar'}
            </button>
            <button
              className={`custom-button ${depois ? 'clicked' : ''}`}
              onClick={handleClickDepois}
            >
              {depois ? 'Assistir depois' : '+ Assistir depois'}
            </button>
          </div>        
          <p className="tagline">{movie.title}</p>
          <div className="info">
            <h3>
              <BsFillCalendarDateFill /> Lançamento:
            </h3>
            <p>Data de lançamento {formatDate(movie.release_date)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;