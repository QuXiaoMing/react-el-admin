import React, {Component} from 'react';
import CreativeLogin from './components/CreativeLogin';
import userStore from '@/store/User';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (userStore.isLogin) {
      userStore.logout();
    }
  }

  render() {
    return (
      <div className="login-page">
        {/* 左右布局的登录页 */}
        <CreativeLogin />
      </div>
    );
  }
}
