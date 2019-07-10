import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Table from './components/Table';
import PageHead from '../../components/PageHead';

@withRouter
export default class Shop extends Component {
  handleClick = () => {
    this.props.history.push('add/category');
  };

  render() {
    return (
      <div>
        <PageHead title="分类管理" buttonText="添加分类" onClick={this.handleClick} />
        <Table />
      </div>
    );
  }
}
