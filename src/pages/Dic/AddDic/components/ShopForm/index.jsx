/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Message } from '@alifd/next';
import Form from '_c/Form';
import { addDic } from '@/api/dic';
import PageHead from '@/components/PageHead';

export default class GoodsForm extends Component {
  state = {
    options: [
      {
        formType: 'input',
        name: '字段名称',
        key: 'name',
        placeholder: '请输入字段名称',
        required: true
      },
      {
        formType: 'input',
        name: 'key',
        key: 'key',
        required: true
      },
      {
        formType: 'input',
        name: 'value',
        key: 'value',
        required: true
      },
      {
        formType: 'input',
        name: '名称',
        key: 'text',
        required: true
      }
    ]
  };

  formChange = (value) => {
    console.log('value', value);
  };

  onSubmit = async (value) => {
    try {
      let ret = await addDic(value);
      console.log('ret', ret);
      if (ret && ret.isSuccess) {
        Message.success('操作成功');
      }
    } catch (error) {
      console.error('onSubmit', error.message);
    }
  }

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log({ values });
      Message.success('提交成功');
    });
  };

  render() {
    return (
      <div>
        <PageHead title="添加字段" />
        <IceContainer style={{ padding: '40px' }}>
          <Form options={this.state.options} onSubmit={this.onSubmit}>
            test
          </Form>
        </IceContainer>
      </div>
    );
  }
}

