import ajax from '@/utils/ajax';

// export const login = params => ajax.post('user', params);
export const dicList = params => ajax.get('/dic', {params});
export const deleteDic = id => ajax.delete(`/dic/${id}`);
