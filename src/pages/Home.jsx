import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../const";

const Home = (props) => {
  const {authorizationStatus} = props;

  return (
    <div className="content home-page">
      <h1 className="content__title">Главная страница</h1>

      <p className="home-page__text">Водолей: Вы можете заснуть или быть укушенным мухой (крокодилом). Ваши волосы должны быть черными, как у бегемота. Сегодня вы сами должны решить: будете ли вы теперь прыгать с кровати или ползать по полу. Кальций важен в укреплении лбов.</p>
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