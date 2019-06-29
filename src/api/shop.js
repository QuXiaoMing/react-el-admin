import ajax from '@/utils/ajax';

// 创建店铺
export const createShop = option => ajax.post('shop', option);
