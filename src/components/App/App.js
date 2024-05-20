import React, { Component } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import FilmList from '../FilmList';
import MovieService from '../../services/MovieService';

import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };

    this.movieService = new MovieService();
    this.layoutStyle = {
      margin: '0 auto',
      maxWidth: '1010px',
      minWidth: '420px',
      backgroundColor: '#ffffff',
      // backgroundColor: 'green',
    };

    this.updateMovies('do');

    // eslint-disable-next-line arrow-body-style
    this.trimOverviewText = (text) => {
      return text.replace(/^(.{170}[^\s]*).*/, '$1 ...');
    };

    this.onMoviesLoaded = (movies) => {
      this.setState({ movies });
    };
  }

  updateMovies(title) {
    this.movieService.getMovies(title).then((movies) => this.onMoviesLoaded(movies));
  }

  render() {
    const { movies } = this.state;

    return (
      <Layout style={this.layoutStyle}>
        <Content>
          <section className="movie__container">
            <FilmList filmList={movies} shortText={this.trimOverviewText} />
          </section>
        </Content>
      </Layout>
    );
  }
}
