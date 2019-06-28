import {create} from 'mobx-persist';

const prefix = name => `ele${name}`;

const hydrate = create({
  storage: localStorage,
  jsonify: true
});

/**
 * 持久化数据
 */
export default (Cluss, cb) => {
  let cluss = new Cluss();
  console.log('new', cluss);
  hydrate(prefix(Cluss.name), cluss).then(() => {
    console.log('用户加载成功');
  });
  if (typeof cb === 'function') {
    cb();
  }
  return cluss;
};
