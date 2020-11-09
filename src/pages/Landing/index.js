import React from 'react';
import { Link } from 'react-router-dom';
import { ImBooks, ImStarFull } from 'react-icons/im';

import book from '../../assets/images/book.png'

import './styles.css'

function Landing(){
  return(
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <h1>GOOGLE BOOKS</h1>
          <h2>Busque seus livros na  API do Google Books</h2>
        </div>

        <img src={book} alt="Books" className="book-image"/>    

        <div className="buttons-container">
          <Link to="/searchbooks" className="search-books">
            <ImBooks size={22} style={{marginRight: 5}} />
            Buscar
          </Link>

          <Link to="/favorites" className="favorites-book">
            <ImStarFull size={20} style={{marginRight: 5}} />
            Favoritos
          </Link>
        </div> 
      </div>
    </div>
  )
}

export default Landing;