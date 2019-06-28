import {observable, computed, action} from 'mobx';
import {persist} from 'mobx-persist';
import {idDef, get} from '@/utils';

export class User {
  @persist('object') @observable userInfo = {};

  @computed get isLogin() {
    return idDef(get(this.userInfo, 'token'));
  }

  @action.bound
  logout() {
    console.warn('退出登录', this.userInfo);
    this.userInfo = {};
  }
}
export default new User();
