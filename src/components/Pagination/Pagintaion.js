import React, { Component } from 'react';
import { Pagination } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
export default class PaginationPanel extends Component {
  constructor(props) {
    super(props);

    this.paginationPanel = {
      maxWidth: 'fit-content',
      margin: '0 auto',
    };
  }

  render() {
    const { total, current, onChangePage } = this.props;

    return <Pagination style={this.paginationPanel} total={total} current={current} onChange={onChangePage} />;
  }
}
