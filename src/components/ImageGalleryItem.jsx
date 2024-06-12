import React, { Component } from 'react';
import css from '../styles.module.css';

class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.openModal(this.props.image);
  };

  render() {
    const { image } = this.props;
    return (
        <li className={css.ImageGalleryItem} onClick={this.handleClick}>
          <img src={image.webformatURL} alt="" className={css['ImageGalleryItem-image']} />
      </li>
    );
  }
}

export default ImageGalleryItem;