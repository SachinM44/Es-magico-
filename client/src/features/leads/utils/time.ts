import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { LeadStatus } from '@prisma/client';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export const userTz = (): string => dayjs.tz.guess() || 'UTC';

export const isToday = (date: string | Date | null | undefined, tz: string = userTz()): boolean => {
  if (!date) return false;
  return dayjs(date).tz(tz).isSame(dayjs().tz(tz), 'day');
};

export const isOverdue = (
  date: string | Date | null | undefined,
  status: LeadStatus,
  tz: string = userTz(),
): boolean => {
  if (!date) return false;
  if (status === 'WON' || status === 'LOST') return false;
  const now = dayjs().tz(tz);
  return dayjs(date).tz(tz).isBefore(now);
};

export const fromNow = (date: string | Date): string => dayjs(date).fromNow();
