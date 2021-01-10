import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addTerminal, deleteTerminal} from "../store/action";
import {nanoid} from "nanoid";

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
    <div className="content terminals">
      <h1 className="content__title">Терминалы</h1>

      <div className="terminals__wrapper">
        <form className="terminals__form" action="#" onSubmit={(evt) => evt.preventDefault()}>
          <ul className="terminals__list">
            <li className="terminals__item">
              <label className="terminals__label" htmlFor="name">Название терминала</label>
              <input className="terminals__input" type="text" name="name" id="name" placeholder="" onChange={changeInput} value={input.name} />
            </li>
            <li className="terminals__item">
              <label className="terminals__label" htmlFor="description">Описание</label>
              <textarea className="terminals__input" type="text" name="description" id="description" onChange={changeInput} value={input.description} cols="40" rows="2"></textarea>
            </li>
          </ul>
  
          {isValid ? <p className="terminals__prompt">&nbsp;</p> : <p className="terminals__prompt">Введите название и описание терминала<br/> (не менее 5 знаков)</p>}
  
          <button className="terminals__submit" type="submit" onClick={handleSubmit} disabled={!isValid}>Добавить</button>
        </form>
  
        <div className="terminals__added">
          <h2 className="terminals__added-title">Список терминалов</h2>
          <table className="terminals__table">
            <tbody>
              <tr className="terminals__row terminals__row--header">
                <th className="terminals__table-header terminals__table-header--name">Название</th>
                <th className="terminals__table-header terminals__table-header--desc">Описание</th>
                <th className="terminals__table-header terminals__table-header--delete"></th>
              </tr>
              {
                terminals.map((terminal) => {
                  return (
                  <tr className="terminals__row" key={terminal.name + terminal.id}>
                    <td className="terminals__cell">{terminal.name}</td>
                    <td className="terminals__cell">{terminal.description}</td>
                    <td className="terminals__cell terminals__cell--delete"><button  className="terminals__delete-btn" type="button" aria-label="Удалить терминал" onClick={deleteHandler} data-id={terminal.id}></button></td>
                  </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
</div>
    </div>
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