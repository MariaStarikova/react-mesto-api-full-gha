import React, { useEffect, useState } from 'react';
import { PopupWithForm } from './PopupWithForm';

function AddPlacePopup(props) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    if (!props.isOpen) {
      setImage('');
      setDescription('');
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      description,
      image
    });
  }

  function handleChangeImage(e) {
    setImage(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-name"
        name="input-name"
        type="text"
        className="popup__input popup__input_mesto"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={description || ''}
        onChange={handleChangeDescription}
        required
      />
      <span className="popup__input-error input-name-error"></span>
      <input
        id="input-link"
        name="input-link"
        type="url"
        className="popup__input popup__input_image"
        placeholder="Ссылка на картинку"
        value={image || ''}
        onChange={handleChangeImage}
        required
      />
      <span className="popup__input-error input-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
