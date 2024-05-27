import React, { Component } from 'react';
import { Result } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
export default class ErrorMessage extends Component {
  render() {
    return <Result status="error" title="Упс, ошибочка вышла!" subTitle="Для работы включите VPN!" />;
  }
}
