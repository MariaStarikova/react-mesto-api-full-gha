import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ onCardClick, card, onCardLike, onDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser.id;
  const isLiked = card.likes.some(i => i._id === currentUser.id);
  const cardLikeButtonClassName = `element__button-like ${
    isLiked && 'element__button-like_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  // console.log(onCardLike);

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="element">
      {isOwn && (
        <button
          type="button"
          className="element__button-remove"
          aria-label="Удалить"
          onClick={() => onDeleteClick(card)}
        ></button>
      )}
      <img src={card.link} className="element__image" alt={card.name} onClick={handleClick} />
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравиться"
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-number">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
