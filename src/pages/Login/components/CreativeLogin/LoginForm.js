/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import {Message} from '@alifd/next';
import {login} from '@/api/login';

import AuthForm from './AuthForm';

export default class LoginForm extends Component {
  static displayName = 'LoginForm';

  static propTypes = {};

  static defaultProps = {};

  formChange = value => {
    console.log('formChange:', value);
  };

  handleSubmit = async (errors, values) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }

    console.log('values:', values);
    let ret = await login(values);
    if (ret.isSuccess) {
      Message.success('登录成功');
    }
    // 登录成功后做对应的逻辑处理
  };

  render() {
    const config = [
      {
        label: '用户名',
        component: 'Input',
        componentProps: {
          placeholder: '用户名',
          size: 'large',
          maxLength: 20
        },
        formBinderProps: {
          name: 'username',
          required: true,
          message: '必填'
        }
      },
      {
        label: '密码',
        component: 'Input',
        componentProps: {
          placeholder: '密码',
          htmlType: 'password'
        },
        formBinderProps: {
          name: 'password',
          required: true,
          message: '必填'
        }
      },
      {
        label: '记住账号',
        component: 'Checkbox',
        componentProps: {},
        formBinderProps: {
          name: 'checkbox'
        }
      },
      {
        label: '登录',
        component: 'Button',
        componentProps: {
          type: 'primary'
        },
        formBinderProps: {}
      }
    ];

    const initFields = {
      name: '',
      passwd: '',
      checkbox: false
    };

    const links = [{to: '/register', text: '立即注册'}, {to: '/forgetpassword', text: '找回密码'}];

    return <AuthForm title="登录" config={config} initFields={initFields} formChange={this.formChange} handleSubmit={this.handleSubmit} links={links} />;
  }
}
