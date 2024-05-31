import React, { Component } from 'react';
import { Flex } from 'antd';

import FilmItem from '../FilmItem';
import './FilmList.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class FilmList extends Component {
  render() {
    const { filmList, shortText } = this.props;

    return (
      <Flex wrap justify="space-between" align="center">
        {filmList.map((film) => (
          <li key={film.id}>
            <FilmItem film={film} shortText={shortText} />
          </li>
        ))}
      </Flex>
    );
  }
}
