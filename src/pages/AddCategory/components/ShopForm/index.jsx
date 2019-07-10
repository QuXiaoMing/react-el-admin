/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Message} from '@alifd/next';
import Form from '_c/Form';
import styles from '_c/Form/index.module.scss';
import {createCategory} from '@/api';
import {
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import CategoryTree from '../CategoryTree';
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
            <div className={styles.formItem} required>
              <div className={styles.formLabel}>父节点：</div>
              <IceFormBinder name="parentId" required message="请选择父节点">
                <CategoryTree ref="tree" style={{width: '400px'}} />
              </IceFormBinder>
              <div className={styles.formError}>
                <IceFormError name="parentId" />
              </div>
            </div>
          </Form>
        </IceContainer>
      </div>
    );
  }
}
