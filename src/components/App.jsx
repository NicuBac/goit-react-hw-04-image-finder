import React, { useState } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

export const App = () => {
  const [key] = useState("39728913-c0ee6c2d48ec23bc7f8279286");
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(1);

    try {
      const newQuery = e.target.elements[1].value;

      // Fetch images for the new query
      await fetchImages(newQuery);
    } catch (error) {
      console.error('Error fetching images: ', error);
    }

    setLoading(false);
  };

  const fetchImages = async (query) => {
    try {
      const response = await axios.get(`https://pixabay.com/api/?q=${query}&page=1&key=${key}&image_type=photo&orientation=horizontal&per_page=12`);
      setImages(response.data.hits);
    } catch (error) {
      console.error('Error fetching images: ', error);
    }
  };

  const loadMoreImages = async () => {
    setLoading(true);
    setPage(page + 1);

    try {
      const response = await axios.get(`https://pixabay.com/api/?q=${query}&page=${page + 1}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`);
      setImages(prevImages => [...prevImages, ...response.data.hits]);
    } catch (error) {
      console.error('Error fetching more images: ', error);
    }

    setLoading(false);
  };

  const openModal = (image) => {
    setShowModal(true);
    setModalImage(image.largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  return (
    <div>
      <Searchbar setQuery={setQuery} onSubmit={handleSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {loading && <Loader />}
      {images.length > 0 && <Button onClick={loadMoreImages} />}
      {showModal && <Modal closeModal={closeModal} modalImage={modalImage} />}
    </div>
  );
};