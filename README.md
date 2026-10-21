# Loopway agent evaluation

A disposable repository for testing a real GitHub webhook → coding agent → pull request workflow in Loopway.

`parseDuration(string)` accepts one or more duration components and returns their total in seconds. Each component is a non-negative whole number or decimal (digits with an optional decimal point followed by digits) immediately followed by `h` (hours), `m` (minutes), `s` (seconds), or `ms` (milliseconds).

Units are case-insensitive, may appear in any order, and may each occur at most once. Leading and trailing whitespace and whitespace between components are allowed; components can also be adjacent.

```js
parseDuration('10s');       // 10
parseDuration('1h 30m');    // 5400
parseDuration('2h15m10s');  // 8110
parseDuration('1.5h');      // 5400
parseDuration('0.25m');     // 15
parseDuration(' 1H 30M '); // 5400
parseDuration('250ms');    // 0.25
parseDuration('1s250ms');  // 1.25
parseDuration('1m 500ms'); // 60.5
parseDuration('0.5ms');    // 0.0005
parseDuration('1ms2ms');   // throws RangeError (repeated milliseconds)
```

Empty strings, negative amounts, repeated units, unsupported units, leftover text, and non-finite totals throw `RangeError`. Non-string inputs throw `TypeError`.

Run `npm test`; there are no dependencies.

Evaluation pull requests must remain unmerged. This repository contains no production data.
