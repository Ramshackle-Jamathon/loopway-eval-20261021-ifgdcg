import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDuration } from '../src/parse-duration.js';

test('parses one whole-number unit', () => {
  assert.equal(parseDuration('10s'), 10);
  assert.equal(parseDuration('2m'), 120);
  assert.equal(parseDuration('1h'), 3600);
  assert.equal(parseDuration(' 0s '), 0);
  assert.equal(parseDuration('001m'), 60);
});

test('adds compound durations with or without whitespace in any unit order', () => {
  assert.equal(parseDuration('1h 30m'), 5400);
  assert.equal(parseDuration('2h15m10s'), 8110);
  assert.equal(parseDuration('10s 15m 2h'), 8110);
  assert.equal(parseDuration('0h0m0s'), 0);
});

test('parses fractional amounts in each unit and in compound durations', () => {
  assert.equal(parseDuration('1.5h'), 5400);
  assert.equal(parseDuration('0.25m'), 15);
  assert.equal(parseDuration('0.5s'), 0.5);
  assert.equal(parseDuration('1.5h0.25m0.5s'), 5415.5);
});

test('accepts mixed case and surrounding and inter-component whitespace', () => {
  assert.equal(parseDuration(' \t2H\n15m\t10S\r\n'), 8110);
  assert.equal(parseDuration(' 1.5H '), 5400);
});

test('rejects repeated units including different cases and zero amounts', () => {
  for (const value of ['1h2h', '1m 2M', '1s0s', '0H0h', '1h2m3H']) {
    assert.throws(() => parseDuration(value), RangeError, value);
  }
});

test('rejects empty input, negative amounts, unsupported formats, and leftover junk', () => {
  for (const value of [
    '', ' \t\n', 'tomorrow', '-1s', '1h-2m', '-0s', '+1m',
    '1d', '1h 2d', '1ms', '1', 'h', '1 h',
    'junk1h', '1h junk', '1h,2m', '1h2', '1h 2m?',
    '1..5h', '1.5.5m', '1e3s', 'NaNs', 'Infinityh',
  ]) {
    assert.throws(() => parseDuration(value), RangeError, JSON.stringify(value));
  }
});

test('rejects non-finite amounts, converted values, and combined totals', () => {
  for (const value of [
    `${'9'.repeat(400)}s`,
    `1${'0'.repeat(305)}h`,
    `1${'0'.repeat(308)}s 2${'0'.repeat(306)}m`,
  ]) {
    assert.throws(() => parseDuration(value), RangeError);
  }
  assert.equal(parseDuration(`1${'0'.repeat(300)}s`), 1e300);
});

test('rejects non-string inputs with TypeError', () => {
  for (const value of [30, null, undefined, true, {}, [], new String('1s')]) {
    assert.throws(() => parseDuration(value), TypeError);
  }
});
