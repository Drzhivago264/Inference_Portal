"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkinference_portal"] = self["webpackChunkinference_portal"] || []).push([["frontend_rooms_redirect_js"],{

/***/ "./frontend/rooms/redirect.js":
/*!************************************!*\
  !*** ./frontend/rooms/redirect.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/material/Grid */ \"./node_modules/@mui/material/Grid/Grid.js\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/material/Container */ \"./node_modules/@mui/material/Container/Container.js\");\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @mui/material/Stack */ \"./node_modules/@mui/material/Stack/Stack.js\");\n/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @mui/material/TextField */ \"./node_modules/@mui/material/TextField/TextField.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/dist/index.js\");\n/* harmony import */ var _mui_icons_material_Key__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @mui/icons-material/Key */ \"./node_modules/@mui/icons-material/Key.js\");\n/* harmony import */ var _mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @mui/material/InputAdornment */ \"./node_modules/@mui/material/InputAdornment/InputAdornment.js\");\n/* harmony import */ var _component_navbar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/navbar.js */ \"./frontend/component/navbar.js\");\n/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @mui/material/Button */ \"./node_modules/@mui/material/Button/Button.js\");\n/* harmony import */ var _mui_material_Radio__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @mui/material/Radio */ \"./node_modules/@mui/material/Radio/Radio.js\");\n/* harmony import */ var _mui_material_RadioGroup__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @mui/material/RadioGroup */ \"./node_modules/@mui/material/RadioGroup/RadioGroup.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/FormControl/FormControl.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/FormLabel/FormLabel.js\");\n/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/Alert */ \"./node_modules/@mui/material/Alert/Alert.js\");\n/* harmony import */ var _mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @mui/material/FormControlLabel */ \"./node_modules/@mui/material/FormControlLabel/FormControlLabel.js\");\n/* harmony import */ var _mui_icons_material_Login__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @mui/icons-material/Login */ \"./node_modules/@mui/icons-material/Login.js\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/Typography */ \"./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var mui_markdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mui-markdown */ \"./node_modules/mui-markdown/dist/index.esm.js\");\n/* harmony import */ var _docs_PageContent_mode_explaination_en_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../docs/PageContent/mode_explaination_en.md */ \"./docs/PageContent/mode_explaination_en.md\");\n/* harmony import */ var _docs_PageContent_mode_explaination_vi_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../docs/PageContent/mode_explaination_vi.md */ \"./docs/PageContent/mode_explaination_vi.md\");\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-i18next */ \"./node_modules/react-i18next/dist/es/index.js\");\n/* harmony import */ var prism_react_renderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prism-react-renderer */ \"./node_modules/prism-react-renderer/dist/index.mjs\");\n/* harmony import */ var _mui_icons_material_Logout__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @mui/icons-material/Logout */ \"./node_modules/@mui/icons-material/Logout.js\");\n/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @mui/material/Divider */ \"./node_modules/@mui/material/Divider/Divider.js\");\n/* harmony import */ var _mui_icons_material_AssistantDirection__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @mui/icons-material/AssistantDirection */ \"./node_modules/@mui/icons-material/AssistantDirection.js\");\n/* harmony import */ var _component_check_login_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../component/check_login.js */ \"./frontend/component/check_login.js\");\n/* harmony import */ var _component_footer_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../component/footer.js */ \"./frontend/component/footer.js\");\n/* harmony import */ var _App_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../App.js */ \"./frontend/App.js\");\n/* harmony import */ var _component_getCookie_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../component/getCookie.js */ \"./frontend/component/getCookie.js\");\n/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! i18next */ \"./node_modules/i18next/dist/esm/i18next.js\");\n/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @mui/material/Card */ \"./node_modules/@mui/material/Card/Card.js\");\n/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @mui/material/CardContent */ \"./node_modules/@mui/material/CardContent/CardContent.js\");\n/* harmony import */ var _mui_material_CardMedia__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @mui/material/CardMedia */ \"./node_modules/@mui/material/CardMedia/CardMedia.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction Hub() {\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(i18next__WEBPACK_IMPORTED_MODULE_11__[\"default\"].language == 'en' || i18next__WEBPACK_IMPORTED_MODULE_11__[\"default\"].language == 'vi' ? i18next__WEBPACK_IMPORTED_MODULE_11__[\"default\"].language : 'en'),\n    _useState2 = _slicedToArray(_useState, 2),\n    default_language = _useState2[0],\n    setDefaultLanguage = _useState2[1];\n  var _useTranslation = (0,react_i18next__WEBPACK_IMPORTED_MODULE_5__.useTranslation)(),\n    t = _useTranslation.t,\n    i18n = _useTranslation.i18n;\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    setDefaultLanguage(i18n.language);\n  }, [i18n.language]);\n  var explaination_refs = {\n    \"en\": _docs_PageContent_mode_explaination_en_md__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    \"vi\": _docs_PageContent_mode_explaination_vi_md__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n  };\n  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_App_js__WEBPACK_IMPORTED_MODULE_9__.UserContext),\n    is_authenticated = _useContext.is_authenticated,\n    setIsAuthenticated = _useContext.setIsAuthenticated;\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),\n    _useState4 = _slicedToArray(_useState3, 2),\n    explaination = _useState4[0],\n    setMessage = _useState4[1];\n  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_12__.useNavigate)();\n  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"engineer\"),\n    _useState6 = _slicedToArray(_useState5, 2),\n    destination = _useState6[0],\n    setDestination = _useState6[1];\n  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\"),\n    _useState8 = _slicedToArray(_useState7, 2),\n    key = _useState8[0],\n    setKey = _useState8[1];\n  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState10 = _slicedToArray(_useState9, 2),\n    keyError = _useState10[0],\n    setKeyError = _useState10[1];\n  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),\n    _useState12 = _slicedToArray(_useState11, 2),\n    redirecterror = _useState12[0],\n    setRedirectError = _useState12[1];\n  var handleSubmit = function handleSubmit(event) {\n    event.preventDefault();\n    setKeyError(false);\n    if (!is_authenticated && key == '') {\n      setKeyError(true);\n    } else {\n      if (destination) {\n        var csrftoken = (0,_component_getCookie_js__WEBPACK_IMPORTED_MODULE_10__.getCookie)('csrftoken');\n        var config = {\n          headers: {\n            'content-type': 'application/json',\n            'X-CSRFToken': csrftoken\n          }\n        };\n        var data = {\n          key: key,\n          check_login: is_authenticated,\n          destination: destination\n        };\n        axios__WEBPACK_IMPORTED_MODULE_13__[\"default\"].post(\"/frontend-api/hub-redirect\", data, config).then(function (response) {\n          setIsAuthenticated(true);\n          navigate(response.data.redirect_link, {\n            replace: true,\n            state: {\n              credential: key\n            }\n          });\n        })[\"catch\"](function (error) {\n          setRedirectError(error.response.data.detail);\n          if (error.response.status == \"400\") {\n            setRedirectError(\"Your key is incorrect\");\n          }\n        });\n      }\n    }\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    axios__WEBPACK_IMPORTED_MODULE_13__[\"default\"].all([axios__WEBPACK_IMPORTED_MODULE_13__[\"default\"].get(explaination_refs[default_language])]).then(axios__WEBPACK_IMPORTED_MODULE_13__[\"default\"].spread(function (explaination_object) {\n      setMessage(explaination_object.data);\n    }))[\"catch\"](function (error) {\n      console.log(error);\n    });\n  }, [default_language]);\n  var ErrorAlert = function ErrorAlert(_ref) {\n    var error = _ref.error;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n      mt: 4\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n      variant: \"body1\"\n    }, \"Request Failed!\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n      textAlign: \"center\",\n      my: 2\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n      variant: \"filled\",\n      severity: \"error\"\n    }, error)));\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n    maxWidth: false,\n    disableGutters: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"title\", null, \"Hub\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_navbar_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    max_width: \"xl\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n    maxWidth: \"lg\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    my: 1,\n    display: \"flex\",\n    alignItems: \"center\",\n    gap: 4,\n    p: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    container: true,\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    item: true,\n    md: 4,\n    lg: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"form\", {\n    autoComplete: \"off\",\n    onSubmit: handleSubmit\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    defaultValue: \"\",\n    required: true\n  }, !is_authenticated && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    mt: 3,\n    direction: \"row\",\n    spacing: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    margin: \"normal\",\n    label: \"Key\",\n    type: \"password\",\n    size: \"small\",\n    onChange: function onChange(e) {\n      return setKey(e.target.value);\n    },\n    value: key,\n    error: keyError,\n    autoComplete: \"off\",\n    InputProps: {\n      startAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_22__[\"default\"], {\n        position: \"start\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Key__WEBPACK_IMPORTED_MODULE_23__[\"default\"], null))\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_24__[\"default\"], {\n    variant: \"contained\",\n    type: \"submit\",\n    endIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Login__WEBPACK_IMPORTED_MODULE_25__[\"default\"], null)\n  }, \"Login\")), is_authenticated && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    mt: 3,\n    direction: \"row\",\n    spacing: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_24__[\"default\"], {\n    variant: \"contained\",\n    type: \"submit\",\n    endIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_AssistantDirection__WEBPACK_IMPORTED_MODULE_26__[\"default\"], null)\n  }, \"Redirect\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_27__[\"default\"], {\n    orientation: \"vertical\",\n    flexItem: true\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_24__[\"default\"], {\n    variant: \"outlined\",\n    onClick: function onClick() {\n      (0,_component_check_login_js__WEBPACK_IMPORTED_MODULE_7__.logout)(setIsAuthenticated);\n    },\n    color: \"error\",\n    endIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Logout__WEBPACK_IMPORTED_MODULE_28__[\"default\"], null)\n  }, \"Logout\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_29__[\"default\"], {\n    sx: {\n      m: 2\n    }\n  }, \"Bring me to:\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_RadioGroup__WEBPACK_IMPORTED_MODULE_30__[\"default\"], {\n    \"aria-labelledby\": \"demo-radio-buttons-group-label\",\n    name: \"radio-buttons-group\",\n    onChange: function onChange(e) {\n      return setDestination(e.target.value);\n    },\n    value: destination,\n    sx: {\n      ml: 2\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_31__[\"default\"], {\n    value: \"chat\",\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_32__[\"default\"], null),\n    label: \"Chatbots\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_31__[\"default\"], {\n    value: \"engineer\",\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_32__[\"default\"], null),\n    label: \"Agents\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_31__[\"default\"], {\n    value: \"hotpot\",\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_32__[\"default\"], null),\n    label: \"Hotpot Mode\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_31__[\"default\"], {\n    value: \"toolbox\",\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_32__[\"default\"], null),\n    label: \"LLM Functions\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_31__[\"default\"], {\n    value: \"log\",\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_32__[\"default\"], null),\n    label: \"Retrieve Log\"\n  })))), redirecterror && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ErrorAlert, {\n    error: redirecterror\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    item: true,\n    md: 8,\n    lg: 9\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    m: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Card__WEBPACK_IMPORTED_MODULE_33__[\"default\"], {\n    sx: {\n      display: 'flex'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    sx: {\n      display: 'flex',\n      flexDirection: 'column'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_34__[\"default\"], {\n    sx: {\n      flex: '1 0 auto'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    component: \"div\",\n    variant: \"h5\"\n  }, \"Agent Mode\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    variant: \"subtitle1\",\n    color: \"text.secondary\",\n    component: \"div\"\n  }, \"An implementation of React agent that is capable of reasoning and acting in multiple prompt-response loops (default is 4). Agents are tasked with predetermined templates (e.g., writing assignment, writing advertisement materials, or protecting cat). Users can design their own template for their agents. After the prompt-response loop is finished, the agent outputs the final result into a text editor for further edit.\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_CardMedia__WEBPACK_IMPORTED_MODULE_35__[\"default\"], {\n    component: \"img\",\n    sx: {\n      width: 250\n    },\n    image: \"/static/image/Robot_folow_instruct.jpg\"\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    m: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Card__WEBPACK_IMPORTED_MODULE_33__[\"default\"], {\n    sx: {\n      display: 'flex'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    sx: {\n      display: 'flex',\n      flexDirection: 'column'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_34__[\"default\"], {\n    sx: {\n      flex: '1 0 auto'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    component: \"div\",\n    variant: \"h5\"\n  }, \"LLM functions\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    variant: \"subtitle1\",\n    color: \"text.secondary\",\n    component: \"div\"\n  }, \"This mode displays the backend functions that are used for multiple tasks (e.g., classification, sentiment predictions). The backend functions are used in both chatbot and agent modes to improve the context of users' prompts.\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_CardMedia__WEBPACK_IMPORTED_MODULE_35__[\"default\"], {\n    component: \"img\",\n    sx: {\n      width: 250\n    },\n    image: \"/static/image/Robot_label.jpg\"\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(mui_markdown__WEBPACK_IMPORTED_MODULE_2__.MuiMarkdown, {\n    overrides: _objectSpread(_objectSpread({}, (0,mui_markdown__WEBPACK_IMPORTED_MODULE_2__.getOverrides)({\n      Highlight: prism_react_renderer__WEBPACK_IMPORTED_MODULE_6__.Highlight,\n      themes: prism_react_renderer__WEBPACK_IMPORTED_MODULE_6__.themes,\n      theme: prism_react_renderer__WEBPACK_IMPORTED_MODULE_6__.themes.okaidia\n    })), {}, {\n      h1: {\n        component: 'h1'\n      },\n      h2: {\n        component: 'h2'\n      },\n      h3: {\n        component: 'h3'\n      }\n    })\n  }, explaination))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_footer_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"], null));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hub);\n\n//# sourceURL=webpack://inference_portal/./frontend/rooms/redirect.js?");

/***/ }),

/***/ "./docs/PageContent/mode_explaination_en.md":
/*!**************************************************!*\
  !*** ./docs/PageContent/mode_explaination_en.md ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"mode_explaination_en.md\");\n\n//# sourceURL=webpack://inference_portal/./docs/PageContent/mode_explaination_en.md?");

/***/ }),

/***/ "./docs/PageContent/mode_explaination_vi.md":
/*!**************************************************!*\
  !*** ./docs/PageContent/mode_explaination_vi.md ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"mode_explaination_vi.md\");\n\n//# sourceURL=webpack://inference_portal/./docs/PageContent/mode_explaination_vi.md?");

/***/ })

}]);