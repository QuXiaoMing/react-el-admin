/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Message } from '@alifd/next';
import Form from '_c/Form';
import { createShop } from '@/api/shop';
import PageHead from '../../../../components/PageHead';

export default class GoodsForm extends Component {
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

  onSubmit = async (value) => {
    try {
      let ret = await createShop(value);
      console.log('ret', ret);
      if (ret && ret.isSuccess) {
        Message.success('操作成功');
      }
    } catch (error) {
      console.error('onSubmit', error.message);
    }
  }

  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log({ values });
      Message.success('提交成功');
    });
  };

  render() {
    return (
      <div>
        <PageHead title="添加店铺" />
        <IceContainer style={{ padding: '40px' }}>
          <Form options={this.state.options} onSubmit={this.onSubmit}>
            test
          </Form>
        </IceContainer>
      </div>
    );
  }
}

