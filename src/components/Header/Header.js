import React, { Component } from 'react';
import { Tabs } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
export default class Header extends Component {
  render() {
    const { changeTab } = this.props;

    const items = [
      { key: 'Search', label: 'Search' },
      { key: 'Rated', label: 'Rated' },
    ];

    return (
      <header className="header">
        <Tabs defaultActiveKey="Search" items={items} onChange={changeTab} centered destroyInactiveTabPane />
      </header>
    );
  }
}
