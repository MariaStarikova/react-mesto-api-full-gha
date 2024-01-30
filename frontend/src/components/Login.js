import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
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
    // console.log('email:', email);
    // console.log('password:', password);
    handleLogin({ password, email });
  }

  return (
    <section className="login">
      <div className="form__container">
        <form className="form__user" onSubmit={handleSubmit}>
          <h2 className="form__title">Вход</h2>
          <input
            className="form__input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
            required
          ></input>
          <span className="form__input-error input-title-error"></span>
          <input
            className="form__input"
            type="password"
            name="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            value={password}
            onChange={handleChangePassword}
            required
          ></input>
          <span className="form__input-error input-title-error"></span>
          <button className="form__button-submit" type="submit">
            Войти
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
