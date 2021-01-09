import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadUser, setIsloading} from "../store/action";
import {PASSWORD_REGEXP} from "../const";

const Auth = (props) => {
  const {getUser, isUserLoading, isUserLoadError, isUserLoadSuccess, user} = props;

  const [isFormValid, setIsFormValid] = useState(false);
  const [input, setInput] = useState({
    login: '',
    password: ''
  });

  const changeInput = (evt) => { // обработчик изменения полей формы
    setInput(Object.assign({}, input, {
      [evt.target.name]: evt.target.value
    }));
  };
 
  useEffect(() => { //по изменению поля формы меняется стейт isFormValid
    setIsFormValid(input.login && PASSWORD_REGEXP.test(input.password));
  }, [input.login, input.password])

  const handleSubmit = (evt) => {
    evt.preventDefault();

    getUser(input.login); // запрос юзера с гитхаб

    setInput(Object.assign({}, input, { // обнуление полей формы
      login: '',
      password: ''
    }));
  };

  const getFormTemplate = () => {
    return (
      isUserLoadSuccess 
        ? 
        <div className="auth__success-wrapper" >
          <img className="auth__success-img" src={user.avatar_url} alt="аватар авторизованного пользователя" width="50" height="50" />
          <p className="auth__success-text">Привет, {user.name || user.login}!<br/> Вам открыты все возможности приложения</p>
        </div>
        :
        <form className="auth__form" action="#" onSubmit={(evt) => evt.preventDefault()} >
        <ul className="auth__list">
          <li className="auth__item">
            <label className="auth__label" htmlFor="login">Логин</label>
            <input className="auth__input" type="text" name="login" id="login" placeholder="Ваш логин на GitHub" onChange={changeInput} value={input.login} />
          </li>
          <li className="auth__item">
            <label className="auth__label" htmlFor="password">Пароль</label>
            <input className="auth__input" type="password" name="password" id="password" onChange={changeInput} value={input.password} placeholder="✱✱✱✱✱✱✱✱"/>
            
          </li>
        </ul>
        <ul className="auth__prompt" type="circle">
          Пароль должен быть
          <li>не менее 8 символов</li>
          <li>содержать хотя бы одну заглавную латинскую букву</li>
          <li>одну строчную латинскую букву</li>
          <li>одну цифру</li>
        </ul>
            {
              isUserLoadError ?
              <p className="auth__error">Упс.. Что-то пошло не так. Проверьте свой логин и попробуйте еще раз</p>
              :
              ''
            }
        <button className="auth__submit" type="submit" onClick={handleSubmit} disabled={!isFormValid && !isUserLoading}>
          {isUserLoading ? 'Загрузка...' : 'Войти'}
        </button>
        
      </form>
    )
  };

  return (
    <div className="content auth">
      <h1 className="content__title">Авторизация</h1>

      {getFormTemplate()}
    </div>
  );
};

Auth.propTypes = {
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  isUserLoading: state.isUserLoading,
  isUserLoadError: state.isUserLoadError,
  isUserLoadSuccess: state.isUserLoadSuccess
});

const mapDispatchToProps = (dispatch) => ({
  getUser(login) {
    dispatch(setIsloading(true));
    dispatch(loadUser(login));
  }
});

export {Auth};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
