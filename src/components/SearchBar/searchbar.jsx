import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './searchbar.css';

function SearchBar(props) {
  let searchQuery = "";
  return (
    <div className='d-flex flex-row'>
      <input type='text' placeholder='Type the name of the movie...' className='rounded py-2 px-2 w-100' defaultValue="" onChange={(e) => {
        if (e.target.value)
          searchQuery = e.target.value
        else
          props.onSearchQuery("");
      }} />
      <FontAwesomeIcon icon={faMagnifyingGlass} border size='2x' color='rgb(13, 110, 253)' cursor="pointer" onClick={() => props.onSearchQuery(searchQuery)} />
    </div>
  );
}


export default SearchBar;