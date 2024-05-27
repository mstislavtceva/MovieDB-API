import React, { Component } from 'react';
import { Result } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
export default class ErrorInternet extends Component {
  render() {
    return <Result status="500" title="Кажется, нет интернета:(" subTitle="Проверь свое соединение!" />;
  }
}
