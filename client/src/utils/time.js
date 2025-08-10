export const relative = (date, locale = 'tr-TR') => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d)) return '';

  const now = new Date();
  const diff = d.getTime() - now.getTime();
  const abs = Math.abs(diff);

  const min = 60_000,
    hour = 3_600_000,
    day = 86_400_000;

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (abs < 30_000) return locale.startsWith('tr') ? 'az önce' : 'just now';
  if (abs < hour) return rtf.format(Math.round(diff / min), 'minute');
  if (abs < day) return rtf.format(Math.round(diff / hour), 'hour');

  const days = Math.round(diff / day);
  if (Math.abs(days) === 1)
    return locale.startsWith('tr') ? 'dün' : rtf.format(days, 'day');
  return rtf.format(days, 'day');
};
