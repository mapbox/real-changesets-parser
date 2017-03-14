const fs = require('fs');
const tape = require('tape');
const parser = require('../index.js');

const filenames = fs.readdirSync('tests/data', { encoding: 'utf-8' });

filenames.forEach(filename => {
  var tests = JSON.parse(fs.readFileSync(`tests/data/${filename}`));
  tests.forEach(({input, output : expectedOutput}, i) => {
    tape(`testing ${filename}, test ${i + 1}`, t => {
      var actualOutput = parser(input);
      t.deepEqual(actualOutput, expectedOutput, 'parsed correctly');
      t.end();
    })
  });
});
