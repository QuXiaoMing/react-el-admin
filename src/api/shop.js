import ajax from '@/utils/ajax';

// 创建店铺
export const createShop = params => ajax.post('shop', params);
export const editShop = params => ajax.put('shop', params);
export const shopList = params => ajax.get('shop', {params});
export const shopInfo = id => ajax.get(`shop/${id}`);
export const deleteShop = id => ajax.delete(`shop/${id}`);
