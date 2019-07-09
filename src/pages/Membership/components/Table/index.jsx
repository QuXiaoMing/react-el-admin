import React, {Component} from 'react';
import {Table, Pagination, Button, Dialog} from '@alifd/next';
import IceContainer from '@icedesign/container';
import {userList} from '@/api/user';
import FilterTag from '../FilterTag';
import FilterForm from '../FilterForm';
import styles from './index.module.scss';
import {withRouter} from 'react-router-dom';
import {dateFormate} from '../../../../utils';

@withRouter
export default class GoodsTable extends Component {
  state = {
    current: 1,
    total: 0,
    isLoading: false,
    data: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState(
      {
        isLoading: true
      },
      async () => {
        try {
          let ret = await userList();
          if (ret && ret.isSuccess) {
            this.setState({
              data: ret.data.list,
              total: ret.data.total,
              isLoading: false
            });
          }
        } catch (e) {
          console.error('userList', e.message);
          this.setState({
            isLoading: false
          });
        }
      }
    );
  };

  handlePaginationChange = current => {
    this.setState(
      {
        current
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleFilterChange = () => {
    this.fetchData(5);
  };

  handleDelete = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        this.fetchData(10);
      }
    });
  };

  handleDetail = data => {
    this.props.history.push(`/membership/${data.user_id}`);
  };

  readerDate = (val, index, data) => {
    console.log('TCL: GoodsTable -> readerDate -> val, index, data', val, index, data);
    return <div>{dateFormate(val)}</div>;
  };

  renderOper = (val, index, data) => {
    console.log('data', data);
    return (
      <div>
        <Button type="primary" style={{marginRight: '5px'}} onClick={() => this.handleDetail(data)}>
          详情
        </Button>
        <Button type="normal" warning onClick={this.handleDelete}>
          删除
        </Button>
      </div>
    );
  };

  render() {
    const {isLoading, data, current, total} = this.state;

    return (
      <div className={styles.container}>
        <IceContainer>
          <FilterTag onChange={this.handleFilterChange} />
          <FilterForm onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="会员名称" dataIndex="user_name" />
            <Table.Column title="会员等级" dataIndex="roles" />
            <Table.Column title="会员余额(元)" dataIndex="balance" />
            <Table.Column title="累计消费(元)" dataIndex="accumulative" />
            <Table.Column title="注册时间" dataIndex="create_at" cell={this.readerDate} />
            <Table.Column title="生日时间" dataIndex="update_at" cell={this.readerDate} />
            <Table.Column title="归属门店" dataIndex="store" />
            <Table.Column title="操作" width={200} dataIndex="oper" cell={this.renderOper} />
          </Table>
          <Pagination className={styles.pagination} current={current} total={total} onChange={this.handlePaginationChange} />
        </IceContainer>
      </div>
    );
  }
}
