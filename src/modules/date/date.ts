import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import 'dayjs/locale/ru';

dayjs.extend(utc);

export const dateFn = dayjs;
