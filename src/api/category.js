import ajax from '@/utils/ajax';

export const getCategoryList = params => ajax.get('/category', {params});
export const createCategory = params => ajax.post('/category', params);
export const deleteCategory = id => ajax.delete(`/category/${id}`);
export const getCategoryTree = () => findCategoryByParentId({parentId: 0});
export const findCategoryByParentId = ({parentId, tree = true}) => ajax.get('/category/findByParentId', {params: {parentId, tree}});
