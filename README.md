Convert JSONs returned by [osm-adiff-parser](https://github.com/mapbox/osm-adiff-parser) to proper geojsons.

**Setup**

```sh
npm install --save real-changesets-parser
```

**Usage**

```js
import R from "ramda"
import { featureCollection } from "@turf/helpers"
import changesetParser from "real-changesets-parser"

const toGeojson = R.pipe(
  R.prop(["elements"]),
  R.map(changesetParser),
  R.flatten,
  featureCollection
)

toGeojson(json) // => geojson
```
