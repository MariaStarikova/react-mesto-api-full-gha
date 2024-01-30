import React, { useEffect, useState } from 'react';
import { PopupWithForm } from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser && props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-title"
        name="input-title"
        type="text"
        className="popup__input popup__input_title"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleChangeName}
        required
      />
      <span className="popup__input-error input-title-error"></span>
      <input
        id="input-description"
        name="input-description"
        type="text"
        className="popup__input popup__input_subtitle"
        placeholder="Описание"
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleChangeDescription}
        required
      />
      <span className="popup__input-error input-description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
