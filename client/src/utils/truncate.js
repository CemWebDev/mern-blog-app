export const truncate = (text = '', n = 160) =>
  text.length > n ? text.slice(0, n).trim() + '…' : text;