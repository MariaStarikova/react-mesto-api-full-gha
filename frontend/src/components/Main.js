import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const cards = props.cards || [];
  console.log(cards, "cards");
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__avatar"
            alt="Фото профиля"
            src={currentUser ? currentUser.avatar : ''}
            style={{ backgroundImage: `url(${currentUser ? currentUser.avatar : ''})` }}
          />
          <button
            type="button"
            className="profile__button-avatar"
            aria-label="Редактировать фото"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{currentUser ? currentUser.name : ''}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser ? currentUser.about : ''}</p>
        </div>
        <button
          type="submit"
          className="profile__add-button"
          aria-label="Добавить контент"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {/* {cards.map((card, i) => (
            <li key={card._id}>
              <Card
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onDeleteClick={props.onDeleteClick}
              />
            </li>
          ))} */}
          {Array.isArray(cards) && cards.map(card => (
            
  <li key={card._id}>
    <Card
      card={card}
      onCardClick={props.onCardClick}
      onCardLike={props.onCardLike}
      onDeleteClick={props.onDeleteClick}
    />
  </li>
))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
