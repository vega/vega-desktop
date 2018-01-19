const vegaSchemaUrlParser = require('vega-schema-url-parser').default;

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

function getFormatFromSpec(spec) {
  if(spec.$schema) {
    const { library } = vegaSchemaUrlParser(spec.$schema);
    if (library === 'vega-lite') {
      return FORMAT.VEGA_LITE;
    } else if (library === 'vega') {
      return FORMAT.VEGA;
    }
  }
  return FORMAT.UNKNOWN;
}

module.exports = {
  FORMAT,
  getFormatFromFileName,
  getFormatFromSpec
};
