import React, {forwardRef} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MaterialTable from "material-table";
import Search from '@material-ui/icons/Search';

const BuyersMaterial = (props) => {
  const {buyers} = props;

  const columns = [
    {
      title: 'ID покупателя', 
      field: 'id', 
      sorting: false, 
      filtering: false,
      render: rowData => <Link to={"/buyers/" + rowData.id} style={{color: '#000000'}}>{rowData.id}</Link>
    },
    {title: 'Имя покупателя', field: 'name', sorting: false},
    {title: 'Средний чек', field: 'average_check', type: 'numeric', filtering: false},
    {title: 'Количество покупок', field: 'purchases_number', type: 'numeric', filtering: false},
    {title: 'Общая выручка', field: 'total_billing', type: 'numeric', filtering: false},
  ];

  return (
    <div className="content">
      <h1 className="content__title">Покупатели</h1>
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
    </div>
  );
};

BuyersMaterial.propTypes = {
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

export {BuyersMaterial};
export default connect(mapStateToProps)(BuyersMaterial);
