"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkinference_portal"] = self["webpackChunkinference_portal"] || []).push([["frontend_rooms_function_llm_js"],{

/***/ "./node_modules/@mui/icons-material/GetApp.js":
/*!****************************************************!*\
  !*** ./node_modules/@mui/icons-material/GetApp.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\"use client\";\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar _createSvgIcon = _interopRequireDefault(__webpack_require__(/*! ./utils/createSvgIcon */ \"./node_modules/@mui/icons-material/utils/createSvgIcon.js\"));\nvar _jsxRuntime = __webpack_require__(/*! react/jsx-runtime */ \"./node_modules/react/jsx-runtime.js\");\nvar _default = exports[\"default\"] = (0, _createSvgIcon.default)( /*#__PURE__*/(0, _jsxRuntime.jsx)(\"path\", {\n  d: \"M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z\"\n}), 'GetApp');\n\n//# sourceURL=webpack://inference_portal/./node_modules/@mui/icons-material/GetApp.js?");

/***/ }),

/***/ "./frontend/component/chat_export.js":
/*!*******************************************!*\
  !*** ./frontend/component/chat_export.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChatExport: () => (/* binding */ ChatExport)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Button */ \"./node_modules/@mui/material/Button/Button.js\");\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Stack */ \"./node_modules/@mui/material/Stack/Stack.js\");\n/* harmony import */ var _mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/InputLabel */ \"./node_modules/@mui/material/InputLabel/InputLabel.js\");\n/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/MenuItem */ \"./node_modules/@mui/material/MenuItem/MenuItem.js\");\n/* harmony import */ var _mui_material_Select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Select */ \"./node_modules/@mui/material/Select/Select.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/FormControl/FormControl.js\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Typography */ \"./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var _mui_icons_material_GetApp__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/icons-material/GetApp */ \"./node_modules/@mui/icons-material/GetApp.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\n\n\n\n\n\n\n\n\n\n\nvar ChatExport = function ChatExport(_ref) {\n  var chat_message = _ref.chat_message,\n    choosen_export_format_chatlog = _ref.choosen_export_format_chatlog,\n    setChoosenExportFormatChatLog = _ref.setChoosenExportFormatChatLog,\n    number_of_remove_message = _ref.number_of_remove_message;\n  var handleExportChatLog = function handleExportChatLog(event) {\n    event.preventDefault();\n    var chat_message_clone = _toConsumableArray(chat_message);\n    var a = document.createElement('a');\n    if (choosen_export_format_chatlog == \".json\") {\n      var download_content = JSON.stringify(chat_message_clone.splice(number_of_remove_message), null, 4);\n      var blob = new Blob([download_content], {\n        type: \"application/json\"\n      });\n      var url = URL.createObjectURL(blob);\n      a.setAttribute('href', url);\n      a.setAttribute('download', 'Chat_log_from_Professor_Parakeet.json');\n    } else if (choosen_export_format_chatlog == \".txt\") {\n      var json = chat_message_clone.splice(number_of_remove_message);\n      var download_content = \"\";\n      for (var k in json) {\n        download_content += json[k]['role'] + \"-\" + json[k]['time'] + \":\\n\" + json[k]['message'] + \"\\n\";\n      }\n      var blob = new Blob([download_content], {\n        type: \"text/plain\"\n      });\n      var url = URL.createObjectURL(blob);\n      a.setAttribute('href', url);\n      a.setAttribute('download', 'Chat_log_from_Professor_Parakeet.txt');\n    }\n    a.click();\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    mt: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    pb: 2\n  }, \"Chat Log Export:\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"form\", {\n    onSubmit: handleExportChatLog\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    direction: 'row',\n    spacing: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    id: \"export-label-chatlog\"\n  }, \"Formats\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    labelId: \"export-label-chatlog\",\n    id: \"export-select-chatlog\",\n    onChange: function onChange(e) {\n      return setChoosenExportFormatChatLog(e.target.value);\n    },\n    value: choosen_export_format_chatlog,\n    label: \"Export\",\n    size: \"small\"\n  }, ['.json', '.txt'].map(function (format) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n      key: format,\n      value: format\n    }, format);\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    size: \"small\",\n    variant: \"contained\",\n    type: \"submit\",\n    endIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_GetApp__WEBPACK_IMPORTED_MODULE_9__[\"default\"], null)\n  }, \"Export\")))));\n};\n\n//# sourceURL=webpack://inference_portal/./frontend/component/chat_export.js?");

/***/ }),

/***/ "./frontend/rooms/function_llm.js":
/*!****************************************!*\
  !*** ./frontend/rooms/function_llm.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/FormControl/FormControl.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/FormLabel/FormLabel.js\");\n/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/Grid */ \"./node_modules/@mui/material/Grid/Grid.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/styles/styled.js\");\n/* harmony import */ var _mui_material_Radio__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/material/Radio */ \"./node_modules/@mui/material/Radio/Radio.js\");\n/* harmony import */ var _mui_material_RadioGroup__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/RadioGroup */ \"./node_modules/@mui/material/RadioGroup/RadioGroup.js\");\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Paper */ \"./node_modules/@mui/material/Paper/Paper.js\");\n/* harmony import */ var _mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/material/FormControlLabel */ \"./node_modules/@mui/material/FormControlLabel/FormControlLabel.js\");\n/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/Container */ \"./node_modules/@mui/material/Container/Container.js\");\n/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/TextField */ \"./node_modules/@mui/material/TextField/TextField.js\");\n/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/material/Divider */ \"./node_modules/@mui/material/Divider/Divider.js\");\n/* harmony import */ var _component_navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/navbar */ \"./frontend/component/navbar.js\");\n/* harmony import */ var _component_chatroom_parameters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../component/chatroom_parameters */ \"./frontend/component/chatroom_parameters.js\");\n/* harmony import */ var _component_chatbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../component/chatbox */ \"./frontend/component/chatbox.js\");\n/* harmony import */ var _component_chatsocket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../component/chatsocket */ \"./frontend/component/chatsocket.js\");\n/* harmony import */ var _component_chat_export__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../component/chat_export */ \"./frontend/component/chat_export.js\");\n/* harmony import */ var _component_footer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../component/footer */ \"./frontend/component/footer.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar ChatPaper = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(function (_ref) {\n  var theme = _ref.theme;\n  return _objectSpread({\n    minWidth: 300,\n    height: 700,\n    overflow: 'auto',\n    padding: theme.spacing(2)\n  }, theme.typography.body2);\n});\nvar ChatInput = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(function (_ref2) {\n  var theme = _ref2.theme;\n  return _objectSpread({\n    width: '100%'\n  }, theme.typography.body2);\n});\nfunction FunctionLLM() {\n  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();\n  var websocket = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState2 = _slicedToArray(_useState, 2),\n    shownthinking = _useState2[0],\n    setThinking = _useState2[1];\n  var messagesEndRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),\n    _useState4 = _slicedToArray(_useState3, 2),\n    chat_message = _useState4[0],\n    setChatMessage = _useState4[1];\n  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),\n    _useState6 = _slicedToArray(_useState5, 2),\n    agent_objects = _useState6[0],\n    setAgents = _useState6[1];\n  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"gpt-4\"),\n    _useState8 = _slicedToArray(_useState7, 2),\n    choosen_model = _useState8[0],\n    setChoosenModel = _useState8[1];\n  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0.72),\n    _useState10 = _slicedToArray(_useState9, 2),\n    top_p = _useState10[0],\n    setTopp = _useState10[1];\n  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),\n    _useState12 = _slicedToArray(_useState11, 2),\n    max_tokens = _useState12[0],\n    setMaxToken = _useState12[1];\n  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0.73),\n    _useState14 = _slicedToArray(_useState13, 2),\n    temperature = _useState14[0],\n    setTemperature = _useState14[1];\n  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),\n    _useState16 = _slicedToArray(_useState15, 2),\n    presencepenalty = _useState16[0],\n    setPresencePenalty = _useState16[1];\n  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),\n    _useState18 = _slicedToArray(_useState17, 2),\n    frequencypenalty = _useState18[0],\n    setFrequencyPenalty = _useState18[1];\n  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\"),\n    _useState20 = _slicedToArray(_useState19, 2),\n    usermessage = _useState20[0],\n    setUserMessage = _useState20[1];\n  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState22 = _slicedToArray(_useState21, 2),\n    usermessageError = _useState22[0],\n    setUserMessageError = _useState22[1];\n  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"sadness, joy, love, anger, fear, surprise, neutral\"),\n    _useState24 = _slicedToArray(_useState23, 2),\n    extrainstruction = _useState24[0],\n    setExtraInstruction = _useState24[1];\n  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"emotion\"),\n    _useState26 = _slicedToArray(_useState25, 2),\n    llmfunction = _useState26[0],\n    setLLMFunction = _useState26[1];\n  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\".json\"),\n    _useState28 = _slicedToArray(_useState27, 2),\n    choosen_export_format_chatlog = _useState28[0],\n    setChoosenExportFormatChatLog = _useState28[1];\n  var _Intl$DateTimeFormat$ = Intl.DateTimeFormat().resolvedOptions(),\n    timeZone = _Intl$DateTimeFormat$.timeZone;\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    axios__WEBPACK_IMPORTED_MODULE_10__[\"default\"].all([axios__WEBPACK_IMPORTED_MODULE_10__[\"default\"].get('/frontend-api/model')]).then(axios__WEBPACK_IMPORTED_MODULE_10__[\"default\"].spread(function (model_object) {\n      setAgents(model_object.data.models_agent);\n    }))[\"catch\"](function (error) {\n      console.log(error);\n    });\n  }, []);\n  var scrollToBottom = function scrollToBottom() {\n    var _messagesEndRef$curre;\n    (_messagesEndRef$curre = messagesEndRef.current) === null || _messagesEndRef$curre === void 0 || _messagesEndRef$curre.scrollIntoView({\n      behavior: \"smooth\",\n      block: 'nearest',\n      inline: 'nearest'\n    });\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    scrollToBottom();\n  }, [chat_message]);\n  var ws_scheme = window.location.protocol == \"https:\" ? \"wss\" : \"ws\";\n  var url = window.location.pathname.split(\"/\").filter(function (path) {\n    return path !== \"\";\n  });\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    websocket.current = new WebSocket(ws_scheme + '://' + window.location.host + '/ws/' + url[url.length - 2] + '/' + url[url.length - 1] + '/' + timeZone + '/');\n    (0,_component_chatsocket__WEBPACK_IMPORTED_MODULE_4__.chatsocket)(websocket, setChatMessage, setThinking, document);\n  }, []);\n  var handleEnter = function handleEnter(e) {\n    if (e.key == \"Enter\" && !e.shiftKey) {\n      submitChat();\n    }\n  };\n  var submitChat = function submitChat() {\n    if (usermessage == '') {\n      setUserMessageError(true);\n    } else {\n      var data = {\n        'message': usermessage,\n        'tool': llmfunction,\n        'choosen_models': choosen_model,\n        'role': 'Human',\n        'top_p': top_p,\n        'max_tokens': max_tokens,\n        'frequency_penalty': frequencypenalty,\n        'presence_penalty': presencepenalty,\n        'temperature': temperature,\n        'emotion_list': typeof extrainstruction === 'string' ? extrainstruction : null,\n        'topic_list': typeof extrainstruction === 'string' ? extrainstruction : null,\n        'style_list': typeof extrainstruction === 'string' ? extrainstruction : null,\n        'number_of_word': typeof extrainstruction === 'number' ? extrainstruction : null\n      };\n      websocket.current.send(JSON.stringify(data));\n      setUserMessage(\"\");\n    }\n  };\n  var swap_extra_instruction = function swap_extra_instruction(e) {\n    if (e == 'restyle') {\n      setExtraInstruction(\"sad, serious\");\n    } else if (e == 'emotion') {\n      setExtraInstruction(\"sadness, joy, love, anger, fear, surprise, neutral\");\n    } else if (e == 'summary') {\n      setExtraInstruction(100);\n    } else if (e == 'topic' || 'paraphrase' || 0) {\n      setExtraInstruction(\"\");\n    }\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    maxWidth: false,\n    sx: {\n      minWidth: 1200\n    },\n    disableGutters: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"title\", null, \"Agent\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_navbar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    max_width: \"xl\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    maxWidth: \"xl\",\n    sx: {\n      minWidth: 1200\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    m: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    container: true,\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    item: true,\n    md: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_14__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    id: \"demo-controlled-radio-buttons-group\"\n  }, \"Toolbox\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_RadioGroup__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    defaultValue: \"emotion\",\n    name: \"radio-buttons-group\",\n    onChange: function onChange(e) {\n      setLLMFunction(e.target.value);\n      swap_extra_instruction(e.target.value);\n    },\n    value: llmfunction\n  }, [{\n    'label': 'Summary',\n    'value': 'summary'\n  }, {\n    'label': 'Paraphrase',\n    'value': 'paraphrase'\n  }, {\n    'label': 'Predict Emotion',\n    'value': 'emotion'\n  }, {\n    'label': 'Predict Sentiment',\n    'value': 'sentiment'\n  }, {\n    'label': 'Topic Classification',\n    'value': 'topic'\n  }, {\n    'label': 'Restyle',\n    'value': 'restyle'\n  }].map(function (func) {\n    if (func.value == 'paraphrase' || 'setiment') {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n        key: func.label,\n        value: func.value,\n        control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_18__[\"default\"], null),\n        label: func.label\n      });\n    } else {}\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_19__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    mt: 2,\n    mb: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    id: \"Extral Instructions\"\n  }, \"Extra Instructions\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ChatInput, {\n    multiline: true,\n    maxRows: 6,\n    value: extrainstruction,\n    sx: {\n      p: '2px 4px',\n      display: 'flex',\n      minWidth: 200\n    },\n    onChange: function onChange(e) {\n      return setExtraInstruction(e.target.value);\n    },\n    minRows: 4\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_19__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_chat_export__WEBPACK_IMPORTED_MODULE_5__.ChatExport, {\n    chat_message: chat_message,\n    choosen_export_format_chatlog: choosen_export_format_chatlog,\n    setChoosenExportFormatChatLog: setChoosenExportFormatChatLog,\n    number_of_remove_message: 1\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    item: true,\n    md: 6\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_chatbox__WEBPACK_IMPORTED_MODULE_3__.ChatBox, {\n    inputsize: 660,\n    chat_message: chat_message,\n    usermessage: usermessage,\n    usermessageError: usermessageError,\n    ChatPaper: ChatPaper,\n    ChatInput: ChatInput,\n    setUserMessage: setUserMessage,\n    submitChat: submitChat,\n    messagesEndRef: messagesEndRef,\n    shownthinking: shownthinking,\n    handleEnter: handleEnter\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    item: true,\n    md: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_chatroom_parameters__WEBPACK_IMPORTED_MODULE_2__.OpenAPIParameter, {\n    top_p: top_p,\n    agent_objects: agent_objects,\n    choosen_model: choosen_model,\n    setChoosenModel: setChoosenModel,\n    setTopp: setTopp,\n    temperature: temperature,\n    setTemperature: setTemperature,\n    max_tokens: max_tokens,\n    setMaxToken: setMaxToken,\n    presencepenalty: presencepenalty,\n    setPresencePenalty: setPresencePenalty,\n    frequencypenalty: frequencypenalty,\n    setFrequencyPenalty: setFrequencyPenalty\n  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_footer__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FunctionLLM);\n\n//# sourceURL=webpack://inference_portal/./frontend/rooms/function_llm.js?");

/***/ })

}]);