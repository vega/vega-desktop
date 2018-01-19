import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
  className: PropTypes.string,
  onLoad: PropTypes.func,
};
const defaultProps = {
  className: '',
  onLoad() {},
};

const Div = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all .2s;
  background-color: ${props => props.isOver ? '#D0A645' : 'none'}
`;

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
      <Div
        isOver={isOver}
        className={className}
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
      </Div>
    );
  }
}

DropArea.propTypes = propTypes;
DropArea.defaultProps = defaultProps;

export default DropArea;
