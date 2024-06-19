import React, { Component } from 'react';
import { List } from 'antd';

import FilmItem from '../FilmItem';
import { APIConsumer } from '../../APIContext/APIContext';

import './FilmList.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class FilmList extends Component {
  render() {
    const { filmList, shortText, onSetRatedMovies } = this.props;

    return (
      <List
        grid={{
          // column: 2,
          gutter: 20,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        dataSource={filmList}
        // eslint-disable-next-line arrow-body-style
        renderItem={(film) => {
          return (
            <APIConsumer>
              {/* eslint-disable-next-line arrow-body-style */}
              {(genres) => {
                return (
                  <List.Item key={film.id}>
                    <FilmItem film={film} shortText={shortText} onSetRatedMovies={onSetRatedMovies} genres={genres} />
                  </List.Item>
                );
              }}
            </APIConsumer>
          );
        }}
      />
    );

    // return (
    //   <Flex wrap justify="space-between" align="center" gap="large">
    //     {/* eslint-disable-next-line arrow-body-style */}
    //     {filmList.map((film) => {
    //       return (
    //         <APIConsumer>
    //           {/* eslint-disable-next-line arrow-body-style */}
    //           {(genres) => {
    //             return (
    //               <li key={film.id}>
    //                 <FilmItem film={film} shortText={shortText} onSetRatedMovies={onSetRatedMovies} genres={genres} />
    //               </li>
    //             );
    //           }}
    //         </APIConsumer>
    //       );
    //     })}
    //   </Flex>
    // );
  }
}
