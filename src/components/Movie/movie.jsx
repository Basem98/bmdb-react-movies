import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToFavourites, reomveFromFavourites } from '../../store/actions/favmovies.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './movie.css';



function Movie(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Card style={{ width: '18rem' }} className="position-relative">
      <Card.Img variant="top" src={props.movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${props.movieData.poster_path}` : 'blank.png'} />
      <div className='position-absolute top-0 left-0 rating-container w-100 d-flex flex-column align-items-center justify-content-center d-none'>
        <FontAwesomeIcon icon={faStar} color='gold' size='3x' />
        <h2 className='text-light fs-1'>{props.movieData.vote_average}</h2>
      </div>
      <Card.Body>
        <Card.Title className="text-light">{props.movieData.title}</Card.Title>
        <Card.Text className="text-dark">
          {props.movieData.release_date}
        </Card.Text>
        <Button className='position-absolute bottom-0 mb-3' variant="light" onClick={
          () => navigate(`/movies/${props.movieData.id}`)
        }>Get More Details</Button>
        <div className='position-absolute bottom-0 end-0 mb-3 me-3'>
          <FontAwesomeIcon icon={props.isFavourite ? solidHeart : regularHeart} color={props.isFavourite ? '#DB3D2A' : 'white'} size="2x" cursor="pointer" onClick={() => {
            if (props.isFavourite)
              dispatch(reomveFromFavourites(props.movieData));
            else
              dispatch(addToFavourites(props.movieData));
          }} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default Movie;