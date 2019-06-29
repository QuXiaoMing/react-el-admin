/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import {
  Input,
  Button,
  TimePicker,
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
const { Group: CheckboxGroup } = Checkbox;
// const { Group: RadioGroup } = Radio;
// const { RangePicker } = DatePicker;

export default class From extends Component {
  state = {
    value: {},
    options: [
      {
        formType: 'input',
        name: '店铺名称',
        key: 'name',
        placeholder: '请输入店铺名称',
        required: true
      },
      {
        formType: 'input',
        name: '门面地址',
        key: 'address',
        required: true

      },
      {
        formType: 'input',
        name: '联系电话',
        key: 'phone',
        required: true
      },
      {
        formType: 'input',
        name: '店铺图片地址',
        key: 'image_path',
      },
      {
        formType: 'input',
        name: '运费',
        key: 'float_delivery_fee'
      },
      {
        formType: 'input',
        name: '起送价',
        key: 'float_minimum_order_amount'
      },
      {
        formType: 'input',
        name: '餐馆介绍',
        key: 'description'
      },
      {
        formType: 'input',
        name: '店铺标语',
        key: 'promotion_info'
      },
      {
        formType: 'checkboxGroup',
        name: '店铺特点',
        key: 'promotion_feature',
        list: [
          {
            label: '品牌保证',
            value: 'is_premium'
          },
          {
            label: '蜂鸟专送',
            value: 'delivery_mode'
          },
          {
            label: '新开店铺',
            value: 'is_new'
          },
          {
            label: '支持保险',
            value: 'is_bao'
          },
          {
            label: '准时达',
            value: 'is_zhun'
          },
          {
            label: '开发票',
            value: 'is_piao'
          },
        ]
      },
      {
        formType: 'input',
        name: '营业执照图片地址',
        key: 'business_license_image'
      },
      {
        formType: 'input',
        name: '餐饮服务许可证图片地址',
        key: 'catering_service_license_image'
      },
      {
        formType: 'input',
        name: '商铺活动',
        key: 'activities'
      },
      {
        formType: 'timePicker',
        name: '开始营业时间',
        key: 'startTime',
        required: true
      },
      {
        formType: 'timePicker',
        name: '结束营业时间',
        key: 'endTime',
        required: true
      },
    ]
  };

  formChange = (value) => {
    console.log('value', value);
  };

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log({ values });
      // Message.success('提交成功');
    });
  };

  renderFormItem = (option = {}) => {
    let { formType } = option;
    switch (formType) {
      case 'input':
        return this.renderFormInput(option);
      case 'checkboxGroup':
        return this.renderFormcheckboxGroup(option);
      case 'timePicker':
        return this.renderFormTimePicker(option);
      default:
        break;
    }
  }

  // 输入框
  renderFormInput = option => {
    return (
      <div className={styles.formItem} required={option.required} key={option.key}>
        <div className={styles.formLabel}>{option.name}：</div>
        <IceFormBinder name={option.key} required={option.required} message={option.message || `${option.name}必填`}>
          <Input
            placeholder={option.placeholder || `请输入${option.name}`}
            style={{ width: '400px' }}
          />
        </IceFormBinder>
        <div className={styles.formError}>
          <IceFormError name={option.key} />
        </div>
      </div>
    );
  }

  // 多选框组
  renderFormcheckboxGroup = option => {
    return (
      <div className={styles.formItem} required={option.required} key={option.key}>
        <div className={styles.formLabel}>{option.name}：</div>
        <IceFormBinder name={option.key} required={option.required} message={option.message || `${option.name}必填`}>
          <CheckboxGroup>
            {
              option.list.map(e => this.renderFormcheckbox(e))
            }
          </CheckboxGroup>
        </IceFormBinder>
        <div className={styles.formError}>
          <IceFormError name={option.key} />
        </div>
      </div>
    );
  }

  // checkbox
  renderFormcheckbox = option => {
    return (
      <Checkbox key={option.value} id={option.value} value={option.value}>{option.label}</Checkbox>
    );
  }

  // TimePicker
  renderFormTimePicker = (option) => {
    return (
      <div className={styles.formItem} required={option.required} key={option.key}>
        <div className={styles.formLabel}>{option.name}：</div>
        <IceFormBinder name={option.key} required={option.required} message={option.message || `${option.name}必填`}>
          <TimePicker />
        </IceFormBinder>
        <div className={styles.formError}>
          <IceFormError name={option.key} />
        </div>
      </div>
    );
  }


  render() {
    return (
      <IceFormBinderWrapper
        value={this.state.value}
        onChange={this.formChange}
        ref="form"
      >
        {this.state.options.map(option => {
          return this.renderFormItem(option);
        })}
        <Button type="primary" onClick={this.validateAllFormField}>
          提 交
        </Button>
      </IceFormBinderWrapper>
    );
  }
}
