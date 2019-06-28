import ajax from '@/utils/ajax';

export const login = option => ajax.post('login', option);
