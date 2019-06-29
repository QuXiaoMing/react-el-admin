/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Message } from '@alifd/next';
import Form from '_c/Form';
import PageHead from '../../../../components/PageHead';

export default class GoodsForm extends Component {
  state = {
    value: {},
  };

  formChange = (value) => {
    console.log('value', value);
  };

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
        <PageHead title="添加店铺" />
        <IceContainer style={{ padding: '40px' }}>
          <Form>
            test
          </Form>
        </IceContainer>
      </div>
    );
  }
}

