import React, {Component} from 'react';
import {Upload} from '@alifd/next';
import {uploadURL} from '@/config';
import Result from '@/utils/ajax/result';

function _onPreview(info) {
  console.log('onPreview callback : ', info);
}

function _onSuccess(res, file) {
  console.log('onSuccess callback : ', res, file);
}
function _onChange(info) {
  console.log('onChange callback : ', info);
}

function _onError(file) {
  console.log('onError callback : ', file);
}

function defaultFormatter(ret) {
  console.log('ret', ret);
  // return {
  //   success: true,
  //   url: 'http://localhost:8081/static/image/33787979.32a1727.gif'
  // };
  if (ret.code === '0000') {
    return {
      success: true,
      url: ret.data[0].downloadURL,
      ...ret.data[0]
    };
  }
  return {
    success: false
  };
}
export default class ImageCardUpload extends Component {
  handleChange = (value, data) => {
    console.log('onChange callback : ', value);
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value, data);
    }
  };

  render() {
    let {
      listType = 'card',
      action = uploadURL,
      accept = 'image/png, image/jpg, image/jpeg, image/gif, image/bmp',
      onPreview = _onPreview,
      onChange = _onChange,
      onSuccess = _onSuccess,
      onError = _onError,
      formatter = defaultFormatter,
      multiple = true
    } = this.props;
    return (
      <Upload.Card multiple={multiple} formatter={formatter} listType={listType} action={action} accept={accept} onPreview={onPreview} onChange={onChange} onSuccess={onSuccess} onError={onError} />
    );
  }
}
