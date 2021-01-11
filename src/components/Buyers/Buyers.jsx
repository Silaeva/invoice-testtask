import React, {forwardRef} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MaterialTable from "material-table";
import Search from '@material-ui/icons/Search';
import {Content} from '../Content/Content';
import styles from "./buyers.module.scss";

const Buyers = (props) => {
  const {buyers} = props;

  const columns = [
    {
      title: 'ID покупателя', 
      field: 'id', 
      sorting: false, 
      filtering: false,
      render: rowData => <Link className={styles["buyers__link"]} to={"/buyers/" + rowData.id}>{rowData.id}</Link>
    },
    {title: 'Имя покупателя', field: 'name', sorting: false},
    {title: 'Средний чек', field: 'average_check', type: 'numeric', filtering: false},
    {title: 'Количество покупок', field: 'purchases_number', type: 'numeric', filtering: false},
    {title: 'Общая выручка', field: 'total_billing', type: 'numeric', filtering: false},
  ];

  return (
    <Content title="Покупатели">
      <MaterialTable 
        search={false}
        columns={columns} 
        data={buyers}
        options={{
          toolbar: false,
          showFirstLastPageButtons: false,
          pageSizeOptions: [5, 10, 15],
          filtering: true
        }}
        localization={{
          pagination: {
            labelDisplayedRows: '{from}-{to} из {count}',
            labelRowsSelect: 'строк',
            previousTooltip: 'Предыдущая страница',
            nextTooltip: 'Следующая страница'
          },
          body: {
            emptyDataSourceMessage: 'Нет данных',
            filterRow: {
                filterTooltip: 'Фильтр'
            }
        }
        }}
        icons={{Filter: forwardRef((props, ref) => <Search {...props} ref={ref} />)}}
        />
    </Content>
  );
};

Buyers.propTypes = {
  buyers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    average_check: PropTypes.number.isRequired,
    purchases_number: PropTypes.number.isRequired,
    total_billing: PropTypes.number.isRequired
  }))
};

const mapStateToProps = (state) => ({
  buyers: state.buyers
});

export {Buyers};
export default connect(mapStateToProps)(Buyers);
