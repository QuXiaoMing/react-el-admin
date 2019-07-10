import React, {Component} from 'react';
import {Upload} from '@alifd/next';

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
      action = 'https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload',
      accept = 'image/png, image/jpg, image/jpeg, image/gif, image/bmp',
      onPreview = _onPreview,
      onChange = _onChange,
      onSuccess = _onSuccess,
      onError = _onError
    } = this.props;
    return <Upload.Card listType={listType} action={action} accept={accept} onPreview={onPreview} onChange={onChange} onSuccess={onSuccess} onError={onError} />;
  }
}
