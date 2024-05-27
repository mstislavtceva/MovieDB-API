import React, { Component } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Offline, Online } from 'react-detect-offline';

import FilmList from '../FilmList';
import MovieService from '../../services/MovieService';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import ErrorInternet from '../ErrorInternet';

import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: true,
      error: false,
    };

    this.movieService = new MovieService();
    this.layoutStyle = {
      margin: '0 auto',
      maxWidth: '1010px',
      minWidth: '420px',
      backgroundColor: '#ffffff',
    };

    this.updateMovies('da');

    // eslint-disable-next-line arrow-body-style
    this.trimOverviewText = (text) => {
      return text.replace(/^(.{170}[^\s]*).*/, '$1 ...');
    };

    this.onMoviesLoaded = (movies) => {
      this.setState({ movies, loading: false });
    };

    this.onError = () => {
      this.setState({
        error: true,
        loading: false,
      });
    };
  }

  updateMovies(title) {
    this.movieService
      .getMovies(title)
      .then((movies) => this.onMoviesLoaded(movies))
      .catch(() => {
        this.onError();
      });
  }

  render() {
    const { movies, loading, error } = this.state;

    return (
      <Layout style={this.layoutStyle}>
        <Content>
          <section className="movie__container">
            <Online>
              {error ? <ErrorMessage /> : null}
              {loading ? <Spinner /> : null}
              {!(loading || error) ? <FilmList filmList={movies} shortText={this.trimOverviewText} /> : null}
            </Online>
            <Offline>
              <ErrorInternet />
            </Offline>
          </section>
        </Content>
      </Layout>
    );
  }
}
