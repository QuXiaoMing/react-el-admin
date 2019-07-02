import React, { Component } from 'react';
import { Table, Pagination, Button, Dialog, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import { dicList, deleteDic } from '@/api/dic';
import Filter from '../Filter';
import styles from './index.module.scss';

export default class GoodsTable extends Component {
  state = {
    pageSize: 10,
    total: 0,
    pageNum: 1,
    isLoading: false,
    data: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = (params) => {
    this.setState(
      {
        isLoading: true,
        total: 0
      },
      async () => {
        try {
          let { pageSize, pageNum } = this.state;
          let ret = await dicList({
            pageSize,
            pageNum,
            ...params
          });
          console.log('TCL: GoodsTable -> fetchData -> ret', ret);
          if (ret && ret.isSuccess) {
            this.setState({
              data: ret.data.list,
              isLoading: false,
              total: ret.data.total
            });
          }
          this.setState({
            isLoading: false,
          });
        } catch (error) {
          console.error('TCL: GoodsTable -> fetchData -> error', error);
        }
      }
    );
  };

  handlePaginationChange = (pageNum) => {
    this.setState(
      {
        pageNum,
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleFilterChange = (...arg) => {
    console.log('handleFilterChange', ...arg);
    this.fetchData(...arg);
  };

  handleDelete = (id) => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        deleteDic(id).then(ret => {
          if (ret && ret.isSuccess) {
            Message.success('删除成功');
            this.fetchData();
          }
        }).catch(error => {
          console.error('删除失败', error.message);
        });
      },
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情',
    });
  };

  renderOper = (val, index, { id }) => {
    return (
      <Button type="normal" warning onClick={() => this.handleDelete(id)}>
        删除
      </Button>
    );
  };

  render() {
    const { isLoading, data, pageNum, total, pageSize } = this.state;

    return (
      <div className={styles.container}>
        <IceContainer>
          <Filter onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="字段名称" dataIndex="name" />
            <Table.Column title="key" dataIndex="key" />
            <Table.Column title="value" dataIndex="value" />
            <Table.Column title="名称" dataIndex="text" />
            <Table.Column
              title="操作"
              width={200}
              dataIndex="oper"
              cell={this.renderOper}
            />
          </Table>
          <Pagination
            className={styles.pagination}
            current={pageNum}
            total={total}
            pageSize={pageSize}
            onChange={this.handlePaginationChange}
          />
        </IceContainer>
      </div>
    );
  }
}
