# Vega-Desktop

> App for viewing visualizations created in Vega or Vega-lite

**Download:**
[Linux armv7l](https://goo.gl/8VEuXm) |
[Linux x32](https://goo.gl/uNajxR) |
[Linux x64](https://goo.gl/VWewhu) |
[Mac OS X](https://goo.gl/FFSemx) |
[Windows x32](https://goo.gl/kigTqS) |
[Windows x64](https://goo.gl/i7hZ56)

![Vega-Desktop](images/v1.0.0.gif)

#### Features

- Can read both vega and vega-lite files.
- Save output as `svg` or `png` from UI.
- Can determine the file format if the extension is `*.vg.json` or `*.vl.json`.
- If the extension is just `*.json`, will check for `$schema` field in the JSON spec.
- Otherwise will try to parse as vega-lite, then vega.
- It will load external data files relative to the spec files directory.

You also can set your OS to have `*.vg.json` or `*.vl.json` opened with vega-desktop by default.

![Open files with vega-desktop](images/open_with.png)

**Download:**
[Linux armv7l](https://goo.gl/8VEuXm) |
[Linux x32](https://goo.gl/uNajxR) |
[Linux x64](https://goo.gl/VWewhu) |
[Mac OS X](https://goo.gl/FFSemx) |
[Windows x32](https://goo.gl/kigTqS) |
[Windows x64](https://goo.gl/i7hZ56)

## Dev

```bash
yarn install
npm start
```

### Build

```bash
npm run build
```

Builds the app for OS X, Linux, and Windows, using [electron-packager](https://github.com/electron-userland/electron-packager).


## License

MIT © [Krist Wongsuphasawat](http://kristw.yellowpigz.com)
