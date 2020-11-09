import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ImPlus, ImCross, ImStarEmpty } from 'react-icons/im';

import PageHeader from '../../components/PageHeader';
import api from '../../services/api';

import './styles.css'

function Favorites() {
  const history = useHistory();
  const [showInfo, setShowInfo] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [book, setBook] = useState([]);

  useEffect(() => {
    api.get('/favoritesBooks').then(response => {
      setFavoriteBooks(response.data);
    })
  }, [])

  function handleMoreInfos(bookItem) {
    setBook(bookItem);
    setShowInfo(true);
  }

  function handleDeleteFavorite(bookItem){
    api.delete(`/favoritesBooks/${bookItem.id}`)
    Swal.fire({
      icon: 'success',
      title: 'Livro retirado da lista de Favoritos',
    })
    history.push('/')
  }

  return (
    <div id="favorites-books" className="container">
      <PageHeader title="Seus livros favoritados" description = "Essa é sua lista de livros favoritados"/>

      <main>
        {!showInfo ? (
          <>
            {favoriteBooks.map(favoriteBooks => {
              return (
                <>
                  <article className="book-item" key={favoriteBooks.id} >
                    <header>
                      <img src={favoriteBooks.thumbnail} alt={favoriteBooks.title}/>
                      <div>
                        <strong>{favoriteBooks.title}</strong>
                        <span>{favoriteBooks.authors}</span>
                      </div>
                    </header>
                    <footer>
                      <div className="button-container">
                        <button onClick={() => handleDeleteFavorite(favoriteBooks)}>
                          <ImStarEmpty size={22} color="#FFF" />
                          Desfavoritar
                        </button>
                        <button onClick={() => handleMoreInfos(favoriteBooks)}>
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
                <img src={book.thumbnail} alt={book.title}/>
                  <div>
                    <strong>{book.title}</strong>
                    <span>{book.authors}</span>
                  </div>
                </header>

                <p><strong>Descrição:</strong> {book.description}</p>
                <p><strong>Linguagem:</strong> {book.language}</p>
                <p><strong>Total de Páginas:</strong> {book.pageCount}</p>
                <p><strong>Editora:</strong> {book.publisher}</p>
                {book.listPrice !== undefined ? (<p><strong>Valor:</strong> R$ {book.amount}</p>) : (<></>)}
                <p><strong>Link:</strong> <a rel="noreferrer" target="_blank" href={book.previewLink}>Link do Book</a></p>
                <p><strong>Informações:</strong> <a target="_blank" rel="noreferrer" href={book.infoLink}>Link de Informações</a></p>

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

export default Favorites;