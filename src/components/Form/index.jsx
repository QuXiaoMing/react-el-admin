/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import {
  Input,
  Button,
  TimePicker,
  Select,
  // NumberPicker,
  // DatePicker,
  Checkbox,
  // Radio,
  // Select,
} from '@alifd/next';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import styles from './index.module.scss';

// const { Option } = Select;
const {Group: CheckboxGroup} = Checkbox;
// const { Group: RadioGroup } = Radio;
// const { RangePicker } = DatePicker;

export default class From extends Component {
  state = {
    value: {},
  };

  formChange = value => {
    console.log('value', value);
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log({
        values,
      });
      if (typeof this.props.onSubmit === 'function') {
        this.props.onSubmit(values);
      }
      // Message.success('提交成功');
    });
  };

  renderFormItem = (option = {}) => {
    let {formType} = option;
    console.log('inputType', formType, option);
    switch (formType) {
      case 'select':
        return this.renderFormSelect(option);
      case 'input':
        return this.renderFormInput(option);
      case 'password':
        return this.renderFormInput(option, {password: true});
      case 'checkboxGroup':
        return this.renderFormcheckboxGroup(option);
      case 'timePicker':
        return this.renderFormTimePicker(option);
      default:
        return this.renderFormInput(option);
    }
  };

  // 下拉框
  renderFormSelect = option => {
    return (
      <div
        className={styles.formItem}
        required={option.required}
        key={option.key}
      >
        <div className={styles.formLabel}>{option.name}：</div>
        <IceFormBinder
          name={option.key}
          required={option.required}
          message={option.message || `${option.name}必填`}
        >
          <Select>
            {option.options.map((e, index) => (
              <Select.Option key={index} value={e.value} disabled={e.disabled}>
                {e.label}
              </Select.Option>
            ))}
          </Select>
        </IceFormBinder>
        <div className={styles.formError}>
          <IceFormError name={option.key} />
        </div>
      </div>
    );
  };
  // 输入框
  renderFormInput = (option, {password} = {}) => {
    return (
      <div
        className={styles.formItem}
        required={option.required}
        key={option.key}
      >
        <div className={styles.formLabel}>{option.name}：</div>
        <IceFormBinder
          name={option.key}
          required={option.required}
          message={option.message || `${option.name}必填`}
        >
          <Input
            readOnly={
              option.readOnly === true || option.readOnly === 'read-only'
            }
            htmlType={password ? 'password' : 'text'}
            placeholder={option.placeholder || `请输入${option.name}`}
            style={{width: '400px'}}
          />
        </IceFormBinder>
        <div className={styles.formError}>
          <IceFormError name={option.key} />
        </div>
      </div>
    );
  };

  // 多选框组
  renderFormcheckboxGroup = option => {
    return (
      <div
        className={styles.formItem}
        required={option.required}
        key={option.key}
      >
        <div className={styles.formLabel}>{option.name}：</div>
        <IceFormBinder
          name={option.key}
          required={option.required}
          message={option.message || `${option.name}必填`}
        >
          <CheckboxGroup>
            {option.list.map(e => this.renderFormcheckbox(e))}
          </CheckboxGroup>
        </IceFormBinder>
        <div className={styles.formError}>
          <IceFormError name={option.key} />
        </div>
      </div>
    );
  };

  // checkbox
  renderFormcheckbox = option => {
    return (
      <Checkbox key={option.value} id={option.value} value={option.value}>
        {option.label}
      </Checkbox>
    );
  };

  // TimePicker
  renderFormTimePicker = option => {
    return (
      <div
        className={styles.formItem}
        required={option.required}
        key={option.key}
      >
        <div className={styles.formLabel}>{option.name}：</div>
        <IceFormBinder
          name={option.key}
          required={option.required}
          message={option.message || `${option.name}必填`}
        >
          <TimePicker style={{width: '400px'}} />
        </IceFormBinder>
        <div className={styles.formError}>
          <IceFormError name={option.key} />
        </div>
      </div>
    );
  };

  render() {
    console.log(this.props.children);
    return (
      <IceFormBinderWrapper
        value={this.props.value || this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        {this.props.options.map(option => {
          return this.renderFormItem(option);
        })}
        {this.props.children}
        <Button type="primary" onClick={this.validateAllFormField}>
          提 交
        </Button>
      </IceFormBinderWrapper>
    );
  }
}
