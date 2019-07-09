import ajax from '@/utils/ajax';

export const getRoleList = () => ajax.get('role');