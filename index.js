var R = require('ramda');
var featureCollection = require('@turf/helpers').featureCollection;
var elementParser = require('./parsers/element');

var changesetParser = R.pipe(
  R.prop(['elements']),
  R.map(elementParser),
  R.flatten,
  featureCollection
);

module.exports = changesetParser;
