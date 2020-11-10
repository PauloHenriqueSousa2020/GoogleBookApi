import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { ImPlus, ImStarFull, ImCross } from 'react-icons/im';

import axios from 'axios';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';

import './styles.css'

function SearchBooks() {
  const [showInfo, setShowInfo] = useState(false);
  const [totalResults, setTotalResults] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [index, setIndex] = useState(0);
  const [bookName, setBookName] = useState('');
  const [bookItems, setBookItems] = useState([]);
  const [book, setBook] = useState([]);

  async function handleSubmitBook(e) {
    e.preventDefault();
    try {
        await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=${totalResults}&startIndex=${index}`)
        .then(response => {
        setTotalPages(Math.ceil(response.data.totalItems / totalResults))
        if (response.data.items.length > 0) {
          setBookItems(response.data.items);
        }
      })
    } catch (err) {
      Swal.fire({
        icon: 'warning',
        title: 'Erro ao conectar com o servidor',
      })
    }
  }

  function handleMoreInfos(bookItem) {
    setBook(bookItem);
    setShowInfo(true);
  }

  async function handleFavorites(bookItem){
    const id = bookItem.id;
    const title = bookItem.volumeInfo.title;
    const thumbnail = bookItem.volumeInfo.imageLinks.thumbnail;
    const authors =  bookItem.volumeInfo.authors;
    const description = bookItem.volumeInfo.description;
    const language = bookItem.volumeInfo.language;
    const pageCount = bookItem.volumeInfo.pageCount;
    const publisher = bookItem.volumeInfo.publisher;
    const previewLink = bookItem.volumeInfo.previewLink;
    const infoLink = bookItem.volumeInfo.infoLink;
    const amount = bookItem.saleInfo.listPrice.amount;

    const data = { id, title, thumbnail, authors, description, 
    language, pageCount, publisher, previewLink, infoLink, amount }

    try{
      await api.post('favoritesBooks', data)
      Swal.fire({
        icon: 'success',
        title: 'Livro adicionado a lista de Favoritos',
      })
    }catch{
      Swal.fire({
        icon: 'warning',
        title: 'Erro ao conectar com o servidor',
      })
    }
  }
  return (
    <div id="page-search-books" className="container">
      <PageHeader title="Procure os livros desejados.">
        <form id="search-books" onSubmit={handleSubmitBook}>
          <div className="input-block">
            <label htmlFor="books"> Books </label>
            <input
              type="text"
              name="books"
              label="Book"
              required={true}
              value={bookName}
              onChange={e => setBookName(e.target.value)}
            />
          </div>
           <div className="input-block">
            <label htmlFor="Results"> Resultados por página </label>
            <input
              type="number"
              name="Results"
              label="Resultados por página"
              min="10" max="40" step="10"
              value={totalResults}
              onChange={e => setTotalResults(e.target.value)}
            />
          </div>
          <div className="input-block">
            <label htmlFor="Pages"> Página </label>
            <input
              type="number"
              name="Pages"
              label="Página"
              min="0" max={totalPages} step="1"
              value={index}
              onChange={e => setIndex(e.target.value)}
            />
          </div> 
          <button type="submit">
            Buscar
          </button>
        </form>
      </PageHeader>
      <main>
        {!showInfo ? (
          <>
            {bookItems.map(bookItem => {
              return (
                <>
                  <article className="book-item" key={bookItem.id} >
                    <header>
                      <div>
                        {bookItem.volumeInfo.imageLinks === undefined ? (<></>) : (<img src={bookItem.volumeInfo.imageLinks.thumbnail} alt={bookItem.volumeInfo.title}/>)}
                        <strong>{bookItem.volumeInfo.title}</strong>
                        <span>{bookItem.volumeInfo.authors}</span>
                      </div>
                    </header>
                    <footer>
                      <div className="button-container">
                        <button onClick={() => handleFavorites(bookItem)}>
                          <ImStarFull size={22} color="#FFF" />
                          Favoritar
                        </button>
                        <button onClick={() => handleMoreInfos(bookItem)}>
                          <ImPlus size={22} color="#FFF" />
                          Ver detalhes
                        </button>
                      </div>
                    </footer>
                  </article>
                </>
              )
            })}
          </>
        ) : (
            <>
              <article className="book-item book-detail" >
                <header>
                {book.volumeInfo.imageLinks === undefined ? (<></>) : (<img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/>)}
                  <div>
                    <strong>{book.volumeInfo.title}</strong>
                    <span>{book.volumeInfo.authors}</span>
                  </div>
                </header>
                <p><strong>Descrição:</strong> {book.volumeInfo.description}</p>
                <p><strong>Linguagem:</strong> {book.volumeInfo.language}</p>
                <p><strong>Total de Páginas:</strong> {book.volumeInfo.pageCount}</p>
                <p><strong>Editora:</strong> {book.volumeInfo.publisher}</p>
                {book.saleInfo.listPrice === undefined ? (<></>) : (<p><strong>Valor:</strong> R$ {book.saleInfo.listPrice.amount}</p>)} 
                <p><strong>Link:</strong> <a rel="noreferrer" target="_blank" href={book.volumeInfo.previewLink}>Link do Book</a></p>
                <p><strong>Informações:</strong> <a target="_blank" rel="noreferrer" href={book.volumeInfo.infoLink}>Link de Informações</a></p>

                <footer>
                  <button onClick={() => setShowInfo(false)}>
                    <ImCross size={22} color="#FFF" />
                    Fechar detalhes
                  </button>
                </footer>
              </article>
            </>
          )}
      </main>
    </div>
  )
}

export default SearchBooks;