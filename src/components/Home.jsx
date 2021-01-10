import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../helpers/const";

const Home = (props) => {
  const {authorizationStatus} = props;

  return (
    <div className="content home-page">
      <h1 className="content__title">Главная страница</h1>

      <p className="home-page__text">Компьютеры коренным образом изменили жизнь каждого человека. Несколько десятилетий назад люди даже не знали ничего об этих электронных устройствах, тогда как в наши дни даже маленький ребенок может управлять этой машиной. Почти все современные технологии зависит от компьютеров, которые используются для хранения данных: файлов, секретной информации, банковских операций и прочего.</p>
      {
        authorizationStatus === AuthorizationStatus.NO_AUTH 
        ?
        <React.Fragment>
          <p className="home-page__text home-page__text--auth">Для получения доступа ко всем возможностям приложения необходимо авторизоваться</p>
          <Link className="home-page__to-auth" to="/login">Авторизоваться</Link>
        </React.Fragment>
        :
        ''
      }
    </div>  
  )
}


Home.propTypes = {
  authorizationStatus: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus
});

export {Home};
export default connect(mapStateToProps)(Home);