import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Tmdb from '../../../Tmdb';
import { RiArrowRightLine } from 'react-icons/ri';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate } from "react-router-dom"
import "../MovieRow/index.css"

const Search = () => {
    const [searchParams] = useSearchParams()
    const [movie, setMovie] = useState([])
    const query = searchParams.get("q")
    const navigate = useNavigate()
    const [scrollX, setScrollX] = useState(0);

    useEffect(() => {
        const loadAll = async () => {
          //pegando a lista dos filmes
          let movieSearch = await Tmdb.getMovieSearch(query);
          setMovie(movieSearch.results);
        }
    
        loadAll();
    }, [query]);

    const toMovie = (id) => {
        navigate(`/movie/${id}`)
    }

    return (
        <div className="movieRow">
            <h2>Resultados para a busca: {query}</h2>           
            <div className="movieRow--listarea">
                <div className="movieRow--list">
                    {movie && movie.length > 0 && movie.map((item,key) => (
                        <div key={key} className="movieRow--item" onClick={() => toMovie(item.id)} >
                            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.original_title} />
                        </div>                        
                    ))}
                </div>               
            </div>
        </div>
    )
}

export default Search