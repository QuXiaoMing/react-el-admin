import React, {Component} from 'react';
import {Table, Pagination, Button, Dialog, Message} from '@alifd/next';
import IceContainer from '@icedesign/container';
import {shopList, deleteShop} from '@/api/shop';
import {dateFormate} from '@/utils';
import {withRouter} from 'react-router-dom';
import Filter from '../Filter';
import styles from './index.module.scss';

@withRouter
export default class GoodsTable extends Component {
  state = {
    pageSize: 10,
    total: 0,
    pageNum: 1,
    isLoading: false,
    data: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = params => {
    this.setState(
      {
        isLoading: true,
        total: 0
      },
      async () => {
        try {
          let {pageSize, pageNum} = this.state;
          let ret = await shopList({
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
            isLoading: false
          });
        } catch (error) {
          console.error('TCL: GoodsTable -> fetchData -> error', error);
        }
      }
    );
  };

  handlePaginationChange = pageNum => {
    this.setState(
      {
        pageNum
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

  handleDelete = id => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        deleteShop(id)
          .then(ret => {
            if (ret && ret.isSuccess) {
              Message.success('删除成功');
              this.fetchData();
            }
          })
          .catch(error => {
            console.error('删除失败', error.message);
          });
      }
    });
  };

  handleDetail = (id = '') => {
    this.props.history.push(`/shop/${id}`);
  };

  renderCategory = jsonString => {
    let data = JSON.parse(jsonString);
    if (data) {
      return <span>{data.name}</span>;
    }
  };

  renderDate = date => {
    return <span>{dateFormate(date)}</span>;
  };

  renderOper = (val, index, {id}) => {
    return (
      <div>
        <Button type="primary" style={{marginRight: '5px'}} onClick={() => this.handleDetail(id)}>
          详情
        </Button>
        <Button type="normal" warning onClick={() => this.handleDelete(id)}>
          删除
        </Button>
      </div>
    );
  };

  render() {
    const {isLoading, data, pageNum, total, pageSize} = this.state;

    return (
      <div className={styles.container}>
        <IceContainer>
          <Filter onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="商品名称" dataIndex="name" />
            <Table.Column title="联系电话" dataIndex="phone" />
            <Table.Column title="商品分类" dataIndex="category" cell={this.renderCategory} />
            <Table.Column title="运费" dataIndex="float_delivery_fee" />
            <Table.Column title="起送价" dataIndex="float_minimum_order_amount" />
            <Table.Column title="开始营业时间" dataIndex="startTime" cell={this.renderDate} />
            <Table.Column title="结束营业时间" dataIndex="endTime" cell={this.renderDate} />
            <Table.Column title="门店地址" dataIndex="address" />
            <Table.Column title="操作" width={200} dataIndex="oper" cell={this.renderOper} />
          </Table>
          <Pagination className={styles.pagination} current={pageNum} total={total} pageSize={pageSize} onChange={this.handlePaginationChange} />
        </IceContainer>
      </div>
    );
  }
}
