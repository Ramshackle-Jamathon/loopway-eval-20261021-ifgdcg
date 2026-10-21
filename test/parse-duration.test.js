import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDuration } from '../src/parse-duration.js';

test('parses one whole-number unit', () => {
  assert.equal(parseDuration('10s'), 10);
  assert.equal(parseDuration('2m'), 120);
  assert.equal(parseDuration('1h'), 3600);
});

test('rejects unsupported input', () => {
  assert.throws(() => parseDuration(30), TypeError);
  assert.throws(() => parseDuration(''), RangeError);
  assert.throws(() => parseDuration('tomorrow'), RangeError);
});
