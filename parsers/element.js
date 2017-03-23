var R = require('ramda');
var turf = require('@turf/helpers');
var createBbox = require('@turf/bbox');
var createBboxPolygon = require('@turf/bbox-polygon');

function ElementParser(json) {
  function createFeature(data) {
    switch(data.type) {
      case 'node':
        return createNode(data);
      case 'way':
        return createWay(data);
      case 'relation':
        return createRelation(data);
    }
  }

  function createNode(data) {
    var geometry = [data.lon, data.lat].map(parseFloat);
    var properties = R.omit(['lon', 'lat'], data);
    return turf.point(geometry, properties);
  }

  function createWay(data) {
    var geometry = data.nodes.map(function(node) {
      return [node.lon, node.lat].map(parseFloat);
    });
    var properties = R.omit(['nodes'], data);
    return turf.lineString(geometry, properties);
  }

  function createRelation(data) {
    if ('members' in data) {
        data.relations = data.members.map(createFeature).filter(R.complement(R.isNil)); // filter out nulls
        var feature = createBboxPolygon(createBbox(turf.featureCollection(data.relations)));
        feature.properties = R.omit(['members'], data);
        return feature;
    }
    return null;
  }

  // If the feature was deleted, copy its
  // geometry from the old feature
  if (json.action === 'delete') {
    switch(json.type) {
      case 'node':
        json.lon = json.old.lon;
        json.lat = json.old.lat;
        break;
      case 'way':
        json.nodes = json.old.nodes;
        break;
      case 'relation':
        json.members = json.old.members;
        break;
    }
  }

  // Set change type
  switch(json.action) {
    case 'create':
      json.changeType = 'added';
      break;
    case 'delete':
      json.changeType = 'deletedNew';
      json.old.changeType = 'deletedOld';
      break;
    case 'modify':
      json.changeType = 'modifiedNew';
      json.old.changeType = 'modifiedOld';
      break;
  }

  return (
    'old' in json
      ? [R.omit(['old'], json), json.old]
      : [json]
    ).map(createFeature);
}

module.exports = ElementParser;
