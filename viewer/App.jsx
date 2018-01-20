import chokidar from 'chokidar';
import { remote } from 'electron';
import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import DropArea from './components/DropArea';
import { FORMAT, readVegaFile } from './utils/helper';
import { showOpenDialog, showSaveDialog } from './utils/dialog';
import VegaRenderer from './components/VegaRenderer';
import downloadURI from './utils/downloadURI';

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
      filePath: null,
      format: 'vega',
      watching: false,
      loading: false,
      spec: null,
      error: null,
    };
    this.view = null;
    this.watcher = null;
  }

  componentDidMount() {
    const incomingFilePath = remote.getCurrentWindow().extraInfo.filePath;
    if (incomingFilePath) {
      this.handleFile(incomingFilePath);
    }
  }

  componentDidUpdate() {
    const { filePath } = this.state;
    if (filePath) {
      document.title = `Vega Desktop - ${filePath}`;
    } else {
      document.title = 'Vega Desktop';
    }
  }

  handleFile(filePath) {
    this.readFile(filePath);
    if (this.state.watching) {
      this.watch(filePath);
    }
  }

  readFile(filePath) {
    this.setState({
      filePath,
      loading: true,
      error: null,
    });
    readVegaFile(filePath).then(
      data => {
        this.setState({
          loading: false,
          spec: data.spec,
          format: data.format,
        });
      },
      error => {
        this.setState({
          loading: false,
          error
        });
      }
    )
  }

  exportFile(type) {
    if (this.vega) {
      this.vega.exportFile(type)
        .then(
          file => {
            downloadURI(file, `snapshot.${type}`);
          },
          error => {
            alert(error);
          }
        );
    }
  }

  toggleWatch() {
    const { watching } = this.state;
    if (watching) {
      this.unwatch();
    } else {
      this.watch();
    }
    this.setState({ watching: !watching });
  }

  watch() {
    const { filePath } = this.state;
    if (filePath) {
      this.unwatch();
      this.watcher = chokidar.watch(filePath)
        .on('change', () => {
          this.readFile(filePath);
        });
    }
  }

  unwatch() {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
  }

  render() {
    const { format, watching, spec, filePath } = this.state;
    const { className } = this.props;

    return (
      <DropArea
        onLoad={filePath => {
          this.handleFile(filePath);
        }}
      >
        <div className="menubar">
          <div className="float-right">
            <div className="toggle-group">
              <button
                className={format === FORMAT.VEGA ? '-purple' : '-gray'}
                onClick={() => {
                  this.setState({ format: FORMAT.VEGA });
                }}
              >
                Vega
              </button>
              <button
                className={format === FORMAT.VEGA_LITE ? '-purple' : '-gray'}
                onClick={() => {
                  this.setState({ format: FORMAT.VEGA_LITE });
                }}
              >
                Vega-Lite
              </button>
            </div>
          </div>
          <button
            className="-gray"
            onClick={() => {
              showOpenDialog().then(
                filePath => this.handleFile(filePath),
                error => this.setState({ error }),
              );
            }}
          >
            Load...
          </button>
          <button
            className={watching ? '-gold' : '-gray'}
            onClick={() => {
              this.toggleWatch();
            }}
          >
            Watch
          </button>
          <button
            className="-gray"
            onClick={() => {
              this.exportFile('svg');
            }}
          >
            Export SVG
          </button>
          <button
            className="-gray"
            onClick={() => {
              this.exportFile('png');
            }}
          >
            Export PNG
          </button>
        </div>
        <div className="container">
          <div className="inner-container">
            <VegaRenderer
              ref={c => { this.vega = c; }}
              className="vis"
              format={format}
              spec={spec}
              filePath={filePath}
            />
          </div>
        </div>
      </DropArea>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
