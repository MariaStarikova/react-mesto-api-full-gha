import success from '../images/succes.svg';
import fail from '../images/fail.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_info ${props.isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <div className="popup__form">
          <img className="popup__image-status" src={props.success ? success : fail} />
          <h2 className="popup__title_info">
            {props.success
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте еще раз.'}
          </h2>
        </div>
        <button
          type="button"
          className="popup__close-button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
