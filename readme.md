# Vega-Desktop

> App for viewing visualizations created in Vega or Vega-lite

**Download:**
[Mac OS X](https://goo.gl/XVh72p) |
[Windows x32](https://goo.gl/uWR6zp) |
[Windows x64](https://goo.gl/UQW4pb) |
[Linux x32](https://goo.gl/3ubjNT) |
[Linux x64](https://goo.gl/bnDnMC) |
[Linux armv7l](https://goo.gl/2kkuau)

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
[Mac OS X](https://goo.gl/XVh72p) |
[Windows x32](https://goo.gl/uWR6zp) |
[Windows x64](https://goo.gl/UQW4pb) |
[Linux x32](https://goo.gl/3ubjNT) |
[Linux x64](https://goo.gl/bnDnMC) |
[Linux armv7l](https://goo.gl/2kkuau)

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
