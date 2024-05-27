import React, { Component } from 'react';
import { Spin, Flex } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
export default class Spinner extends Component {
  render() {
    return (
      <Flex align="center" justify="center">
        <Spin size="large" />
      </Flex>
    );
  }
}
