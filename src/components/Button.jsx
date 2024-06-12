import React, { Component } from 'react';
import css from '../styles.module.css';

class Button extends Component {
  render() {
    return (
      <button className={css.Button} onClick={this.props.onClick}>
        Load more
      </button>
    );
  }
}
export default Button;