import ajax from '@/utils/ajax';

// 创建店铺
export const createShop = params => ajax.post('shop', params);
export const shopList = params => ajax.get('shop', {params});
