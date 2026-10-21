const seconds = { s: 1, m: 60, h: 3600 };

export function parseDuration(value) {
  if (typeof value !== 'string') throw new TypeError('Duration must be a string');
  const input = value.trim();
  if (!input) throw new RangeError('Invalid duration');

  const component = /(\d+(?:\.\d+)?)(s|m|h)\s*/iy;
  const seen = new Set();
  let position = 0;
  let total = 0;

  while (position < input.length) {
    component.lastIndex = position;
    const match = component.exec(input);
    if (!match) throw new RangeError('Invalid duration');

    const unit = match[2].toLowerCase();
    if (seen.has(unit)) throw new RangeError('Repeated duration unit');
    seen.add(unit);
    total += Number(match[1]) * seconds[unit];
    if (!Number.isFinite(total)) throw new RangeError('Duration must be finite');
    position = component.lastIndex;
  }

  return total;
}
