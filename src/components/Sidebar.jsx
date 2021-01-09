import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../const";

const Sidebar = (props) => {
  const {authorizationStatus, user} = props;

  const [isMenuOpened, setIsMenuOpened] = useState(false);
 
  const sidebarClass = isMenuOpened ? 'sidebar' : 'sidebar sidebar--closed';
  const buttonClass = isMenuOpened ? 'sidebar__btn' : 'sidebar__btn sidebar__btn--closed';
  const shadeClass = isMenuOpened ? 'sidebar__shade' : 'sidebar__shade sidebar__shade--closed';

  const closeSidebarHandler = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <React.Fragment>
        <aside className={sidebarClass}>
          <div className="sidebar__img-section">
            {
              authorizationStatus === AuthorizationStatus.AUTH
              ?
              <img className="sidebar__img" src={user.avatar_url} alt="аватар пользователя" width="100" height="100"/>
              :
              <div className="sidebar__img-placeholder">Фото</div>
            }
          </div>
    
          <nav className="sidebar__nav">
            <ul className="sidebar__list">
              <li><Link className="sidebar__link" to="/">Главная</Link></li>
              <li><Link className="sidebar__link" to="/terminals">Терминалы</Link></li>
              <li><Link className="sidebar__link" to="/buyers">Покупатели</Link></li>
            </ul>
          </nav>
    
          <button className={buttonClass} aria-label="открыть навигацию" onClick={closeSidebarHandler}></button>
    
          <footer className="sidebar__footer">
          <p className="sidebar__copyright">Copyright &copy; <time dateTime="2020">2020</time></p>
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
