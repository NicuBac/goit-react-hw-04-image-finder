import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

export class App extends Component {
  state = {
    key: "43969251-edc4279aa2b454d97699fd257",
    query: '',
    images: [],
    loading: false,
    page: 1,
    showModal: false,
    modalImage: ''
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true, page: 1 }, async () => {
      try {
        const response = await axios.get(`https://pixabay.com/api/?q=${this.state.query}&page=1&key=${this.state.key}&image_type=photo&orientation=horizontal&per_page=12`);
        this.setState({ images: response.data.hits });
      } catch (error) {
        console.error('Error fetching images: ', error);
      }
      this.setState({ loading: false });
    });
  };

  loadMoreImages = async () => {
    this.setState({ loading: true, page: this.state.page + 1 });

    try {
      const response = await axios.get(`https://pixabay.com/api/?q=${this.state.query}&page=${this.state.page + 1}&key=${this.state.key}&image_type=photo&orientation=horizontal&per_page=12`);
      this.setState(prevState => ({ images: [...prevState.images, ...response.data.hits] }));
    } catch (error) {
      console.error('Error fetching more images: ', error);
    }

    this.setState({ loading: false });
  };

  openModal = (image) => {
    this.setState({ showModal: true, modalImage: image.largeImageURL });
  };
  closeModal = () => {
    this.setState({ showModal: false, modalImage: '' });
  };

  setQuery = (query) => {
    this.setState({ query });
  }

  render() {
    const { images, loading, showModal, modalImage } = this.state;

    return (
      <div>
        <Searchbar setQuery={query => this.setQuery(query)} onSubmit={this.handleSubmit} />
        <ImageGallery images={images} openModal={this.openModal} />
        {loading && <Loader />}
        {images.length > 0 && <Button onClick={this.loadMoreImages} />}
        {showModal && <Modal closeModal={this.closeModal} modalImage={modalImage} />}
      </div>
    );
  }
}