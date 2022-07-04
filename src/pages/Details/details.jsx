import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from "../../network/axios";
import LanguageContext from '../../context/language';
import './details.css'


function Details(props) {
  const languageCtx = useContext(LanguageContext);
  const params = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    axiosInstance.get(`/movie/${params.id}`, {params: {language: languageCtx.lang}})
      .then((res) => {
        setMovieData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='container-fluid min-vh-100 bg-dark py-5 text-light'>
      <div className='row'>
        <img className='col-6' alt={movieData.title} src={movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}` : '/blank.png'} />
        <div className='col-6 text-start'>
          <h1 className='mb-5'>{movieData.title}</h1>
          <p className='text-primary'>Rated: {movieData.adult ? 'R' : 'PG13'}</p>
          <p className='text-secondary'>Release Data: {movieData.release_date} ({movieData.status})</p>
          <h3 className='text-primary'>Overview</h3>
          <p>{movieData.overview}</p>
          <h3 className='text-primary'>Genres</h3>
          {movieData.genres?.map(genre => <p key={genre.id}>{genre.name}</p>)}
          <h3 className='text-primary'>Tagline</h3>
          <p>{movieData.tagline}</p>
          <button className='btn btn-light' onClick={() => navigate('/movies')}>Back to Movies</button>
        </div>
      </div>
    </div>
  );
}


export default Details;