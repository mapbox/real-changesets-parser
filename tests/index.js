const fs = require('fs');
const tape = require('tape');
const elementParser = require('../index.js').elementParser;

const filenames = fs.readdirSync('tests/data', { encoding: 'utf-8' });

filenames.forEach(filename => {
  const tests = JSON.parse(fs.readFileSync(`tests/data/${filename}`));
  tests.forEach(({input, output : expectedOutput}, i) => {
    tape(`testing ${filename}, test ${i + 1}`, t => {
      const actualOutput = elementParser(input);
      t.deepEqual(actualOutput, expectedOutput, 'parsing');
      t.end();
    })
  });
});
