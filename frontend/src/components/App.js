import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CardDeletePopup from './CardDeletePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkToken(token) //это работает
        .then(res => {
          if (res.data) {
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate('/', { replace: true });
          }
        })
        .catch(err => {
          console.error(err);
          localStorage.clear();
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      //здесь ломается передача токена
      Promise.all([api.getInfoUser(), api.getInitialCards()])
        .then(([userInfo, cardsData]) => {
          setCurrentUser({
            name: userInfo.data.name,
            about: userInfo.data.about,
            avatar: userInfo.data.avatar,
            id: userInfo.data._id
          });
          setCards(cardsData.data);
        })
        .catch(error => {
          console.error(`Ошибка при получении данных: ${error}`);
        });
    }
  }, [loggedIn]);

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsRegisterSuccess(true);
        navigate('/sign-in', { replace: true });
      })
      .catch(err => {
        console.log(err);
        setIsRegisterSuccess(false);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin({ password, email }) {
    auth
      .authorize(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token);
        setEmail(email);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch(err => {
        console.log(err);
        setIsRegisterSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser.id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then(newCard => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch(err => {
          console.error(`Ошибка: ${err}`);
          console.log('card like error')
        });
      return;
    } else {
      api
        .removeLike(card._id)
        .then(newCard => {
          setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
        })
        .catch(err => {
          console.error(`Ошибка: ${err}`);
        });
      return;
    }
  }

  function handleCardDelete() {
    api
      .deleteCard(selectedCardToDelete._id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== selectedCardToDelete._id));
        closeAllPopups();
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeleteClick(card) {
    // console.log(card);
    setIsCardDeletePopupOpen(true);
    setSelectedCardToDelete(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    // console.log(card);
    // console.log(handleCardClick);
  }

  function closeAllPopups() {
    // console.log('Попапы закрыты');
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(user) {
    api
      .updateUserInfo(user)
      .then(updatedFields => {
        setCurrentUser(prevUser => ({
          ...prevUser,
          name: updatedFields.data.name || prevUser.name,
          about: updatedFields.data.about || prevUser.about
        }));
        closeAllPopups();
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateUserAvatar(data)
      .then(updatedData => {
        setCurrentUser(prevUser => ({
          ...prevUser,
          avatar: updatedData.data.avatar || prevUser.avatar
        }));
        closeAllPopups();
      })
      .catch(err => {
        console.error(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then(newCard => {
        setCards(cards => {
          if (!Array.isArray(cards)) {
            console.error('cards is not an array:', cards);
            return [newCard];
          }
          return [newCard, ...cards];
        });
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header loggedIn={loggedIn} email={email} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register handleRegister={handleRegister} isRegisterSuccess={isRegisterSuccess} />
            }
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} loggedIn={loggedIn} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onDeleteClick={handleDeleteClick}
                onCardLike={handleCardLike}
                cards={cards}
                setCards={setCards}
              />
            }
          />
        </Routes>
        {loggedIn && <Footer />}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          success={isRegisterSuccess}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <CardDeletePopup
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={() => handleCardDelete(selectedCardToDelete)}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;