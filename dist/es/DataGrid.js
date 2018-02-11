'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildHeaders = exports.buildRowRenderer = exports.buildPagination = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _segmentize = require('segmentize');

var _segmentize2 = _interopRequireDefault(_segmentize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DataGrid = function DataGrid(_ref) {
  var headers = _ref.headers,
      data = _ref.data,
      renderBodyRow = _ref.renderBodyRow,
      otherProps = _objectWithoutProperties(_ref, ['headers', 'data', 'renderBodyRow']);

  return _react2.default.createElement(_semanticUiReact.Table, _extends({
    celled: true,
    sortable: true,
    headerRow: headers,
    renderBodyRow: renderBodyRow,
    tableData: data
  }, otherProps));
};

var _default = DataGrid;
exports.default = _default;
var buildPagination = exports.buildPagination = function buildPagination(currentPage, pageCount, setPageHandle) {
  var handleItemClick = function handleItemClick(e, _ref2) {
    var page = _ref2.page;
    return setPageHandle(page);
  };

  var segments = (0, _segmentize2.default)({
    currentPage: currentPage,
    pageCount: pageCount,
    beginPages: 1,
    endPages: 1,
    sidePages: 1
  });

  return _react2.default.createElement(
    _semanticUiReact.Menu,
    { pagination: true },
    segments.beginPages.map(function (page) {
      return _react2.default.createElement(_semanticUiReact.Menu.Item, { key: page, page: page, active: false, onClick: handleItemClick });
    }),
    segments.previousPages.length && Math.min.apply(Math, _toConsumableArray(segments.previousPages)) - Math.max.apply(Math, _toConsumableArray(segments.beginPages)) > 1 ? _react2.default.createElement(
      _semanticUiReact.Menu.Item,
      { disabled: true },
      '...'
    ) : null,
    segments.previousPages.map(function (page) {
      return _react2.default.createElement(_semanticUiReact.Menu.Item, { key: page, page: page, active: false, onClick: handleItemClick });
    }),
    segments.centerPage.map(function (page) {
      return _react2.default.createElement(_semanticUiReact.Menu.Item, { key: page, page: page, active: true, onClick: handleItemClick });
    }),
    segments.nextPages.map(function (page) {
      return _react2.default.createElement(_semanticUiReact.Menu.Item, { key: page, page: page, active: false, onClick: handleItemClick });
    }),
    segments.nextPages.length && Math.min.apply(Math, _toConsumableArray(segments.endPages)) - Math.max.apply(Math, _toConsumableArray(segments.nextPages)) > 1 ? _react2.default.createElement(
      _semanticUiReact.Menu.Item,
      { disabled: true },
      '...'
    ) : null,
    segments.endPages.map(function (page) {
      return _react2.default.createElement(_semanticUiReact.Menu.Item, { key: page, page: page, active: false, onClick: handleItemClick });
    })
  );
};

var buildRowRenderer = exports.buildRowRenderer = function buildRowRenderer(children) {
  return function (row, i) {
    // children.forEach(element => {
    //   if (typeof element == 'function') {
    //     return element(row)
    //   }
    //
    //   return {
    //     content: React.cloneElement(child, { model: row }),
    //     key,
    //   }
    // })
    var cells = _react2.default.Children.map(children, function (child, key) {
      return {
        content: _react2.default.cloneElement(child, { model: row }),
        key: key
      };
    });

    return {
      key: 'row-' + i,
      // warning: !!(status && status.match('Requires Action')),
      cells: cells
    };
  };
};

var buildHeaders = exports.buildHeaders = function buildHeaders(children, filterModel) {
  return _react2.default.Children.map(children, function (child) {
    var sort = void 0;
    switch (filterModel.getSort(child.props.path)) {
      case 1:
        sort = 'ascending';
        break;
      case -1:
        sort = 'descending';
        break;
    }
    return _react2.default.createElement(
      _semanticUiReact.Table.HeaderCell,
      { onClick: function onClick() {
          return filterModel.handleSort(child.props.path);
        }, sorted: sort },
      child.props.path
    );

    return child.props.label || child.props.path;
  });
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DataGrid, 'DataGrid', 'src/DataGrid.jsx');

  __REACT_HOT_LOADER__.register(buildPagination, 'buildPagination', 'src/DataGrid.jsx');

  __REACT_HOT_LOADER__.register(buildRowRenderer, 'buildRowRenderer', 'src/DataGrid.jsx');

  __REACT_HOT_LOADER__.register(buildHeaders, 'buildHeaders', 'src/DataGrid.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/DataGrid.jsx');
}();

;