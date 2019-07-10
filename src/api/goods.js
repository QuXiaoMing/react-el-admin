import ajax from '@/utils/ajax';

export const getGoodsList = params => ajax.get('/goods', {params});
export const createGoods = params => ajax.post('/goods', params);
export const deleteGoods = id => ajax.delete(`/goods/${id}`);
export const findGoodsByParentId = params => ajax.get('/goods/findByParentId', {params});
