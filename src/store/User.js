import {observable, computed} from 'mobx';
import {persist} from 'mobx-persist';
import {idDef} from '@/utils';
import storePersist from './storePersist';

class User {
  @persist('object') @observable userInfo = {};

  @computed get isLogin() {
    return idDef(this.userInfo);
  }
}
export default storePersist(User);
