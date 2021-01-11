import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Content} from "../Content/Content";
import styles from "./buyer.module.scss";

const Buyer = (props) => {
  
  const {currentBuyerId, buyers} = props;

  const currentBuyer = buyers.find((buyer) => buyer.id === currentBuyerId);

  return (
    <Content title={currentBuyer.name} >
      <div className={styles["buyer"]}>
        <ul className={styles["buyer__list"]}>
          <li className={styles["buyer__data"]}>
            <p className={styles["buyer__text"]}>Средний чек</p>
            <p className={styles["buyer__number"]}>{currentBuyer.average_check}</p>
          </li>
          <li className={styles["buyer__data"]}>
            <p className={styles["buyer__text"]}>Количество покупок</p>
            <p className={styles["buyer__number"]}>{currentBuyer.purchases_number}</p>
          </li>
          <li className={styles["buyer__data"]}>
            <p className={styles["buyer__text"]}>Общая выручка</p>
            <p className={styles["buyer__number"]}>{currentBuyer.total_billing}</p>
          </li>
        </ul>
      </div>
    </Content>
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
