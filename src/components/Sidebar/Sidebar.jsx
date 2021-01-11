import React, {useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../helpers/const";
import styles from "./sidebar.module.scss";

const Sidebar = (props) => {
  const {authorizationStatus, user} = props;

  const [isMenuOpened, setIsMenuOpened] = useState(false);
 
  const sidebarClass = isMenuOpened ? styles["sidebar"] : styles["sidebar"] + " " + styles["sidebar--closed"];
  const buttonClass = isMenuOpened ? styles["sidebar__btn"] : styles["sidebar__btn"] + " " + styles["sidebar__btn--closed"];
  const shadeClass = isMenuOpened ? styles["sidebar__shade"] : styles["sidebar__shade"] + " " + styles["sidebar__shade--closed"];

  const closeSidebarHandler = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <React.Fragment>
        <aside className={sidebarClass}>
          <div className={styles["sidebar__img-section"]}>
            {
              authorizationStatus === AuthorizationStatus.AUTH
              ?
              <img className={styles["sidebar__img"]} src={user.avatar_url} alt="аватар пользователя" width="100" height="100"/>
              :
              <div className={styles["sidebar__img-placeholder"]}>Фото</div>
            }
          </div>
    
          <nav className={styles["sidebar__nav"]}>
            <ul className={styles["sidebar__list"]}>
              <li><Link className={styles["sidebar__link"]} to="/">Главная</Link></li>
              <li><Link className={styles["sidebar__link"]} to="/terminals">Терминалы</Link></li>
              <li><Link className={styles["sidebar__link"]} to="/buyers">Покупатели</Link></li>
            </ul>
          </nav>
    
          <button className={buttonClass} aria-label="открыть навигацию" onClick={closeSidebarHandler}></button>
    
          <footer className={styles["sidebar__footer"]}>
          <p className={styles["sidebar__copyright"]}>Copyright &copy; <time dateTime="2020">2020</time></p>
          </footer>
        </aside>
        <div className={shadeClass} onClick={closeSidebarHandler}></div>
    </React.Fragment>
  )
}

Sidebar.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
  user: state.user
});

export {Sidebar};
export default connect(mapStateToProps)(Sidebar);
