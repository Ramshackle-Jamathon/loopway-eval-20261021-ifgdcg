const seconds = { s: 1, m: 60, h: 3600 };

export function parseDuration(value) {
  if (typeof value !== 'string') throw new TypeError('Duration must be a string');
  const match = /^(\d+)(s|m|h)$/.exec(value.trim());
  if (!match) throw new RangeError('Invalid duration');
  return Number(match[1]) * seconds[match[2]];
}
