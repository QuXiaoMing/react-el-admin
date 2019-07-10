import React from 'react';
import styles from '_c/Form/index.module.scss';
import {
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import Tree from './tree';

export default class Demo extends React.Component {
  render() {
    return (
      <div className={styles.formItem} required>
        <div className={styles.formLabel}>父节点：</div>
        <IceFormBinder
          name={this.props.name || 'parentId'}
          required
          message={this.props.message || '请选择父节点'}
        >
          <Tree style={{width: '400px'}} />
        </IceFormBinder>
        <div className={styles.formError}>
          <IceFormError name={this.props.name || 'parentId'} />
        </div>
      </div>
    );
  }
}
