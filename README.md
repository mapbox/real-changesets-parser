⚠️ This repo is archived because it is no longer used and no stacks are running.  
Previously used only in transferred and discontinued mapbox/osmcha project.  
Shutdown [ticket in Jira](https://mapbox.atlassian.net/browse/RTSR-479) for reference.

---

Convert JSONs returned by [osm-adiff-parser](https://github.com/mapbox/osm-adiff-parser) to proper geojsons.

**Setup**

```sh
npm install --save real-changesets-parser
```

**Usage**

```js
var changesetParser = require('real-changesets-parser');
changestParser(json) // => geojson
```
