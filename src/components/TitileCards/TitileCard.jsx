import {useRef,useEffect, useState} from 'react'
import './TitileCard.css'
import { Link } from 'react-router-dom';
// import cards_data from '../../assets/cards/Cards_data'


const TitileCard = ({title, category}) => {

  const [apiData, setApiData] = useState([])

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTBjNTFlMDE4ZWRjYjU3YzVhMGJmYzFlOTUzOWIzMCIsIm5iZiI6MTcxOTU3ODE1Ni4xNjA4ODksInN1YiI6IjY2N2VhYzUzYTYwNmM1M2Y1MjZlNTc2ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4J6OVzwL-mGXIQ3RYjUOtBt4JA1DlOwRs6V_zTIz0qE'
    }
  };
  
   
  const cardsref = useRef();
  const handleWheel = (event) =>{
  event.preventDefault();
  cardsref.current.scrollLeft += event.deltaY;
  }
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing" }?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsref.current.addEventListener('wheel', handleWheel);
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref = {cardsref}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key = {index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.original_title} className="card-img" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitileCard
