import { persist } from 'mobx-persist';
import { observable, computed, action } from 'mobx';
import { getRoleList } from '@/api/systerm';

class Systerm {
  @persist('list') @observable roleList = []

  @action.bound
  async getRoleList() {
    try {
      let ret = await getRoleList();
      console.log('TCL: Systerm -> getRoleList -> ret', ret);
      if (ret.isSuccess) {
        this.roleList = ret.data;
      }
    } catch (error) {
      console.error('TCL: Systerm -> getRoleList -> error', error);
    }
  }

  @action.bound
  getRole(id) {
    return this.roleList.find(e => e.id === id) || {};
  }
}
export default new Systerm();