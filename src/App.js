import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Navbar/navbar';
import Home from './pages/Home/home';
import Movies from './pages/Movies/movies';
import Favourites from './pages/Favourites/favourites';
import Details from './pages/Details/details';
import LanguageContext from './context/language.jsx'
import { Provider } from 'react-redux';
import store from './store/store';
import { useEffect, useState } from 'react';
import {fetchAllMovies} from './store/actions/thunks/moviethunk';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';

function App() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    store.dispatch(fetchAllMovies(1, language));
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <LanguageContext.Provider value={{
          lang: language ? language : 'en',
          toggleLanguage: (newLanguage) => setLanguage(newLanguage)
        }}>
          <Header />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/movies' element={<Movies />}></Route>
            <Route path='/movies/:id' element={<Details />}></Route>
            <Route path='favourites' element={<Favourites />}></Route>
          </Routes>
        </LanguageContext.Provider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
