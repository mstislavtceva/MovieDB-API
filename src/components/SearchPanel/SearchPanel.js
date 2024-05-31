import React, { Component } from 'react';
import { Input } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
export default class SearchPanel extends Component {
  render() {
    const { title, changeValue } = this.props;

    return <Input placeholder="Type to search..." value={title} onChange={(e) => changeValue(e.target.value)} />;
  }
}
