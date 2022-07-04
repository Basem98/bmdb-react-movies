import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import './navbar.css';

function Header(props) {
  const favouritesLength = useSelector(selector => selector.favourites?.length ? selector.favourites.length : 0);
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Link to="/" className="text-decoration-none"><Navbar.Brand className='ms-3 me-5'>BMDB</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className='' />
      <Navbar.Collapse id="basic-navbar-nav" className=''>
        <Nav className="me-auto">

          <NavLink to="movies" className='text-decoration-none text-light mx-3 p-3' href="#home">Movies</NavLink>
          <NavLink to="favourites" className='text-decoration-none text-light mx-3 p-3' href="#link">Favourites<Badge bg='light' className='ms-2 text-danger'>{favouritesLength}</Badge></NavLink>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;