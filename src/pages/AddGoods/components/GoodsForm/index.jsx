/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Message} from '@alifd/next';
import Form from '_c/Form';
import {createGoods} from '@/api';
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
        key: 'images',
        name: '图片地址'
      },
      {
        key: 'remark',
        name: '描述'
      }
    ]
  };

  formChange = value => {
    console.log('value', value);
  };

  onSubmit = async values => {
    try {
      let {history} = this.props;
      let ret = await createGoods(values);
      console.log('TCL: GoodsForm -> onSubmit -> ret', ret);
      if (ret.isSuccess) {
        Message.success('创建成功');
        history.push('/goods');
      }
    } catch (error) {
      console.error('TCL: GoodsForm -> onSubmit -> error', error);
    }
  };

  render() {
    let {options, value} = this.state;
    return (
      <div>
        <PageHead title="添加商品" />
        <IceContainer style={{padding: '40px'}}>
          <Form value={value} options={options} onSubmit={this.onSubmit} />
        </IceContainer>
      </div>
    );
  }
}
