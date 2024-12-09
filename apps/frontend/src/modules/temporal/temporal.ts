import dayjs, { Dayjs, extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import objectSupport from 'dayjs/plugin/objectSupport';

import 'dayjs/locale/ru';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(objectSupport);

export const dateFn = dayjs;
