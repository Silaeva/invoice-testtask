import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const Buyer = (props) => {
  
  const {currentBuyerId, buyers} = props;

  const currentBuyer = buyers.find((buyer) => buyer.id === currentBuyerId);

  return (
    <div className="content">
      <h1 className="content__title">{currentBuyer.name}</h1>
      <div className="content__buyer buyer">
        <ul className="buyer__list">
          <li className="buyer__data">
            <p className="buyer__text">Средний чек</p>
            <p className="buyer__number">{currentBuyer.average_check}</p>
          </li>
          <li className="buyer__data">
            <p className="buyer__text">Количество покупок</p>
            <p className="buyer__number">{currentBuyer.purchases_number}</p>
          </li>
          <li className="buyer__data">
            <p className="buyer__text">Общая выручка</p>
            <p className="buyer__number">{currentBuyer.total_billing}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

Buyer.propTypes = {
  currentBuyerId: PropTypes.string.isRequired,
  buyers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    average_check: PropTypes.number.isRequired,
    purchases_number: PropTypes.number.isRequired,
    total_billing: PropTypes.number.isRequired
  }))
}

const mapStateToProps = (state) => ({
  buyers: state.buyers
})

export {Buyer};
export default connect(mapStateToProps)(Buyer);
