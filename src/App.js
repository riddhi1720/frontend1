import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import NotFound from './components/notFound/NotFound';
import MoviesComponent from './components/movies/MoviesComponent';

import ReviewComponent from './components/movies/reviews/ReviewComponent';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              element={<MoviesComponent />}
            />

            <Route
              path="/trailer/:ytTrailerId"
              element={<Trailer />}
            />
            <Route
              path="/reviews/:movieId"
              element={
                <ReviewComponent />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;

