"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkinference_portal"] = self["webpackChunkinference_portal"] || []).push([["frontend_key_management_cost_monitoring_js"],{

/***/ "./frontend/key_management/cost_monitoring.js":
/*!****************************************************!*\
  !*** ./frontend/key_management/cost_monitoring.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/Container */ \"./node_modules/@mui/material/Container/Container.js\");\n/* harmony import */ var _component_navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/navbar */ \"./frontend/component/navbar.js\");\n/* harmony import */ var _component_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component/footer */ \"./frontend/component/footer.js\");\n/* harmony import */ var pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! pdfmake/build/vfs_fonts */ \"./node_modules/pdfmake/build/vfs_fonts.js\");\n/* harmony import */ var pdfmake_build_pdfmake_min__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! pdfmake/build/pdfmake.min */ \"./node_modules/pdfmake/build/pdfmake.min.js\");\n/* harmony import */ var pdfmake_build_pdfmake_min__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(pdfmake_build_pdfmake_min__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jszip */ \"./node_modules/jszip/dist/jszip.min.js\");\n/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var datatables_net_buttons_dt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! datatables.net-buttons-dt */ \"./node_modules/datatables.net-buttons-dt/js/buttons.dataTables.mjs\");\n/* harmony import */ var datatables_net_buttons_js_buttons_colVis_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! datatables.net-buttons/js/buttons.colVis.mjs */ \"./node_modules/datatables.net-buttons/js/buttons.colVis.mjs\");\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/Paper */ \"./node_modules/@mui/material/Paper/Paper.js\");\n/* harmony import */ var datatables_net_buttons_js_buttons_html5_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! datatables.net-buttons/js/buttons.html5.mjs */ \"./node_modules/datatables.net-buttons/js/buttons.html5.mjs\");\n/* harmony import */ var datatables_net_buttons_js_buttons_print_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! datatables.net-buttons/js/buttons.print.mjs */ \"./node_modules/datatables.net-buttons/js/buttons.print.mjs\");\n/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! faker */ \"./node_modules/faker/index.js\");\n/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(faker__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! chart.js */ \"./node_modules/chart.js/dist/chart.js\");\n/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-chartjs-2 */ \"./node_modules/react-chartjs-2/dist/index.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\nwindow.JSZip = (jszip__WEBPACK_IMPORTED_MODULE_5___default());\n\n\n\n\n\n\n__webpack_require__(/*! ../component/css/dataTables.dataTables.css */ \"./frontend/component/css/dataTables.dataTables.css\");\n__webpack_require__(/*! ../component/css/buttons.dataTables.css */ \"./frontend/component/css/buttons.dataTables.css\");\n\n\n\npdfmake_build_pdfmake_min__WEBPACK_IMPORTED_MODULE_4__.vfs = pdfmake_build_vfs_fonts__WEBPACK_IMPORTED_MODULE_3__.pdfMake.vfs;\nchart_js__WEBPACK_IMPORTED_MODULE_11__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_11__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_11__.LinearScale, chart_js__WEBPACK_IMPORTED_MODULE_11__.BarElement, chart_js__WEBPACK_IMPORTED_MODULE_11__.Title, chart_js__WEBPACK_IMPORTED_MODULE_11__.Tooltip, chart_js__WEBPACK_IMPORTED_MODULE_11__.Legend);\nfunction CostMonitoring() {\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),\n    _useState2 = _slicedToArray(_useState, 2),\n    log_object = _useState2[0],\n    setLog = _useState2[1];\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),\n    _useState4 = _slicedToArray(_useState3, 2),\n    label = _useState4[0],\n    setLabel = _useState4[1];\n  var today = new Date();\n  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),\n    _useState6 = _slicedToArray(_useState5, 2),\n    data = _useState6[0],\n    setData = _useState6[1];\n  var formatter = new Intl.DateTimeFormat(\"sv-SE\");\n  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(formatter.format(today.setDate(today.getDate() + 1)).toLocaleString()),\n    _useState8 = _slicedToArray(_useState7, 2),\n    enddate = _useState8[0],\n    setEnddate = _useState8[1];\n  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(formatter.format(today.setDate(today.getDate() - 8)).toLocaleString()),\n    _useState10 = _slicedToArray(_useState9, 2),\n    startdate = _useState10[0],\n    setStartDate = _useState10[1];\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    console.log(enddate, startdate);\n    axios__WEBPACK_IMPORTED_MODULE_12__[\"default\"].all([axios__WEBPACK_IMPORTED_MODULE_12__[\"default\"].get(\"/frontend-api/cost/\".concat(startdate, \"/\").concat(enddate))]).then(axios__WEBPACK_IMPORTED_MODULE_12__[\"default\"].spread(function (log_object) {\n      setLog(log_object.data.cost);\n      var label_list = [];\n      for (var l in log_object.data.cost) {\n        label_list.push(log_object.data.cost[l]['created_at']);\n      }\n      setLabel(label_list);\n      var data_ = {\n        label_list: label_list,\n        datasets: [{\n          label: 'Dataset 1',\n          data: label_list.map(function () {\n            return faker__WEBPACK_IMPORTED_MODULE_10___default().datatype.number({\n              min: 0,\n              max: 1000\n            });\n          }),\n          backgroundColor: 'rgba(255, 99, 132, 0.5)'\n        }, {\n          label: 'Dataset 2',\n          data: label_list.map(function () {\n            return faker__WEBPACK_IMPORTED_MODULE_10___default().datatype.number({\n              min: 0,\n              max: 1000\n            });\n          }),\n          backgroundColor: 'rgba(53, 162, 235, 0.5)'\n        }]\n      };\n      console.log(data_);\n      setData(data_);\n    }))[\"catch\"](function (error) {\n      console.log(error);\n    });\n  }, [startdate, enddate]);\n  var options = {\n    responsive: true,\n    plugins: {\n      legend: {\n        position: 'top'\n      },\n      title: {\n        display: true,\n        text: 'Work in Progress, Stay Tuned!!!'\n      }\n    }\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    maxWidth: false,\n    disableGutters: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"title\", null, \"Cost Monitoring\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_navbar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    maxWidth: \"xl\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    mt: 4,\n    sx: {\n      overflow: 'auto'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    pt: 2,\n    variant: \"outlined\",\n    sx: {\n      overflow: 'auto'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    p: 5\n  }, data && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_chartjs_2__WEBPACK_IMPORTED_MODULE_16__.Bar, {\n    options: options,\n    data: data\n  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_footer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CostMonitoring);\n\n//# sourceURL=webpack://inference_portal/./frontend/key_management/cost_monitoring.js?");

/***/ })

}]);