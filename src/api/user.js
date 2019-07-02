import ajax from '@/utils/ajax';

// export const login = params => ajax.post('user', params);
export const userList = params => ajax.get('/user', {params});
