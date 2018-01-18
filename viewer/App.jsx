import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: '',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'vega',
      filePath: null,
      spec: null,
      watching: false,
    };
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <div>
          <div className="menubar">
            <div className="float-right">
              <div className="toggle-group">
                <button className="button -purple center" id="vega-btn">Vega</button>
                <button className="button -gray center" id="vega-lite-btn">Vega-lite</button>
              </div>
            </div>
            <button className="button -gray center" id="load-btn">Load file</button>
            <button className="button -gray center" id="watch-btn">Watch</button>
          </div>
          <div className="container">
            <div className="inner-container">
              <div id="vis"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
