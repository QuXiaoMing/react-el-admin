import SystermStore from '../store/Systerm';

export const getRoleName = id => SystermStore.getRole(id).name;