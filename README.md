Convert JSONs returned by [osm-adiff-parser](https://github.com/mapbox/osm-adiff-parser) to proper geojsons.

**Setup**

```sh
npm install --save real-changesets-parser
```

**Usage**

```js
var parser = require('real-changesets-parser');

parser(json) // => geojson
```
