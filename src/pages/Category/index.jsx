import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Table from './components/Table';
import PageHead from '../../components/PageHead';

@withRouter
export default class Shop extends Component {
  handleClick = () => {
    this.props.history.push('add/Shop');
  };

  render() {
    return (
      <div>
        <PageHead title="店铺管理" buttonText="添加店铺" onClick={this.handleClick} />
        <Table />
      </div>
    );
  }
}
