import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ onCardClick, card, onCardLike, onDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser.id;
  // const isLiked = card.likes.some((i) => i._id === currentUser.id);

  const isLiked = card.likes.some((id) => id === currentUser.id);

  console.log(currentUser.id, "currentUser.id");
  console.log(card.likes, "card.likes");
  //  const isLiked = card.likes && card.likes.length > 0 && card.likes.some(i => i._id === currentUser.id);
  console.log(card, "card");

  const cardLikeButtonClassName = `element__button-like ${
    isLiked && 'element__button-like_active'
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
    // console.log(card.likes.length, "card.likes handleLikeClick");
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
