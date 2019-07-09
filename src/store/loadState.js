import {create} from 'mobx-persist';
import UserStore from './User';
import SystermStore from './Systerm';

const prefix = name => `ele${name}`;

const hydrate = create({
  storage: localStorage,
  jsonify: true
});

export default () =>
  hydrate(prefix('UserStore'), UserStore)
    .then(() => {
      return hydrate(prefix('SystermStore'), SystermStore);
    })
    .then(() => {
      console.log('用户加载成功');
    });
