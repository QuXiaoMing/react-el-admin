import React, {Component} from 'react';
import {Table, Pagination, Button, Dialog} from '@alifd/next';
import IceContainer from '@icedesign/container';
import {getGoodsList, deleteGoods} from '@/api';
import Filter from '../Filter';
import styles from './index.module.scss';

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
          let ret = await getGoodsList();
          console.log('TCL: GoodsTable -> fetchData -> ret', ret);
          if (ret.isSuccess) {
            let data = ret.data.list;
            this.setState({data, isLoading: false, total: ret.data.total});
          }
          this.setState({isLoading: false});
        } catch (error) {
          this.setState({isLoading: false});
          console.error('TCL: GoodsTable -> fetchData -> error', error);
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

  handleDelete = id => {
    Dialog.confirm({
      title: '提示',
      content: '确认删除吗',
      onOk: () => {
        deleteGoods(id)
          .then(() => {
            return this.fetchData();
          })
          .catch(error => {
            console.error('TCL: GoodsTable -> handleDelete -> error', error);
          });
      }
    });
  };

  handleDetail = () => {
    Dialog.confirm({
      title: '提示',
      content: '暂不支持查看详情'
    });
  };

  renderOper = id => {
    return (
      <div>
        <Button type="primary" style={{marginRight: '5px'}} onClick={this.handleDetail}>
          详情
        </Button>
        <Button type="normal" warning onClick={() => this.handleDelete(id)}>
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
          <Filter onChange={this.handleFilterChange} />
        </IceContainer>
        <IceContainer>
          <Table loading={isLoading} dataSource={data} hasBorder={false}>
            <Table.Column title="商品名称" dataIndex="name" />
            <Table.Column title="商品分类" dataIndex="cate" />
            <Table.Column title="商品标签" dataIndex="tag" />
            <Table.Column title="在售门店" dataIndex="store" />
            <Table.Column title="总销量" dataIndex="sales" />
            <Table.Column title="商品服务" dataIndex="service" />
            <Table.Column title="操作" width={200} dataIndex="id" cell={this.renderOper} />
          </Table>
          <Pagination className={styles.pagination} total={total} current={current} onChange={this.handlePaginationChange} />
        </IceContainer>
      </div>
    );
  }
}
