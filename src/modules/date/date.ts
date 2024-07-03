import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import objectSupport from 'dayjs/plugin/objectSupport';

dayjs.extend(objectSupport);

import 'dayjs/locale/ru';

dayjs.extend(utc);

export const dateFn = dayjs;
