import React from 'react';
import styles from '_c/Form/index.module.scss';
import {FormBinder as IceFormBinder, FormError as IceFormError} from '@icedesign/form-binder';
import Tree from './tree';

export default class Demo extends React.Component {
  render() {
    console.log('TCL: Demo -> render -> this.props', this.props);
    let {name = 'parentId', message = '请选择父节点', label = '父节点'} = this.props;

    return (
      <div className={styles.formItem} required>
        <div className={styles.formLabel}>{label}：</div>
        <IceFormBinder name={name} required message={message}>
          <Tree style={{width: '400px'}} />
        </IceFormBinder>
        <div className={styles.formError}>
          <IceFormError name={name} />
        </div>
      </div>
    );
  }
}
