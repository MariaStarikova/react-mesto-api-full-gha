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
    console.log("useEffect token исполняется");
    console.log(localStorage);
    const token = localStorage.getItem('jwt');
    console.log("token в useEffect", token);
    if (token) {
      auth
        .checkToken(token) 
        .then(res => { 
          if (res) { 
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
      Promise.all([api.getInfoUser(), api.getInitialCards()])
        .then(([userInfo, cardsData]) => {
          setCurrentUser({
            name: userInfo.name,
            about: userInfo.about,
            avatar: userInfo.avatar,
            id: userInfo._id
          });
          setCards(cardsData);
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
        console.log('handleRegister email:', email);
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

  //  function handleLogin(email, password) {
  //   try {
  //     const data = auth.authorize(email, password);
  //     console.log('handleLogin email and token:', email, data.token);

  //     if (data.token) {
  //       localStorage.setItem('token', data.token);
  //       setEmail(email);
  //       setLoggedIn(true);
  //       navigate('/', { replace: true });
  //     }
  //   } catch (err) {
  //       console.log(err);
  //       setIsRegisterSuccess(false);
  //       setIsInfoTooltipOpen(true);
  //   }
  //  }

  // function handleLogin({ email, password }) {

  //   const data = auth.authorize(email, password);
  //   console.log("data.token:", data.token);
  //   // auth
  //   //   .authorize(email, password)
  //   data
  //     .then(res => {
  //       return res.json;
  //     })
  //     .then(res => {
  //       // if (res.token) {
  //       //   console.log('handleLogin email:', email, res.token);
  //       //   localStorage.setItem("jwt", res.token);
  //       //   setEmail(`${email}`);
  //       //   setLoggedIn(true);
  //       //   navigate("/", { replace: true });
  //       // }
  //       // console.log('handleLogin email:', email, res.token);
  //       // localStorage.setItem('jwt', res.token);
  //       // setEmail(email);
  //       // setLoggedIn(true);
  //       // navigate('/', { replace: true })
  //       try {
  //         console.log('handleLogin email:', email, res.token);
  //         localStorage.setItem('jwt', res.token);
  //         setEmail(email);
  //         setLoggedIn(true);
  //         navigate('/', { replace: true });
  //       } catch (error) {
  //         console.error('Error in handleLogin:', error);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setIsRegisterSuccess(false);
  //       setIsInfoTooltipOpen(true);
  //     });
  // }

  function handleLogin({ email, password }) { 
    auth 
      .authorize(email, password) 
      .then(res => { 
        localStorage.setItem('jwt', res.token); 
        setEmail(email); 
        console.log('email:', email); 
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
    const isLiked = card.likes.some(i => i._id === currentUser.id);

    if (!isLiked) {
      api
        .addLike(card._id)
        .then(newCard => {
          setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
        })
        .catch(err => {
          console.error(`Ошибка: ${err}`);
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
          name: updatedFields.name || prevUser.name,
          about: updatedFields.about || prevUser.about
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
          avatar: updatedData.avatar || prevUser.avatar
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
        setCards([newCard, ...cards]);
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
