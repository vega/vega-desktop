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
    if(spec.$schema.indexOf('https://vega.github.io/schema/vega-lite') > -1) {
      return FORMAT.VEGA_LITE;
    } else if (spec.$schema.indexOf('https://vega.github.io/schema/vega') > -1) {
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
