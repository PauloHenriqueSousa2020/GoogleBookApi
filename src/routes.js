import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './pages/Landing';
import Favorites from './pages/Favorites';
import SearchBooks from './pages/SearchBooks';

function Routes(){
  return(
    <BrowserRouter>
      <Route path="/" exact component={Landing}/>
      <Route path="/favorites" component={Favorites} />
      <Route path="/searchbooks" component={SearchBooks} />
    </BrowserRouter>
  )
};

export default Routes;
