import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ handleRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(email, password);
  }

  return (
    <section className="register">
      <div className="form__container">
        <form className="form__user" onSubmit={handleSubmit}>
          <h2 className="form__title">Регистрация</h2>
          <input
            className="form__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
            required
          ></input>
          <span className="form__input-error input-title-error"></span>
          <input
            className="form__input"
            type="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            value={password}
            onChange={handleChangePassword}
            required
          ></input>
          <span className="form__input-error input-title-error"></span>
          <button className="form__button-submit" type="submit">
            Зарегистрироваться
          </button>
          <Link className="form__link" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
