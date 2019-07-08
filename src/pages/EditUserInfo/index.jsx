import React, { Component } from 'react';
import { Button, Dialog } from '@alifd/next';
import Form from '@/components/Form/index.jsx';
import { withRouter, Redirect } from 'react-router-dom';
import { getUserInfo } from '@/api/user';

@withRouter
export default class EditUserInfo extends Component {
  state = {
    options: [
      {
        name: '用户名',
        key: 'user_name',
        readOnly: true
      }, {
        name: '注册时间',
        key: 'update_at',
        readOnly: true
      }, {
        name: '角色',
        key: 'roles',
        readOnly: true
      }, {
        name: '性别',
        key: 'sex',
        inputType: 'select',
        options: [
          {
            label: '男',
            value: '0'
          },
          {
            label: '女',
            value: '1'
          },
        ]
      }, {
        name: '密码',
        key: 'password',
        formType: 'password'
      }, {
        name: '新密码',
        key: 'newPassword',
        formType: 'password'
      }
    ]
  }
  get id() {
    return this.props.match.params.id;
  }

  fetechData = async () => {
    try {
      let ret = await getUserInfo(this.id);
      if (ret.isSuccess) {
        console.log('userInfo', ret.data);
      } else {
        this.props.history.push('/membership');
      }
    } catch (error) {
      console.error('家在用户信息失败');
    }
  }

  componentWillMount() {
    this.fetechData();
  }
  render() {
    return (
      this.id ?
        <Form options={this.state.options}>1</Form> :
        <Redirect to="/membership" />
    );
  }
}
