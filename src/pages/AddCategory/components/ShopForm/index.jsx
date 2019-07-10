/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Message} from '@alifd/next';
import Form from '_c/Form';
import {createCategory} from '@/api';

import CategoryTree from '../../../../components/CategoryTree';
import PageHead from '../../../../components/PageHead';

export default class GoodsForm extends Component {
  state = {
    parentId: '',
    options: [
      {
        name: '分类名称',
        key: 'name',
        required: true,
      },
    ],
  };

  onSubmit = async value => {
    try {
      let ret = await createCategory({
        parentId: this.state.parentId,
        ...value,
      });
      console.log('ret', ret);
      if (ret && ret.isSuccess) {
        Message.success('操作成功');

        setTimeout(() => {
          this.refs.tree.fetchData();
        }, 500);
      }
    } catch (error) {
      console.error('onSubmit', error.message);
    }
  };

  render() {
    return (
      <div>
        {this.state.parentId}
        <PageHead title="添加分类" />
        <IceContainer style={{padding: '40px'}}>
          <Form options={this.state.options} onSubmit={this.onSubmit}>
            <CategoryTree ref="tree" style={{width: '400px'}} />
          </Form>
        </IceContainer>
      </div>
    );
  }
}
