import React from 'react'
import PropTypes from 'prop-types'
import {ObservableArray} from 'mobx'
import { observer } from 'mobx-react'
import DataGrid, { buildPagination, buildRowRenderer, buildHeaders } from './DataGrid'

@observer
class DataBrowser extends React.Component {
  render() {
    const {
      Grid,
      children,
      headerBuilder,
      rowRendererBuilder,
      filterModel,
      filters,
      paginationBuilder,
      ...otherProps
    } = this.props
    console.log(filterModel.data, filterModel.data.peek())
    return (
      <div>
        {filters}
        <Grid
          headers={headerBuilder(children, filterModel)}
          data={filterModel.data.peek()}
          renderBodyRow={rowRendererBuilder(children)}
          {...otherProps}
        />
        {filterModel.pageCount > 0 ? paginationBuilder(filterModel.page, filterModel.pageCount, filterModel.setPage) : null}
      </div>
    )
  }
}

DataBrowser.propTypes = {
  filterModel: PropTypes.shape({
    data: PropTypes.instanceOf(ObservableArray),
    page: PropTypes.number,
    pageCount: PropTypes.number,
    setPage: PropTypes.func,
  }).isRequired,
  filters: PropTypes.node.isRequired,
  Grid: PropTypes.func.isRequired,
  rowRendererBuilder: PropTypes.func.isRequired,
  headerBuilder: PropTypes.func.isRequired,
  paginationBuilder: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

DataBrowser.defaultProps = {
  Grid: DataGrid,
  rowRendererBuilder: buildRowRenderer,
  headerBuilder: buildHeaders,
  paginationBuilder: buildPagination,
}

export default DataBrowser
