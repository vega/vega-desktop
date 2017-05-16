# Vega-Desktop

> App for viewing visualizations created in Vega or Vega-lite

![Vega-Desktop](images/v1.0.0.gif)

- Can read both vega and vega-lite files.
- Can determine the file format if the extension is `*.vg.json` or `*.vl.json`.
- If the extension is just `*.json`, will check for `$schema` field in the JSON spec.
- Otherwise will try to parse as vega-lite, then vega.

- You can set your OS to have `*.vg.json` or `*.vl.json` opened with vega-desktop by default.

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
