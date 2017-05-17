# v1.2.0

Can load data files relative to the spec file.

# v1.1.0

Can use as a default app to `vega` and `vega-lite` spec files.

**Download:**
[Mac OS X](https://drive.google.com/open?id=0B3gNKxO3XU4dVUprd0VSZUEyUWM) |
[Windows x32](https://drive.google.com/open?id=0B3gNKxO3XU4dM0h0XzA1X1pnMkk) |
[Windows x64](https://drive.google.com/open?id=0B3gNKxO3XU4dTThFUDNDR2ROQTQ) |
[Linux x32](https://drive.google.com/open?id=0B3gNKxO3XU4dWFdfaU52RFVXMFk) |
[Linux x64](https://drive.google.com/open?id=0B3gNKxO3XU4dTVcyWk1Nd0JMekU) |
[Linux armv7l](https://drive.google.com/open?id=0B3gNKxO3XU4dY0dEOGluakNEa1E)

# v1.0.0

First version. Can read both `vega` and `vega-lite` spec files.
Can determine the file format if the extension is `*.vg.json` or `*.vl.json`.
If the extension is just `*.json`, will check for `$schema` field in the JSON spec.
Otherwise will try to parse as vega-lite, then vega.
