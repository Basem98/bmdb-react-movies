import { useEffect, useState, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Movie from '../../components/Movie/movie';
import CustomPagination from '../../components/Pagination/pagination';
import SearchBar from '../../components/SearchBar/searchbar';
import axiosInstance from '../../network/axios';
import { fetchAllMovies } from '../../store/actions/thunks/moviethunk';
import LanguageContext from '../../context/language';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './movies.css'

function Movies(props) {
  const allMovies = useSelector(selector => selector.movies);
  const [moviesToShow, setMoviesToShow] = useState(allMovies);
  const [page, setPage] = useState(1);
  const languageCtx = useContext(LanguageContext);
  const favouriteMovies = useSelector(selector => selector.favourites);
  const dispatch = useDispatch();
  let isMovieFavourite;

  /**
   * Because getMoviesPerPage is used inside a useEffect hook, it should be wrapped in a useCallback hook
   * which will memoize it, by keeping its reference the same and only change it when any of the hook's dependencies changes
   **/
  const getMoviesPerPage = useCallback(() => {
    if (!props.showFavourites) {
      dispatch(fetchAllMovies(page, languageCtx.lang));
    }
    else
      setMoviesToShow(favouriteMovies.slice(((page * 5) - 5), (favouriteMovies.length < (page * 5) ? favouriteMovies.length : (page * 5))));
  }, [page, dispatch, favouriteMovies, languageCtx.lang, props.showFavourites]);

  useEffect(() => {
    getMoviesPerPage(1);
  }, []);

  useEffect(() => {
    getMoviesPerPage(page);
  }, [getMoviesPerPage, page, favouriteMovies, languageCtx.lang]);

  useEffect(() => {
    if (!props.showFavourites)
      setMoviesToShow(allMovies);
    else
      setMoviesToShow(favouriteMovies.slice(((page * 5) - 5), (favouriteMovies.length < (page * 5) ? favouriteMovies.length : (page * 5))));
  }, [allMovies, favouriteMovies, props.showFavourites, page]);


  function getMovieByName(movieName) {
    if (!movieName)
      getMoviesPerPage(page);
    else {
      if (!props.showFavourites)
        axiosInstance.get('/search/movie', { params: { query: movieName, language: languageCtx.lang } })
          .then((res) => {
            setMoviesToShow(res.data.results);
          })
          .catch((err) => console.log(err));

      else {
        setMoviesToShow(favouriteMovies.filter(movie => movie.title.toLowerCase().includes(movieName.toLowerCase())));
      }
    }
  }

  function updatePageNumber(newPageNumber) {
    setPage(newPageNumber);
  }

  return (
    <div className="container-fluid min-vh-100 bg-dark text-light d-flex flex-row flex-wrap justify-content-evenly">
      <div className='col-12 d-flex flex-row justify-content-center'>
        <ButtonGroup className='btn-group mt-3'>
          <Button disabled={languageCtx.lang === 'en' ? true : false} onClick={() => languageCtx.toggleLanguage('en')}>English</Button>
          <Button disabled={languageCtx.lang === 'ar' ? true : false} onClick={() => languageCtx.toggleLanguage('ar')}>العربية</Button>
        </ButtonGroup>
      </div>
      <div className='col-12 d-flex flex-row justify-content-center mt-4 mb-3'>
        <SearchBar onSearchQuery={getMovieByName} />
      </div>
      {
        moviesToShow.length > 1 ?
          moviesToShow?.map(movie => {
            isMovieFavourite = favouriteMovies.some(favMovie => favMovie.id === movie.id);
            return <div key={movie.id} className='m-4'>
              <Movie movieData={movie} isFavourite={isMovieFavourite} />
            </div>
          })
          : moviesToShow.length === 1 ?
            <div className='m-4'>
              <Movie movieData={moviesToShow[0]} isFavourite={isMovieFavourite = favouriteMovies.some(favMovie => favMovie.id === moviesToShow[0].id)} />
            </div>
            : props.showFavourites ? (
              favouriteMovies.length < 1 ?
                <h1>You have not added any movies to your favourites yet!</h1>
                : <h1>This page is now empty!</h1>)
              :
              <h1>There are no movies in the database that match your query!</h1>
      }
      <div className='col-12 d-flex flex-row justify-content-center'>
        <CustomPagination currPageNumber={page} onPageNumberChange={updatePageNumber} maxPageNum={props.showFavourites ? Math.ceil(favouriteMovies.length / 5) : 1000} />
      </div>
    </div>
  );
}


export default Movies;