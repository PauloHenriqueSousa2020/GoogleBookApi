import React from 'react';
import { Link } from 'react-router-dom';
import { ImArrowLeft2 } from 'react-icons/im';

import './styles.css'

function PageHeader(props) {
  return(
    <header className="page-header">

      <div className="top-bar-container">
        <Link to="/">
          <ImArrowLeft2 size={20} color="#000" />
        </Link>
        <h3>GOOGLE BOOKS</h3>
      </div>

      <div className="header-content">
        <strong>{props.title}</strong>

        {props.description && <p>{props.description}</p>}
        {props.children}
      </div>

    </header>
  )
}

export default PageHeader