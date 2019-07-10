import ajax from '@/utils/ajax';

export const getGoodsList = params => ajax.get('/goods', {params});
export const createGoods = params => ajax.post('/goods', params);
export const editGoods = params => ajax.put('/goods', params);
export const deleteGoods = id => ajax.delete(`/goods/${id}`);
export const goodsDetail = id => ajax.get(`/goods/${id}`);
