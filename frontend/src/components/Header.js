import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={headerLogo} />
      <div className="header__container">
        {email && location.pathname === '/' ? <p className="header__email">{email}</p> : null}
        {location.pathname === '/' ? (
          <Link to="/sign-in" className="header__link header__link_exit" onClick={onSignOut}>
            Выйти
          </Link>
        ) : null}
        {location.pathname === '/sign-in' ? (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        ) : null}
        {location.pathname === '/sign-up' ? (
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
