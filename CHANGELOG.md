# v1.2.0

Can load data files relative to the spec file.

# v1.1.0

Can use as a default app to open file .vl.json and .vg.json.

# v1.0.0

First version. Can read both vega and vega-lite files.
Can determine the file format if the extension is *.vg.json or *.vl.json.
If the extension is just *.json, will check for $schema field in the JSON spec.
Otherwise will try to parse as vega-lite, then vega.
