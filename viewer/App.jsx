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
import styled from 'styled-components';
const vg = require('vega');
const vl = require('vega-lite');

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: '',
};

const MenuBar =  styled.div`
  background-color: #eee;
  padding: 5px;
  position: fixed;
  width: 100%;
  z-index: 100;
`

const StatusBar = styled.div`
  background-color: #efefef;
  padding: 5px 8px;
  font-size: 0.8em;
  text-align: right;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
`

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
        <MenuBar>
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
            <i className="fa fa-folder-open" aria-hidden="true" />
            &nbsp;Load...
          </button>
          <button
            className={watching ? '-gold' : '-gray'}
            onClick={() => {
              this.toggleWatch();
            }}
          >
            <i className="fa fa-refresh" aria-hidden="true" />
            &nbsp;Watch
          </button>
          <button
            className="-gray"
            onClick={() => {
              this.exportFile('svg');
            }}
          >
            <i className="fa fa-download" aria-hidden="true" />
            &nbsp;SVG
          </button>
          <button
            className="-gray"
            onClick={() => {
              this.exportFile('png');
            }}
          >
            <i className="fa fa-download" aria-hidden="true" />
            &nbsp;PNG
          </button>
        </MenuBar>
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
        <StatusBar>
          {format === FORMAT.VEGA_LITE
            ? `Vega-Lite v${vl.version}`
            : `Vega v${vg.version}`}
        </StatusBar>
      </DropArea>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
