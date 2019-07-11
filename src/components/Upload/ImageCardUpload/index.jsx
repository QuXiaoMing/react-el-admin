import React, {Component} from 'react';
import {Upload} from '@alifd/next';
import styles from '_c/Form/index.module.scss';
import {FormBinder as IceFormBinder, FormError as IceFormError} from '@icedesign/form-binder';
import ImageCardUpload from './ImageCardUpload';

export default class ImageCardUploadForm extends Component {
  render() {
    let {name = 'images', message = '请选择图片', label = '图片', value} = this.props;
    return (
      <div className={styles.formItem} required>
        <div className={styles.formLabel}>{label}：</div>
        <IceFormBinder name={name} required message={message}>
          <ImageCardUpload ref="upload" value={value} />
        </IceFormBinder>
        <div className={styles.formError}>
          <IceFormError name={name} />
        </div>
      </div>
    );
  }
}
