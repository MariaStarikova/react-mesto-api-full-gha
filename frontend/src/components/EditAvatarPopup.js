import React, { useEffect, useRef } from 'react';
import { PopupWithForm } from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef(null);

  useEffect(() => {
    if (!props.isOpen) {
      avatarRef.current.value = '';
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="input-avatar"
        name="input-avatar"
        type="url"
        className="popup__input popup__input_avatar"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        required
      />
      <span className="popup__input-error input-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
