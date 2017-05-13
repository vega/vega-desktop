# v1.0.0

First version. Can read both vega and vega-lite files.
Can determine the file format if the extension is *.vg.json or *.vl.json.
If the extension is just *.json, will check for $schema field in the JSON spec.
Otherwise will try to parse as vega-lite, then vega.