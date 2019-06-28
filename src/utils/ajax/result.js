import {get} from '@/utils/index.js';

export default class Result {
  constructor(response) {
    this.response = response;
  }

  get isSuccess() {
    return get(this, 'response.status', 200) >= 200 && get(this, 'response.status', 200) < 300 && this.code === '0000';
  }

  get data() {
    return get(this, 'response.data');
  }

  get code() {
    return get(this, 'response.data.code');
  }

  get message() {
    return get(this, 'response.data.msg');
  }
}
