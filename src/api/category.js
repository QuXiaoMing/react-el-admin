import ajax from '@/utils/ajax';

export const getCategoryList = params => ajax.get('/category', {params});
export const deleteCategory = id => ajax.delete(`/category/${id}`);
