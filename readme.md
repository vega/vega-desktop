# Vega-Desktop

> App for viewing visualizations created in Vega or Vega-Lite.

**Download from [GitHub releases](https://github.com/vega/vega-desktop/releases).**

To download versions before 2.0, please see [CHANGELOG](CHANGELOG.md).

![Vega-Desktop](images/v1.4.2.png)
![Vega-Desktop](images/v1.0.0.gif)

#### Features

- Can read both Vega and Vega-Lite files.
- Save output as `svg` or `png` from UI.
- Can determine the file format if the extension is `*.vg.json` or `*.vl.json`.
- If the extension is just `*.json`, will check for `$schema` field in the JSON spec.
- Otherwise will try to parse as Vega-Lite, then Vega.
- It will load external data files relative to the spec files directory.

You also can set your OS to have `*.vg.json` or `*.vl.json` opened with vega-desktop by default.

![Open files with vega-desktop](images/open_with.png)

## Dev

```bash
yarn
yarn start
```

### Build

```bash
yarn build
```

Builds the app for OS X, Linux, and Windows, using [electron-packager](https://github.com/electron-userland/electron-packager).


### Release

* Run `yarn version`
* Upload the binaries to the [release page](https://github.com/vega/vega-desktop/releases).
