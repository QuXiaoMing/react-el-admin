/* eslint react/no-string-refs:0 */
import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Message} from '@alifd/next';
import Form from '_c/Form';
import {cloneDeep, getUploadImageUrl, parseImageFromUrl} from '@/utils';
import {createShop, editShop, shopInfo} from '@/api/shop';
import CategoryTree from '_c/CategoryTree';
import ImageCardUpload from '_c/Upload/ImageCardUpload';
import {withRouter} from 'react-router-dom';
import PageHead from '../../../../components/PageHead';

const promotionList = [
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
  }
];
@withRouter
export default class GoodsForm extends Component {
  state = {
    value: null,
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
        name: '运费',
        key: 'float_delivery_fee',
        required: true
      },
      {
        formType: 'input',
        name: '起送价',
        key: 'float_minimum_order_amount',
        required: true
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
        key: 'promotionFeature',
        list: promotionList
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
      }
    ]
  };

  get id() {
    return this.props.match.params.id;
  }

  componentWillMount() {
    if (this.id) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      let ret = await shopInfo(this.id);
      console.warn('TCL: GoodsForm -> fetchData -> ret', ret);
      if (ret.isSuccess) {
        let data = cloneDeep(ret.data);
        let category = JSON.parse(data.category);
        // 处理店铺特色字段
        let promotionFeature = [];
        if (category) {
          data.category = JSON.parse(data.category).id;
        }
        promotionList.forEach(({value}) => {
          if (data[value]) {
            promotionFeature.push(value);
          }
        });
        data.promotionFeature = promotionFeature;
        // 处理图片
        data.image_path_data = parseImageFromUrl(data.image_path);
        data.business_license_image_data = parseImageFromUrl(data.business_license_image);
        data.catering_service_license_image_data = parseImageFromUrl(data.catering_service_license_image);
        console.log('TCL: GoodsForm -> fetchData -> data.category', data.category);
        this.setState({
          value: data
        });
      }
      console.log('TCL: GoodsForm -> fetchData -> ret', ret);
    } catch (error) {
      console.error('TCL: GoodsForm -> fetchData -> error', error);
    }
  };

  formChange = value => {
    console.log('value', value);
  };

  onSubmit = async value => {
    try {
      let api = this.id ? editShop : createShop;
      // 店铺特点
      if (value.promotionFeature && value.promotionFeature.length) {
        value.promotionFeature.forEach(element => {
          if (value.hasOwnProperty(element)) {
            value[element] = true;
          }
        });
      }
      // 获取图片地址
      value.image_path = getUploadImageUrl(value.image_path_data);
      value.business_license_image = getUploadImageUrl(value.business_license_image_data);
      value.catering_service_license_image = getUploadImageUrl(value.catering_service_license_image_data);
      let ret = await api(value);
      console.log('ret', ret);
      if (ret && ret.isSuccess) {
        Message.success('操作成功');
        this.props.history.push('/shop');
      }
    } catch (error) {
      console.error('onSubmit', error.message);
    }
  };

  render() {
    return (
      <div>
        <PageHead title={this.id ? '修改店铺信息' : '添加店铺'} />
        <IceContainer style={{padding: '40px'}}>
          <Form options={this.state.options} onSubmit={this.onSubmit} value={this.state.value}>
            <CategoryTree name="category" message="请选择店铺分类" label="店铺分类" />
            <ImageCardUpload multiple={false} name="image_path_data" label="店铺图片地址" />
            <ImageCardUpload multiple={false} name="business_license_image_data" label="营业执照图片地址" />
            <ImageCardUpload multiple={false} name="catering_service_license_image_data" label="餐饮服务许可证图片地址" />
          </Form>
        </IceContainer>
      </div>
    );
  }
}
