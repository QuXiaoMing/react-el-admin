import React, { Component } from 'react';
import { Message } from '@alifd/next';
import SystermStore from '@/store/Systerm.js';
import Form from '@/components/Form/index.jsx';
import { withRouter, Redirect } from 'react-router-dom';
import { getUserInfo, editUserInfo } from '@/api/user';
import { getRoleName, cloneDeep } from '@/utils';
@withRouter
export default class EditUserInfo extends Component {
  state = {
    value: {},
    options: [
      {
        name: '用户名',
        key: 'user_name',
        readOnly: true
      },
      {
        name: '注册时间',
        key: 'update_at',
        readOnly: true
      },
      {
        name: '角色',
        key: 'roles',
        readOnly: true
      },
      {
        name: '性别',
        key: 'sex',
        formType: 'select',
        options: [
          {
            label: '男',
            value: '0'
          },
          {
            label: '女',
            value: '1'
          }
        ]
      },
      {
        name: '密码',
        key: 'password',
        formType: 'password'
      },
      {
        name: '新密码',
        key: 'newPassword',
        formType: 'password'
      }
    ]
  };
  get id() {
    return this.props.match.params.id;
  }
  fetechData = async () => {
    try {
      let ret = await getUserInfo(this.id);
      if (ret.isSuccess) {
        console.log('userInfo', ret.data);
        let roles = 'ret.data.roles';
        let data = cloneDeep(ret.data);
        data.roles = getRoleName(roles);
        this.setState({ value: data });
      } else {
        this.props.history.push('/membership');
      }
    } catch (error) {
      console.error('加载用户信息失败', error.message);
    }
  };
  onSubmit = async values => {
    try {
      if (values.password && values.newPassword && values.password !== values.newPassword) {
        return Message.error('两次密码不一致');
      }
      let ret = await editUserInfo(values);
      console.log('TCL: EditUserInfo -> onSubmit -> ret', ret);
      if (ret.isSuccess) {
        Message.success('操作成功');
      }
    } catch (error) {
      console.error('onSubmit', error.message);
    }
  };
  componentWillMount() {
    SystermStore.getRoleList();
    this.fetechData();
  }
  render() {
    return this.id ? <Form options={this.state.options} onSubmit={this.onSubmit} value={this.state.value} /> : <Redirect to="/membership" />;
  }
}
