import React, { Component } from 'react';
import { Flex } from 'antd';

import FilmItem from '../FilmItem';
import { APIConsumer } from '../../APIContext/APIContext';

import './FilmList.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class FilmList extends Component {
  render() {
    const { filmList, shortText, onSetRatedMovies } = this.props;

    return (
      <Flex wrap justify="space-between" align="center" gap="large">
        {/* eslint-disable-next-line arrow-body-style */}
        {filmList.map((film) => {
          return (
            <APIConsumer>
              {/* eslint-disable-next-line arrow-body-style */}
              {(genres) => {
                return (
                  <li key={film.id}>
                    <FilmItem film={film} shortText={shortText} onSetRatedMovies={onSetRatedMovies} genres={genres} />
                  </li>
                );
              }}
            </APIConsumer>
          );
        })}
      </Flex>
    );
  }
}
