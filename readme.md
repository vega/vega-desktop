# Vega-Desktop

> App for viewing visualizations created in Vega or Vega-lite

**Download:**
[Mac OS X](https://drive.google.com/open?id=0B3gNKxO3XU4dX1cwUks1Y2hXTk0) |
[Windows x32](https://drive.google.com/open?id=0B3gNKxO3XU4dMkRTVFRRQ09BTDA) |
[Windows x64](https://drive.google.com/open?id=0B3gNKxO3XU4dbldwQW5PaVlQeTA) |
[Linux x32](https://drive.google.com/open?id=0B3gNKxO3XU4dRll2Z0VXU3lfZmc) |
[Linux x64](https://drive.google.com/open?id=0B3gNKxO3XU4dMHFPOW1UeEFwX2M) |
[Linux armv7l](https://drive.google.com/open?id=0B3gNKxO3XU4da2RtYnc3YW1oS1E)

![Vega-Desktop](images/v1.0.0.gif)

#### Features

- Can read both vega and vega-lite files.
- Can determine the file format if the extension is `*.vg.json` or `*.vl.json`.
- If the extension is just `*.json`, will check for `$schema` field in the JSON spec.
- Otherwise will try to parse as vega-lite, then vega.
- It will load external data files relative to the spec files directory.

You also can set your OS to have `*.vg.json` or `*.vl.json` opened with vega-desktop by default.

![Open files with vega-desktop](images/open_with.png)

**Download:**
[Mac OS X](https://drive.google.com/open?id=0B3gNKxO3XU4dX1cwUks1Y2hXTk0) |
[Windows x32](https://drive.google.com/open?id=0B3gNKxO3XU4dMkRTVFRRQ09BTDA) |
[Windows x64](https://drive.google.com/open?id=0B3gNKxO3XU4dbldwQW5PaVlQeTA) |
[Linux x32](https://drive.google.com/open?id=0B3gNKxO3XU4dRll2Z0VXU3lfZmc) |
[Linux x64](https://drive.google.com/open?id=0B3gNKxO3XU4dMHFPOW1UeEFwX2M) |
[Linux armv7l](https://drive.google.com/open?id=0B3gNKxO3XU4da2RtYnc3YW1oS1E)

## Dev

```bash
$ yarn install
$ npm start
```

### Build

```
$ npm run build
```

Builds the app for OS X, Linux, and Windows, using [electron-packager](https://github.com/electron-userland/electron-packager).


## License

MIT © [Krist Wongsuphasawat](http://kristw.yellowpigz.com)
