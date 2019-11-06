import ajax from '@/utils/ajax';

// export const login = params => ajax.post('user', params);
export const userList = params => ajax.get('/user', {params});
export const getUserInfo = id => ajax.get(`/user/${id}`);
export const deleteUser = ({id} = {}) => ajax.delete(`/user/${id}`);
export const editUserInfo = params => ajax.put('/user', params);
