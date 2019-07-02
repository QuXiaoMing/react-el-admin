import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PageHead from '@/components/PageHead';
import Table from './components/Table';

@withRouter
export default class Dic extends Component {
  handleClick = () => {
    this.props.history.push('add/dic');
  };

  render() {
    return (
      <div>
        <PageHead title="字典管理" buttonText="添加字段" onClick={this.handleClick} />
        <Table />
      </div>
    );
  }
}
