import React, {useState} from 'react';
import './index.css';
import { RiArrowRightLine } from 'react-icons/ri';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate } from "react-router-dom"

const MovieRow = ({title, itens}) => {
    const navigate = useNavigate()
    const [scrollX, setScrollX] = useState(0);
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0) {
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let totalList = itens.results.length * 150;
        if((window.innerWidth - totalList) > x){
            x = (window.innerWidth - totalList) - 60;
        }
        setScrollX(x)
    }

    const toMovie = (id) => {
        navigate(`/movie/${id}`)
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--arrowLeft" onClick={handleLeftArrow}>
                <RiArrowRightLine style={{fontSize: 50}} />
            </div>
            <div className="movieRow--arrowRight" onClick={handleRightArrow}>
                <RiArrowLeftLine style={{fontSize: 50}} />
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: itens.results.length * 150
                }}>
                    {itens.results.length > 0 && itens.results.map((item,key) => (
                        <div key={key} className="movieRow--item" onClick={() => toMovie(item.id)} >
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />                            
                        </div>                        
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieRow