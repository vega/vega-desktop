import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  onLoad: PropTypes.func,
};
const defaultProps = {
  className: '',
  onLoad() {},
};

class DropArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOver: false,
    };
  }

  render() {
    const { className, children } = this.props;
    const { isOver } = this.state;

    return (
      <div
        className={`${className} drop-area ${isOver ? 'landing': ''}`}
        onDragOver={() => {
          this.setState({ isOver: true });
          return false;
        }}
        onDragLeave={() => {
          this.setState({ isOver: false });
          return false;
        }}
        onDrop={e => {
          e.preventDefault();
          e.stopPropagation();
          this.setState({ isOver: false });
          const file = e.dataTransfer.files[0];
          this.props.onLoad(file.path);
          return false;
        }}
      >
        {children}
      </div>
    );
  }
}

DropArea.propTypes = propTypes;
DropArea.defaultProps = defaultProps;

export default DropArea;
