import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export const userTz = (): string =>
  Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

export const isToday = (iso: string | Date | null | undefined): boolean => {
  if (!iso) return false;
  const tz = userTz();
  return dayjs(iso).tz(tz).isSame(dayjs().tz(tz), 'day');
};

export const isOverdue = (iso: string | Date | null | undefined): boolean => {
  if (!iso) return false;
  const tz = userTz();
  const now = dayjs().tz(tz);
  const target = dayjs(iso).tz(tz);
  return target.isBefore(now, 'day');
};

export const fromNow = (iso: string | Date): string => dayjs(iso).fromNow();

export { dayjs };
