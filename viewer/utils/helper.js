import vegaSchemaUrlParser from 'vega-schema-url-parser';

const FORMAT = {
  VEGA: 'vega',
  VEGA_LITE: 'vega-lite',
  UNKNOWN: 'unknown'
};

const VEGA_PATTERN = /[.]vg[.]json$/i;
const VEGA_LITE_PATTERN = /[.]vl[.]json$/i;

function getFormatFromFileName(fileName) {
  if(VEGA_PATTERN.test(fileName)) {
    return FORMAT.VEGA;
  } else if(VEGA_LITE_PATTERN.test(fileName)){
    return FORMAT.VEGA_LITE;
  }
  return FORMAT.UNKNOWN;
}

function getFormatFromSpec(spec, fallback = FORMAT.UNKNOWN) {
  if(spec.$schema) {
    const { library } = vegaSchemaUrlParser(spec.$schema);
    if (library === 'vega-lite') {
      return FORMAT.VEGA_LITE;
    } else if (library === 'vega') {
      return FORMAT.VEGA;
    }
  }
  return fallback;
}

module.exports = {
  FORMAT,
  getFormatFromFileName,
  getFormatFromSpec
};
