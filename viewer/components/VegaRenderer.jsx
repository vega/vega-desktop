import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import { FORMAT } from '../utils/helper';
const vg = require('vega');
const vl = require('vega-lite');

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: '',
};

class VegaRenderer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.view = null;
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  showError(msg) {
    this.container.innerHTML = msg;
  }

  update() {
    const { spec, mode, filePath } = this.props;
    if(spec) {
      let vegaSpec;

      if (mode === FORMAT.VEGA_LITE) {
        try {
          vegaSpec = vl.compile(spec).spec;
        } catch (ex) {
          this.showError(`Invalid vega-lite spec: ${ex.message}`);
          return;
        }
      } else if (mode === FORMAT.UNKNOWN) {
        try {
          vegaSpec = vl.compile(spec).spec;
        } catch (ex) {
          vegaSpec = spec;
        }
      } else {
        vegaSpec = spec;
      }

      // Clear existing view
      if (this.view) {
        this.view.finalize();
      }
      this.container.innerHTML = '';

      try {
        const runtime = vg.parse(vegaSpec);

        // Tell loader to resolve data and image files
        // relative to the spec file
        const loader = new vg.loader({
          baseURL: path.dirname(filePath),
          mode: 'file'
        });

        this.view = new vg.View(runtime, { loader })
          .initialize(this.container)
          .hover()
          .run();
      } catch (ex) {
        this.showError(`Invalid vega spec: ${ex.message}`);
      }
    }
  }

  render() {
    const { className, filePath } = this.props;
    return (
      <div
        className={className}
        ref={c => { this.container = c; }}
      />
    );
  }
}

VegaRenderer.propTypes = propTypes;
VegaRenderer.defaultProps = defaultProps;

export default VegaRenderer;
