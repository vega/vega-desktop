# Vega-Desktop

> App for viewing visualizations created in Vega or Vega-lite

**Download:**
[Mac OS X](https://drive.google.com/open?id=0B3gNKxO3XU4dVUprd0VSZUEyUWM) |
[Windows x32](https://drive.google.com/open?id=0B3gNKxO3XU4dM0h0XzA1X1pnMkk) |
[Windows x64](https://drive.google.com/open?id=0B3gNKxO3XU4dTThFUDNDR2ROQTQ) |
[Linux x32](https://drive.google.com/open?id=0B3gNKxO3XU4dWFdfaU52RFVXMFk) |
[Linux x64](https://drive.google.com/open?id=0B3gNKxO3XU4dTVcyWk1Nd0JMekU) |
[Linux armv7l](https://drive.google.com/open?id=0B3gNKxO3XU4dY0dEOGluakNEa1E)

![Vega-Desktop](images/v1.0.0.gif)

#### Features

- Can read both vega and vega-lite files.
- Can determine the file format if the extension is `*.vg.json` or `*.vl.json`.
- If the extension is just `*.json`, will check for `$schema` field in the JSON spec.
- Otherwise will try to parse as vega-lite, then vega.

You also can set your OS to have `*.vg.json` or `*.vl.json` opened with vega-desktop by default.

![Open files with vega-desktop](images/open_with.png)

**Download:**
[Mac OS X](https://drive.google.com/open?id=0B3gNKxO3XU4dVUprd0VSZUEyUWM) |
[Windows x32](https://drive.google.com/open?id=0B3gNKxO3XU4dM0h0XzA1X1pnMkk) |
[Windows x64](https://drive.google.com/open?id=0B3gNKxO3XU4dTThFUDNDR2ROQTQ) |
[Linux x32](https://drive.google.com/open?id=0B3gNKxO3XU4dWFdfaU52RFVXMFk) |
[Linux x64](https://drive.google.com/open?id=0B3gNKxO3XU4dTVcyWk1Nd0JMekU) |
[Linux armv7l](https://drive.google.com/open?id=0B3gNKxO3XU4dY0dEOGluakNEa1E)

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
