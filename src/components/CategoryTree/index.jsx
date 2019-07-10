import React from 'react';
import styles from '_c/Form/index.module.scss';
import {FormBinder as IceFormBinder, FormError as IceFormError} from '@icedesign/form-binder';
import Tree from './tree';

export default class Demo extends React.Component {
  fetchData = () => {
    return this.refs.tree.fetchData();
  };

  render() {
    let {name = 'parentId', message = '请选择父节点', label = '父节点'} = this.props;
    return (
      <div className={styles.formItem} required>
        <div className={styles.formLabel}>{label}：</div>
        <IceFormBinder name={name} required message={message}>
          <Tree ref="tree" style={{width: '400px'}} value={this.props.value} />
        </IceFormBinder>
        <div className={styles.formError}>
          <IceFormError name={name} />
        </div>
      </div>
    );
  }
}
