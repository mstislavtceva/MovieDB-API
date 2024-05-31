import React, { Component } from 'react';
import { Layout, Result } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { SmileOutlined } from '@ant-design/icons';
import { Offline, Online } from 'react-detect-offline';
import { debounce } from 'lodash';

import FilmList from '../FilmList';
import MovieService from '../../services/MovieService';
import Spinner from '../Spinner';
import SearchPanel from '../SearchPanel';
import PaginationPanel from '../Pagination';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: true,
      error: false,
      noResults: false,
      title: '',
      currentPage: 1,
      totalResults: 1,
    };

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
      return text.replace(/^(.{170}[^\s]*).*/, '$1 ...');
    };

    this.onError = this.onError.bind(this);
    this.searchNewMovies = debounce(this.searchNewMovies.bind(this), 500);
    this.getTotalCountPages = this.getTotalCountPages.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    const { currentPage } = this.state;

    this.movieService = new MovieService();
    this.updateMovies('', currentPage);
  }

  componentDidUpdate(prevProps, prevState) {
    const { title, currentPage } = this.state;

    if (prevState.title !== title) {
      this.setState({
        currentPage: 1,
      });
      this.searchNewMovies(title, currentPage);
    }

    if (prevState.currentPage !== currentPage) {
      this.searchNewMovies(title, currentPage);
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
    this.updateMovies(text, page);
    this.getTotalCountPages(text, page);
  }

  render() {
    const { movies, loading, error, noResults, title, currentPage, totalResults } = this.state;

    return (
      <Layout style={this.layoutStyle}>
        <Content style={this.contetStyle}>
          <div className="movie__search">
            <SearchPanel title={title} changeValue={this.onChangeValue} />
          </div>
          <div className="movie__container">
            <Online>
              {error ? (
                <Result status="error" title="Упс, ошибочка вышла!" subTitle="Попробуйте включить VPN!" />
              ) : null}
              {loading ? <Spinner /> : null}
              {noResults && !loading && title.length !== 0 ? (
                <Result
                  status="error"
                  title="Такого фильма не нашли:("
                  subTitle="Введите название фильма на английском"
                />
              ) : null}
              {title.length === 0 ? (
                <Result icon={<SmileOutlined />} title="Введите название фильма на английском" />
              ) : null}
              {!(loading || error || noResults) ? (
                <FilmList filmList={movies} shortText={this.trimOverviewText} />
              ) : null}
            </Online>
            <Offline>
              <Result status="500" title="Кажется, нет интернета:(" subTitle="Проверь свое соединение!" />
            </Offline>
          </div>
          <div className="movie__pagination">
            <PaginationPanel current={currentPage} total={totalResults} onChangePage={this.onChangePage} />
          </div>
        </Content>
      </Layout>
    );
  }
}
