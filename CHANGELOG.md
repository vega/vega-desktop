# v1.3.0

Add "Watch Mode".

1. Open the file in `vega-desktop` and enable watch.
2. Then use any preferred editor to modify the vega json file.
3. Save.
4. See changes appear in `vega-desktop` automatically.

# v1.2.1

Use `vega-schema-url-parser` instead of manual parsing. [Issue #1](https://github.com/kristw/vega-desktop/issues/1)

**Download:**
[Mac OS X](https://drive.google.com/open?id=0B3gNKxO3XU4dX1cwUks1Y2hXTk0) |
[Windows x32](https://drive.google.com/open?id=0B3gNKxO3XU4dMkRTVFRRQ09BTDA) |
[Windows x64](https://drive.google.com/open?id=0B3gNKxO3XU4dbldwQW5PaVlQeTA) |
[Linux x32](https://drive.google.com/open?id=0B3gNKxO3XU4dRll2Z0VXU3lfZmc) |
[Linux x64](https://drive.google.com/open?id=0B3gNKxO3XU4dMHFPOW1UeEFwX2M) |
[Linux armv7l](https://drive.google.com/open?id=0B3gNKxO3XU4da2RtYnc3YW1oS1E)

# v1.2.0

Can load data files relative to the spec file.

**Download:**
[Mac OS X](https://drive.google.com/open?id=0B3gNKxO3XU4dYjNwckZMb1NtU2M) |
[Windows x32](https://drive.google.com/open?id=0B3gNKxO3XU4dWGhjb09Fbzl1LVU) |
[Windows x64](https://drive.google.com/open?id=0B3gNKxO3XU4dTVNOSmd1aTNVUjg) |
[Linux x32](https://drive.google.com/open?id=0B3gNKxO3XU4dS1hpUWRPbkd0cUU) |
[Linux x64](https://drive.google.com/open?id=0B3gNKxO3XU4dQUdVU2JjZWJVcDg) |
[Linux armv7l](https://drive.google.com/open?id=0B3gNKxO3XU4dLXFaS01BLURrOVE)

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
