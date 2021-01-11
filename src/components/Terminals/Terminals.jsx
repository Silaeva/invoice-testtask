import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addTerminal, deleteTerminal} from "../../store/action";
import {nanoid} from "nanoid";
import {Content} from "../Content/Content";
import styles from "./terminals.module.scss";

const Terminals = (props) => {
  const {onSubmit, onDelete, terminals} = props;

  const [input, setInput] = useState({
    name: '',
    description: ''
  });

  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit({
      name: input.name,
      description: input.description,
      id: nanoid()
    });

    setInput(Object.assign({}, input, {
      name: '',
      description: ''
    }));

    setIsValid(false);
  };

  useEffect(() => { //по изменению поля формы меняется стейт isValid
    setIsValid(input.name.length >= 5 && input.description.length >= 5);
  }, [input.name, input.description])


  const changeInput = (evt) => {
    setInput(Object.assign({}, input, {
      [evt.target.name]: evt.target.value
    }))
  };

  const deleteHandler = (evt) => {
    onDelete(evt.target.dataset.id);
  };

  return (
    <Content title="Терминалы">

      <div className={styles["terminals__wrapper"]}>
        <form className={styles["terminals__form"]} action="#" onSubmit={(evt) => evt.preventDefault()}>
          <ul className={styles["terminals__list"]}>
            <li className={styles["terminals__item"]}>
              <label className={styles["terminals__label"]} htmlFor="name">Название терминала</label>
              <input className={styles["terminals__input"]} type="text" name="name" id="name" placeholder="" onChange={changeInput} value={input.name} />
            </li>
            <li className={styles["terminals__item"]}>
              <label className={styles["terminals__label"]} htmlFor="description">Описание</label>
              <textarea className={styles["terminals__input"]} type="text" name="description" id="description" onChange={changeInput} value={input.description} cols="40" rows="2"></textarea>
            </li>
          </ul>
  
          {isValid ? <p className={styles["terminals__prompt"]}>&nbsp;</p> : <p className={styles["terminals__prompt"]}>Введите название и описание терминала<br/> (не менее 5 знаков)</p>}
  
          <button className={styles["terminals__submit"]} type="submit" onClick={handleSubmit} disabled={!isValid}>Добавить</button>
        </form>
  
        <div className={styles["terminals__added"]}>
          <h2 className={styles["terminals__added-title"]}>Список терминалов</h2>
          <table className={styles["terminals__table"]}>
            <tbody>
              <tr className={styles["terminals__row"] + " " +["terminals__row--header"]}>
                <th className={styles["terminals__table-header"] + " " +["terminals__table-header--name"]}>Название</th>
                <th className={styles["terminals__table-header"] + " " +["terminals__table-header--desc"]}>Описание</th>
                <th className={styles["terminals__table-header"] + " " +["terminals__table-header--delete"]}></th>
              </tr>
              {
                terminals.map((terminal) => {
                  return (
                  <tr className={styles["terminals__row"]} key={terminal.name + terminal.id}>
                    <td className={styles["terminals__cell"]}>{terminal.name}</td>
                    <td className={styles["terminals__cell"]}>{terminal.description}</td>
                    <td className={styles["terminals__cell"] + " " +["terminals__cell--delete"]}>
                      <button className={styles["terminals__delete-btn"]} type="button" aria-label="Удалить терминал" onClick={deleteHandler} data-id={terminal.id}>
                      </button>
                    </td>
                  </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </Content>
  );
};

Terminals.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  terminals: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }))
};

const mapStateToProps = (state) => ({
  terminals: state.terminals
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(inputData) {
    dispatch(addTerminal(inputData))
  },
  onDelete(id) {
    dispatch(deleteTerminal(id))
  }
});

export {Terminals};
export default connect(mapStateToProps, mapDispatchToProps)(Terminals);