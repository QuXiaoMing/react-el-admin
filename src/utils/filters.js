import dayjs from 'dayjs';

export const dateFormate = (date, formater = 'YYYY-MM-DD HH:mm:ss') => dayjs(date).format(formater);
