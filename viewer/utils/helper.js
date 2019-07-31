import fs from 'fs';
import vegaSchemaUrlParser from 'vega-schema-url-parser';

export const FORMAT = {
  VEGA: 'vega',
  VEGA_LITE: 'vega-lite',
  UNKNOWN: 'unknown'
};

const VEGA_PATTERN = /[.]vg[.]json$/i;
const VEGA_LITE_PATTERN = /[.]vl[.]json$/i;

export function getFormatFromFileName(fileName) {
  if (VEGA_PATTERN.test(fileName)) {
    return FORMAT.VEGA;
  }

  if (VEGA_LITE_PATTERN.test(fileName)) {
    return FORMAT.VEGA_LITE;
  }

  return FORMAT.UNKNOWN;
}

export function getFormatFromSpec(spec, fallback = FORMAT.UNKNOWN) {
  if (spec.$schema) {
    const {library} = vegaSchemaUrlParser(spec.$schema);
    if (library === 'vega-lite') {
      return FORMAT.VEGA_LITE;
    }

    if (library === 'vega') {
      return FORMAT.VEGA;
    }
  }

  return fallback;
}

export function readVegaFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject('An error occurred reading the file :' + err.message);
        return;
      }

      const formatFromFile = getFormatFromFileName(filePath);

      try {
        const spec = JSON.parse(data);
        resolve({
          spec,
          format: getFormatFromSpec(spec, formatFromFile)
        });
      } catch (error) {
        reject(`Error: ${error.message}`);
      }
    });
  });
}
