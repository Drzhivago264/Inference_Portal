"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkinference_portal"] = self["webpackChunkinference_portal"] || []).push([["frontend_contact_contact_js"],{

/***/ "./frontend/contact/contact.js":
/*!*************************************!*\
  !*** ./frontend/contact/contact.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Container */ \"./node_modules/@mui/material/Container/Container.js\");\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/Stack */ \"./node_modules/@mui/material/Stack/Stack.js\");\n/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/TextField */ \"./node_modules/@mui/material/TextField/TextField.js\");\n/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/Alert */ \"./node_modules/@mui/material/Alert/Alert.js\");\n/* harmony import */ var _mui_icons_material_Key__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/icons-material/Key */ \"./node_modules/@mui/icons-material/Key.js\");\n/* harmony import */ var _mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/InputAdornment */ \"./node_modules/@mui/material/InputAdornment/InputAdornment.js\");\n/* harmony import */ var _mui_icons_material_Create__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/icons-material/Create */ \"./node_modules/@mui/icons-material/Create.js\");\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/system */ \"./node_modules/@mui/system/esm/styled.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/FormControl/FormControl.js\");\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/Paper */ \"./node_modules/@mui/material/Paper/Paper.js\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Typography */ \"./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var _mui_icons_material_Email__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @mui/icons-material/Email */ \"./node_modules/@mui/icons-material/Email.js\");\n/* harmony import */ var _mui_icons_material_ForwardToInbox__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @mui/icons-material/ForwardToInbox */ \"./node_modules/@mui/icons-material/ForwardToInbox.js\");\n/* harmony import */ var _mui_icons_material_AccountBox__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @mui/icons-material/AccountBox */ \"./node_modules/@mui/icons-material/AccountBox.js\");\n/* harmony import */ var _component_navbar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/navbar.js */ \"./frontend/component/navbar.js\");\n/* harmony import */ var _mui_lab_LoadingButton__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @mui/lab/LoadingButton */ \"./node_modules/@mui/lab/LoadingButton/LoadingButton.js\");\n/* harmony import */ var _component_footer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component/footer.js */ \"./frontend/component/footer.js\");\n/* harmony import */ var _mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/icons-material/Visibility */ \"./node_modules/@mui/icons-material/Visibility.js\");\n/* harmony import */ var _mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/icons-material/VisibilityOff */ \"./node_modules/@mui/icons-material/VisibilityOff.js\");\n/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/material/IconButton */ \"./node_modules/@mui/material/IconButton/IconButton.js\");\n/* harmony import */ var _component_getCookie_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../component/getCookie.js */ \"./frontend/component/getCookie.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar StyledPaper = (0,_mui_system__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(function (_ref) {\n  var theme = _ref.theme;\n  return _objectSpread({\n    padding: theme.spacing(4)\n  }, theme.typography.body2);\n});\nfunction Contact() {\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(false),\n    _React$useState2 = _slicedToArray(_React$useState, 2),\n    showPassword = _React$useState2[0],\n    setShowPassword = _React$useState2[1];\n  var handleClickShowPassword = function handleClickShowPassword() {\n    return setShowPassword(function (show) {\n      return !show;\n    });\n  };\n  var handleMouseDownPassword = function handleMouseDownPassword(event) {\n    event.preventDefault();\n  };\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState2 = _slicedToArray(_useState, 2),\n    sendloading = _useState2[0],\n    setSendLoading = _useState2[1];\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\"),\n    _useState4 = _slicedToArray(_useState3, 2),\n    key = _useState4[0],\n    setKey = _useState4[1];\n  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState6 = _slicedToArray(_useState5, 2),\n    keyError = _useState6[0],\n    setKeyError = _useState6[1];\n  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\"),\n    _useState8 = _slicedToArray(_useState7, 2),\n    keyname = _useState8[0],\n    setKeyName = _useState8[1];\n  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState10 = _slicedToArray(_useState9, 2),\n    keynameError = _useState10[0],\n    setKeyNameError = _useState10[1];\n  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\"),\n    _useState12 = _slicedToArray(_useState11, 2),\n    username = _useState12[0],\n    setUserName = _useState12[1];\n  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState14 = _slicedToArray(_useState13, 2),\n    usernameError = _useState14[0],\n    setUserNameError = _useState14[1];\n  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\"),\n    _useState16 = _slicedToArray(_useState15, 2),\n    mail = _useState16[0],\n    setMail = _useState16[1];\n  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState18 = _slicedToArray(_useState17, 2),\n    mailError = _useState18[0],\n    setMailFieldError = _useState18[1];\n  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\"),\n    _useState20 = _slicedToArray(_useState19, 2),\n    message = _useState20[0],\n    setMessage = _useState20[1];\n  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState22 = _slicedToArray(_useState21, 2),\n    messageError = _useState22[0],\n    setMessageError = _useState22[1];\n  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),\n    _useState24 = _slicedToArray(_useState23, 2),\n    mailsentresponse = _useState24[0],\n    setMailResponse = _useState24[1];\n  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState26 = _slicedToArray(_useState25, 2),\n    mailsenterror = _useState26[0],\n    setMailError = _useState26[1];\n  var handleSendMail = function handleSendMail(event) {\n    event.preventDefault();\n    setKeyNameError(false);\n    setSendLoading(true);\n    if (keyname == '') {\n      setKeyNameError(true);\n    }\n    if (username == '') {\n      setUserNameError(true);\n    }\n    if (message == '') {\n      setMessageError(true);\n    }\n    if (key == '') {\n      setKeyError(true);\n    }\n    if (mail == '') {\n      setMailFieldError(true);\n    }\n    if (keyname && key && username && message && mail) {\n      var csrftoken = (0,_component_getCookie_js__WEBPACK_IMPORTED_MODULE_3__.getCookie)('csrftoken');\n      var config = {\n        headers: {\n          'content-type': 'application/json',\n          'X-CSRFToken': csrftoken\n        }\n      };\n      var data = {\n        key_name: keyname,\n        key: key,\n        username: username,\n        message: message,\n        mail: mail\n      };\n      axios__WEBPACK_IMPORTED_MODULE_6__[\"default\"].post(\"/frontend-api/send-mail\", data, config).then(function (response) {\n        setMailResponse(response.data);\n      })[\"catch\"](function (error) {\n        setMailError(error.response.data.detail);\n      });\n    }\n    setSendLoading(false);\n  };\n  var ErrorAlert = function ErrorAlert(_ref2) {\n    var error = _ref2.error;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      mt: 4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n      variant: \"body1\"\n    }, \"Request Failed!\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      textAlign: \"center\",\n      my: 2\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n      variant: \"filled\",\n      severity: \"error\"\n    }, error)));\n  };\n  var SuccessAlert = function SuccessAlert(_ref3) {\n    var detail = _ref3.detail;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      mt: 4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n      variant: \"body1\"\n    }, \"Request Successed!\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      textAlign: \"center\",\n      my: 2\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n      variant: \"filled\",\n      severity: \"success\"\n    }, detail)));\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    maxWidth: false,\n    disableGutters: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"title\", null, \"Contact\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_navbar_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    maxWidth: \"md\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    my: 1,\n    alignItems: \"center\",\n    gap: 4,\n    p: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StyledPaper, {\n    variant: \"outlined\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    textAlign: \"center\",\n    my: 4\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    variant: \"h4\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    sx: {\n      mb: 2,\n      fontWeight: 'bold'\n    }\n  }, \"Contact Us\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"form\", {\n    autoComplete: \"off\",\n    onSubmit: handleSendMail\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    defaultValue: \"\",\n    margin: \"normal\",\n    required: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    direction: {\n      xs: 'column'\n    },\n    spacing: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    direction: {\n      xs: 'column',\n      sm: 'row'\n    },\n    spacing: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    margin: \"normal\",\n    label: \"Key Name\",\n    type: \"text\",\n    size: \"small\",\n    onChange: function onChange(e) {\n      return setKeyName(e.target.value);\n    },\n    value: keyname,\n    error: keynameError,\n    autoComplete: \"off\",\n    InputProps: {\n      startAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n        position: \"start\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Create__WEBPACK_IMPORTED_MODULE_15__[\"default\"], null))\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    margin: \"normal\",\n    fullWidth: true,\n    label: \"Key\",\n    type: showPassword ? 'text' : 'password',\n    size: \"small\",\n    onChange: function onChange(e) {\n      return setKey(e.target.value);\n    },\n    value: key,\n    error: keyError,\n    autoComplete: \"off\",\n    InputProps: {\n      startAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n        position: \"start\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Key__WEBPACK_IMPORTED_MODULE_16__[\"default\"], null)),\n      endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n        position: \"end\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n        \"aria-label\": \"toggle password visibility\",\n        onClick: handleClickShowPassword,\n        onMouseDown: handleMouseDownPassword,\n        edge: \"end\"\n      }, showPassword ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_18__[\"default\"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_19__[\"default\"], null)))\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    direction: {\n      xs: 'column',\n      sm: 'row'\n    },\n    spacing: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    margin: \"normal\",\n    label: \"Your Name\",\n    type: \"text\",\n    size: \"small\",\n    onChange: function onChange(e) {\n      return setUserName(e.target.value);\n    },\n    value: username,\n    error: usernameError,\n    autoComplete: \"off\",\n    InputProps: {\n      startAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n        position: \"start\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_AccountBox__WEBPACK_IMPORTED_MODULE_20__[\"default\"], null))\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    m: 1,\n    margin: \"normal\",\n    fullWidth: true,\n    label: \"Email\",\n    type: \"text\",\n    size: \"small\",\n    onChange: function onChange(e) {\n      return setMail(e.target.value);\n    },\n    value: mail,\n    error: mailError,\n    autoComplete: \"off\",\n    InputProps: {\n      startAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n        position: \"start\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Email__WEBPACK_IMPORTED_MODULE_21__[\"default\"], null))\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    p: 1,\n    id: \"filled-multiline-flexible\",\n    label: \"Message\",\n    multiline: true,\n    rows: 4,\n    onChange: function onChange(e) {\n      return setMessage(e.target.value);\n    },\n    value: message,\n    error: messageError\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_lab_LoadingButton__WEBPACK_IMPORTED_MODULE_22__[\"default\"], {\n    size: \"small\",\n    loading: sendloading,\n    variant: \"contained\",\n    type: \"submit\",\n    endIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_ForwardToInbox__WEBPACK_IMPORTED_MODULE_23__[\"default\"], null)\n  }, \"Send\"))))), mailsentresponse && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(SuccessAlert, {\n    detail: mailsentresponse.detail\n  }), mailsenterror && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ErrorAlert, {\n    error: mailsenterror\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_footer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Contact);\n\n//# sourceURL=webpack://inference_portal/./frontend/contact/contact.js?");

/***/ })

}]);