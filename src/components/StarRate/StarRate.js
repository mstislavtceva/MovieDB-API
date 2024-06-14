import React, { Component } from 'react';
import { Flex, Rate } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
export default class StarRate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
    };

    this.setRating = this.setRating.bind(this);
  }

  setRating(num) {
    const { idFilm, onSetRating } = this.props;

    this.setState({
      rating: num,
    });

    onSetRating(num, idFilm);
  }

  render() {
    const { rate } = this.props;
    const { rating } = this.state;

    return (
      <Flex gap="middle" vertical>
        <Rate
          value={!rate ? rating : rate}
          count={10}
          allowHalf
          onChange={(num) => this.setRating(num)}
          style={{ height: '20px', fontSize: '16px' }}
        />
      </Flex>
    );
  }
}
