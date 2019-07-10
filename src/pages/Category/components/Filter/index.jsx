/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import {Grid, Input} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import styles from './index.module.scss';

const {Row, Col} = Grid;

export default class Filter extends Component {
  state = {
    value: {},
  };

  formChange = value => {
    this.props.onChange(value);
  };

  render() {
    return (
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        <Row wrap gutter="20" className={styles.formRow}>
          <Col l="6">
            <div className={styles.formItem}>
              <span className={styles.formLabel}>分类名称：</span>
              <IceFormBinder triggerType="onBlur" name="name">
                <Input placeholder="请输入" style={{width: '200px'}} />
              </IceFormBinder>
              <div className={styles.formError}>
                <IceFormError name="name" />
              </div>
            </div>
          </Col>
        </Row>
      </IceFormBinderWrapper>
    );
  }
}
