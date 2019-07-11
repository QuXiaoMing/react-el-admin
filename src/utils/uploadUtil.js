import {get} from 'lodash-es';

export const getUploadImageUrl = data => get(data, '[0].url', '');
export const parseImageFromUrl = url => [{success: true, url}];
