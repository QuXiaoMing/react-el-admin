/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Message } from '@alifd/next';
import { login } from '@/api/login';
import { observer } from 'mobx-react';
import userStore from '@/store/User';
import AuthForm from './AuthForm';

@observer
@withRouter
export default class LoginForm extends Component {
  static displayName = 'LoginForm';

  static defaultProps = {};

  componentDidMount() {
    // setTimeout(() => {
    //   userStore.logout();
    // }, 1000);
  }

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
    console.log('ret', ret);
    if (ret.isSuccess) {
      Message.success('登录成功');
      // window.aaa = this.props;
      userStore.userInfo = { token: ret.data, ...values };
      setTimeout(() => {
        console.log('userStore', ret.data);
        this.props.history.push('/');
      });
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
      username: '',
      password: '',
      checkbox: false
    };

    const links = [{ to: '/register', text: '立即注册' }, { to: '/forgetpassword', text: '找回密码' }];

    return (
      <div>
        <AuthForm title="登录" config={config} initFields={initFields} formChange={this.formChange} handleSubmit={this.handleSubmit} links={links} />
      </div>
    );
  }
}
