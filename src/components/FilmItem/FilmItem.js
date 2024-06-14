import { Component } from 'react';
import { Typography, Flex } from 'antd';
import { format } from 'date-fns';

import StarRate from '../StarRate';

import './FilmItem.css';

import noPhoto from './ifNoPhoto.jpg';

// eslint-disable-next-line react/prefer-stateless-function
export default class FilmItem extends Component {
  constructor(props) {
    super(props);

    this.formatMyDate = (date) => {
      if (!date) {
        return 'Дата не найдена';
      }

      try {
        return format(new Date(date), 'MMMM dd, yyyy'); // Форматируем дату
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Invalid date format:', error);
        return ''; // Возвращаем пустую строку в случае ошибки
      }
    };
  }

  render() {
    const { Title, Text } = Typography;
    const { film, shortText, onSetRatedMovies, genres } = this.props;

    const genresList = genres.filter((item) => film.genres.includes(item.id));

    const colorCircle =
      film.vote < 4 && film.vote >= 0
        ? '#E90000'
        : film.vote > 3 && film.vote < 6
          ? '#E97E00'
          : film.vote > 5 && film.vote < 8
            ? '#E9D100'
            : '#66E900';

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
          <Flex vertical gap={7} className="film-card__content">
            <Flex justify="space-between">
              <Title
                level={4}
                style={{ marginBottom: '0px', lineHeight: '20px', width: '80%' }}
                className="film-card__title"
              >
                {film.title}
              </Title>
              <div style={{ borderColor: colorCircle }} className="film-card__rating">
                {film.vote}
              </div>
            </Flex>
            <Text type="secondary">{this.formatMyDate(film.releaseDate)}</Text>
            {/* <span> */}
            <Flex wrap>
              {/* eslint-disable-next-line arrow-body-style */}
              {genresList.map((genre) => {
                return (
                  <li key={genre.id}>
                    <Text keyboard>{genre.name}</Text>
                  </li>
                );
              })}
            </Flex>
            {/* </span> */}
            <Text>{shortText(film.overview)}</Text>
            <StarRate idFilm={film.id} onSetRating={onSetRatedMovies} rate={film.rate} />
          </Flex>
        </Flex>
      </article>
    );
  }
}
