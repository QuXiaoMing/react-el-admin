import {create} from 'mobx-persist';

const prefix = name => `ele${name}`;

const hydrate = create({
  storage: localStorage,
  jsonify: true
});

/**
 * 持久化数据
 */
export default Cluss => {
  let cluss = new Cluss();
  hydrate(prefix(Cluss.name), cluss);
  return cluss;
};
