import { Component } from 'react';
import { Typography, Flex } from 'antd';
import { format } from 'date-fns';

import './FilmItem.css';

import noPhoto from './ifNoPhoto.jpg';

// eslint-disable-next-line react/prefer-stateless-function
export default class FilmItem extends Component {
  constructor() {
    super();

    this.filmTitle = {
      lineHeight: '23.75px',
    };
  }

  render() {
    const { Title, Text } = Typography;
    const { film, shortText } = this.props;

    return (
      <article className="film-card">
        <Flex>
          <div className="film-card__image">
            <img
              alt={film.title}
              src={film.posterPath ? `https://image.tmdb.org/t/p/w500/${film.posterPath}` : noPhoto}
              className="film-card__poster"
            />
          </div>
          <Flex vertical className="film-card__content">
            <Title level={4} style={this.filmTitle} className="film-card__title">
              {film.title}
            </Title>
            <Text type="secondary" style={{ marginBottom: '5px' }}>
              {format(new Date(film.releaseDate), 'MMMM d, y')}
            </Text>
            <span style={{ marginBottom: '5px' }}>
              <Text keyboard>Demo</Text>
              <Text keyboard>Demo</Text>
            </span>
            <Text>{shortText(film.overview)}</Text>
          </Flex>
        </Flex>
      </article>
    );
  }
}