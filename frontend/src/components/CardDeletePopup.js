import React from 'react';
import { PopupWithForm } from './PopupWithForm';

function CardDeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onCardDelete();
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="remove"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default CardDeletePopup;
