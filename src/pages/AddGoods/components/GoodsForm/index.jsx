/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Message} from '@alifd/next';
import Form from '_c/Form';
import CategoryTree from '_c/CategoryTree';
import ImageCardUpload from '_c/Upload/ImageCardUpload/index.jsx';
import {createGoods, editGoods, goodsDetail} from '@/api';
import {withRouter} from 'react-router-dom';
import PageHead from '../../../../components/PageHead';

@withRouter
export default class GoodsForm extends Component {
  state = {
    value: {},
    options: [
      {
        key: 'name',
        name: '商品名称',
        required: true
      },
      {
        key: 'stock',
        name: '库存',
        required: true
      },
      {
        key: 'remark',
        name: '描述'
      }
    ]
  };

  get id() {
    return this.props.match.params.id;
  }

  componentWillMount() {
    if (this.id) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      let ret = await goodsDetail(this.id);
      console.log('TCL: GoodsForm -> fetchData -> ret', ret);
      if (ret.isSuccess) {
        this.setState({
          value: ret.data
        });
      }
    } catch (error) {
      console.error('TCL: GoodsForm -> fetchData -> error', error);
    }
  };

  formChange = value => {
    console.log('value', value);
  };

  onSubmit = async values => {
    try {
      let {history} = this.props;
      let api = this.id ? editGoods : createGoods;
      let {imagesData} = values;
      if (imagesData && imagesData.length) {
        values.images = imagesData.map(e => e.imgURL).join(',');
      }
      let ret = await api(values);
      console.log('TCL: GoodsForm -> onSubmit -> ret', ret);
      if (ret.isSuccess) {
        Message.success('操作成功');
        history.push('/goods');
      }
    } catch (error) {
      console.error('TCL: GoodsForm -> onSubmit -> error', error);
    }
  };

  render() {
    let {options, value} = this.state;
    let title = this.id ? '编辑商品信息' : '添加商品';
    return (
      <div>
        <PageHead title={title} />
        <IceContainer style={{padding: '40px'}}>
          <Form value={value} options={options} onSubmit={this.onSubmit}>
            <CategoryTree name="category" message="请选择店铺分类" label="店铺分类" />
            <ImageCardUpload name="imagesData" />
          </Form>
        </IceContainer>
      </div>
    );
  }
}
