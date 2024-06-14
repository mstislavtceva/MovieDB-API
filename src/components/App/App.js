import React, { Component } from 'react';
import { Layout, Result } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { SmileOutlined } from '@ant-design/icons';
import { Offline, Online } from 'react-detect-offline';
import { debounce } from 'lodash';

import Header from '../Header';
import FilmList from '../FilmList';
import MovieService from '../../services/MovieService';
import Spinner from '../Spinner';
import SearchPanel from '../SearchPanel';
import PaginationPanel from '../PaginationPanel';
import { APIProvider } from '../../APIContext/APIContext';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      ratedMovies: [],
      genres: [],
      loading: true,
      error: false,
      noResults: false,
      title: '',
      currentPage: 1,
      totalResults: 1,
      guestSessionId: '',
      tabPane: 'Search',
    };

    this.movieService = new MovieService();

    this.layoutStyle = {
      margin: '0 auto',
      maxWidth: '1010px',
      minWidth: '420px',
      backgroundColor: '#ffffff',
    };

    this.contetStyle = {
      maxWidth: '938px',
      margin: '0 auto',
    };

    // eslint-disable-next-line arrow-body-style
    this.trimOverviewText = (text) => {
      return text.replace(/^(.{120}[^\s]*).*/, '$1 ...');
    };

    this.onError = this.onError.bind(this);
    this.searchNewMovies = debounce(this.searchNewMovies.bind(this), 500);
    this.getTotalCountPages = this.getTotalCountPages.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.setRatedMovies = this.setRatedMovies.bind(this);
    this.getRatedMovies = this.getRatedMovies.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.updateRatingFilm = this.updateRatingFilm.bind(this);
    this.getGenresList = this.getGenresList.bind(this);
  }

  componentDidMount() {
    const { currentPage } = this.state;

    this.movieService = new MovieService();
    this.getGuestSessionId();
    this.getGenresList();
    this.updateMovies('', currentPage);
  }

  componentDidUpdate(prevProps, prevState) {
    const { title, currentPage, tabPane } = this.state;

    if (prevState.title !== title) {
      this.setState({
        currentPage: 1,
      });
      this.searchNewMovies(title, currentPage);
    }

    if (prevState.currentPage !== currentPage) {
      this.searchNewMovies(title, currentPage);
      window.scrollTo(0, 0);
    }

    if (prevState.tabPane !== tabPane && tabPane === 'Rated') {
      this.setState({
        tabPane: 'Rated',
      });
      this.getRatedMovies();
    }

    if (prevState.tabPane !== tabPane && tabPane === 'Search') {
      this.setState({
        tabPane: 'Search',
      });
      // this.searchNewMovies(title, currentPage);
      this.getTotalCountPages(title, currentPage);
      this.updateRatingFilm();
    }
  }

  onError() {
    this.setState({
      error: true,
      loading: false,
    });
  }

  onChangeValue(title) {
    this.setState({
      title,
      loading: true,
    });
  }

  onChangePage(page) {
    this.setState({
      currentPage: page,
    });
  }

  getGenresList() {
    this.movieService
      .getGenres()
      .then((genres) => {
        this.setState({
          genres,
        });
      })
      .catch(() => {
        this.onError();
      });
  }

  getTotalCountPages(title, page) {
    this.movieService
      .getTotalPages(title, page)
      .then((totalResults) =>
        this.setState({
          totalResults,
        })
      )
      .catch(() => {
        this.onError();
      });
  }

  getGuestSessionId() {
    this.movieService
      .getGuestSession()
      .then((guestSessionId) => {
        this.setState({
          guestSessionId,
        });
      })
      .catch(() => {
        this.onError();
      });
  }

  setRatedMovies(rate, id) {
    const { guestSessionId } = this.state;
    const rating = {
      value: rate,
    };

    this.movieService.addRating(id, rating, guestSessionId);
  }

  getRatedMovies() {
    const { guestSessionId } = this.state;

    this.setState({
      loading: true,
    });

    this.movieService
      .getRating(guestSessionId)
      .then((list) => {
        // eslint-disable-next-line arrow-body-style
        const newList = list.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            overview: movie.overview,
            posterPath: movie.poster_path,
            rate: movie.rating,
            vote: movie.vote_average.toFixed(1),
            genres: movie.genre_ids,
          };
        });

        this.setState({
          ratedMovies: newList,
          totalResults: list.total_results,
          loading: false,
          noResults: list.length === 0,
        });
      })
      .catch(() => {
        this.onError();
      });
  }

  updateRatingFilm() {
    const { guestSessionId, movies } = this.state;

    this.movieService
      .getRating(guestSessionId)
      .then((list) => {
        // eslint-disable-next-line arrow-body-style
        const newMovies = movies.map((movie) => {
          const filmRated = list.results.find((film) => film.id === movie.id);
          return filmRated ? { ...movie, rate: filmRated.rating } : movie;
        });
        this.setState({
          movies: newMovies,
        });
      })
      .catch(() => {
        this.onError();
      });
  }

  updateMovies(title, page) {
    this.movieService
      .getMovies(title, page)
      .then((movies) =>
        this.setState({
          movies,
          loading: false,
          noResults: movies.length === 0,
        })
      )
      .catch(() => {
        this.onError();
      });
  }

  searchNewMovies(text, page) {
    this.setState({
      loading: true,
    });

    this.updateMovies(text, page);
    this.getTotalCountPages(text, page);
  }

  changeTab(key) {
    this.setState({
      tabPane: key,
    });
  }

  render() {
    const { movies, ratedMovies, loading, error, noResults, title, currentPage, totalResults, tabPane, genres } =
      this.state;

    const search = tabPane === 'Search' ? <SearchPanel title={title} changeValue={this.onChangeValue} /> : null;
    const spinner = loading ? <Spinner /> : null;

    const filmCards =
      !(loading || error || noResults) && tabPane === 'Search' ? (
        <FilmList
          filmList={movies}
          ratedFilmList={ratedMovies}
          shortText={this.trimOverviewText}
          onSetRatedMovies={this.setRatedMovies}
        />
      ) : null;

    const ratedFilmCards =
      !(loading || error || noResults) && tabPane === 'Rated' ? (
        <FilmList filmList={ratedMovies} shortText={this.trimOverviewText} onSetRatedMovies={this.setRatedMovies} />
      ) : null;

    const notFound =
      noResults && !loading && title.length !== 0 ? (
        <Result status="error" title="Такого фильма не нашли:(" subTitle="Введите название фильма на английском" />
      ) : null;

    const startedResult =
      title.length === 0 && !error && !loading ? (
        <Result icon={<SmileOutlined />} title="Введите название фильма на английском" />
      ) : null;

    const errorMessage = error ? (
      <Result status="error" title="Упс, ошибочка вышла!" subTitle="Попробуйте включить VPN!" />
    ) : null;

    const pagPanel = !noResults ? (
      <PaginationPanel current={currentPage} total={totalResults} onChangePage={this.onChangePage} />
    ) : null;

    return (
      <APIProvider value={genres}>
        <Layout style={this.layoutStyle}>
          <Content style={this.contetStyle}>
            <div className="movie__search">
              <Header changeTab={this.changeTab} />
              {search}
            </div>
            <div className="movie__container">
              <Online>
                {errorMessage}
                {spinner}
                {filmCards}
                {ratedFilmCards}
                {notFound}
                {startedResult}
              </Online>
              <Offline>
                <Result status="500" title="Кажется, нет интернета:(" subTitle="Проверь свое соединение!" />
              </Offline>
            </div>
            <div className="movie__pagination">{pagPanel}</div>
          </Content>
        </Layout>
      </APIProvider>
    );
  }
}
