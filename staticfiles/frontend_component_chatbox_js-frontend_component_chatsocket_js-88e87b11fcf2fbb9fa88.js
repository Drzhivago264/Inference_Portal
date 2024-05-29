"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkinference_portal"] = self["webpackChunkinference_portal"] || []).push([["frontend_component_chatbox_js-frontend_component_chatsocket_js"],{

/***/ "./frontend/component/chatbox.js":
/*!***************************************!*\
  !*** ./frontend/component/chatbox.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChatBox: () => (/* binding */ ChatBox),\n/* harmony export */   ChatBoxHotpot: () => (/* binding */ ChatBoxHotpot)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/Button */ \"./node_modules/@mui/material/Button/Button.js\");\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Paper */ \"./node_modules/@mui/material/Paper/Paper.js\");\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Stack */ \"./node_modules/@mui/material/Stack/Stack.js\");\n/* harmony import */ var _mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/InputAdornment */ \"./node_modules/@mui/material/InputAdornment/InputAdornment.js\");\n/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Grid */ \"./node_modules/@mui/material/Grid/Grid.js\");\n/* harmony import */ var _mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/LinearProgress */ \"./node_modules/@mui/material/LinearProgress/LinearProgress.js\");\n/* harmony import */ var _mui_icons_material_Send__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/icons-material/Send */ \"./node_modules/@mui/icons-material/Send.js\");\n/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/IconButton */ \"./node_modules/@mui/material/IconButton/IconButton.js\");\n/* harmony import */ var _mui_icons_material_ContentCopy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/icons-material/ContentCopy */ \"./node_modules/@mui/icons-material/ContentCopy.js\");\n\n\n\n\n\n\n\n\n\n\n\nvar ChatBox = function ChatBox(_ref) {\n  var inputsize = _ref.inputsize,\n    ChatPaper = _ref.ChatPaper,\n    ChatInput = _ref.ChatInput,\n    chat_message = _ref.chat_message,\n    shownthinking = _ref.shownthinking,\n    usermessage = _ref.usermessage,\n    setUserMessage = _ref.setUserMessage,\n    usermessageError = _ref.usermessageError,\n    submitChat = _ref.submitChat,\n    messagesEndRef = _ref.messagesEndRef,\n    handleEnter = _ref.handleEnter;\n  var copyToClipboard = function copyToClipboard(e) {\n    navigator.clipboard.writeText(e);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ChatPaper, {\n    id: 'chat-log',\n    variant: \"outlined\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    spacing: 1\n  }, chat_message.map(function (mess) {\n    if (mess.role == 'Human') {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        key: mess.time\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        sx: {\n          borderRight: 5,\n          borderColor: 'primary.main',\n          borderRadius: 1\n        },\n        p: 1,\n        className: \"message_log_container\",\n        style: {\n          whiteSpace: 'pre-wrap'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        item: true,\n        sx: {\n          display: 'flex',\n          justifyContent: 'space-between'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        align: \"left\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n        onClick: function onClick() {\n          return copyToClipboard(\"\".concat(mess.role, \" (\").concat(mess.time, \")\\n\\n\").concat(mess.message));\n        },\n        \"aria-label\": \"copy\",\n        size: \"small\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_ContentCopy__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        fontSize: \"small\"\n      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        pt: 0.8,\n        style: {\n          whiteSpace: \"pre-wrap\",\n          flip: true\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, \" \", mess.role, \" (\", mess.time, \")  \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \" \", mess.message, \" \")))));\n    } else if (mess.holder) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        key: mess.holderid\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        p: 1,\n        sx: {\n          borderLeft: 5,\n          borderRadius: 1\n        },\n        className: \"message_log_container\",\n        style: {\n          whiteSpace: 'pre-line'\n        },\n        id: mess.holderid\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        item: true,\n        sx: {\n          display: 'flex',\n          justifyContent: 'space-between'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        pt: 0.8,\n        align: \"left\",\n        style: {\n          whiteSpace: \"pre-wrap\"\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, \" \", mess.role, \" - \", mess.time, \": \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \" \", mess.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        align: \"right\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n        onClick: function onClick() {\n          return copyToClipboard(\"\".concat(mess.role, \" - \").concat(mess.time, \":\\n\\n\").concat(mess.message));\n        },\n        \"aria-label\": \"copy\",\n        size: \"small\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_ContentCopy__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        fontSize: \"small\"\n      }))))));\n    } else if (mess.role == 'Server') {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        key: mess.message + mess.time\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        p: 1,\n        sx: {\n          borderLeft: 5,\n          borderRadius: 1\n        },\n        className: \"message_log_container\",\n        style: {\n          whiteSpace: 'pre-line'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        item: true,\n        sx: {\n          display: 'flex',\n          justifyContent: 'space-between'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        pt: 0.8,\n        align: \"left\",\n        style: {\n          whiteSpace: \"pre-wrap\"\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, \" \", mess.message, \" (\", mess.role, \" - \", mess.time, \") \")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        align: \"right\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n        onClick: function onClick() {\n          return copyToClipboard(\"\".concat(mess.message, \" (\").concat(mess.role, \" - \").concat(mess.time, \")\"));\n        },\n        \"aria-label\": \"copy\",\n        size: \"small\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_ContentCopy__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        fontSize: \"small\"\n      }))))));\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    ref: messagesEndRef\n  }, \" \")), shownthinking && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_7__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    mt: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    component: \"form\",\n    sx: {\n      p: '2px 4px',\n      display: 'flex',\n      minWidth: {\n        inputsize: inputsize\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ChatInput, {\n    id: \"standard-multiline-flexible\",\n    multiline: true,\n    maxRows: 6,\n    value: usermessage,\n    error: usermessageError,\n    onChange: function onChange(e) {\n      return setUserMessage(e.target.value);\n    },\n    onKeyUp: function onKeyUp(e) {\n      return handleEnter(e);\n    },\n    minRows: 4,\n    variant: \"standard\",\n    InputProps: {\n      endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        sx: {\n          position: 'absolute',\n          bottom: 30,\n          right: 10\n        },\n        position: \"end\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n        sx: {\n          height: 32\n        },\n        variant: \"contained\",\n        size: \"small\",\n        onClick: submitChat,\n        endIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Send__WEBPACK_IMPORTED_MODULE_10__[\"default\"], null)\n      }, \"Send\")),\n      startAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        position: \"start\"\n      }, \"   \")\n    }\n  }))));\n};\nvar ChatBoxHotpot = function ChatBoxHotpot(_ref2) {\n  var id = _ref2.id,\n    inputsize = _ref2.inputsize,\n    ChatPaper = _ref2.ChatPaper,\n    ChatInput = _ref2.ChatInput,\n    chat_message = _ref2.chat_message,\n    shownthinking = _ref2.shownthinking,\n    usermessage = _ref2.usermessage,\n    setUserMessage = _ref2.setUserMessage,\n    usermessageError = _ref2.usermessageError,\n    submitChat = _ref2.submitChat,\n    messagesEndRef = _ref2.messagesEndRef,\n    handleEnter = _ref2.handleEnter,\n    check_duplicate_message = _ref2.check_duplicate_message;\n  var copyToClipboard = function copyToClipboard(e) {\n    navigator.clipboard.writeText(e);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ChatPaper, {\n    id: id,\n    variant: \"outlined\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    spacing: 1\n  }, chat_message.map(function (mess) {\n    if (mess.role == 'Human') {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        key: mess.time + mess.message\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        sx: {\n          borderRight: 5,\n          borderColor: 'primary.main',\n          borderRadius: 1\n        },\n        p: 1,\n        className: \"message_log_container\",\n        style: {\n          whiteSpace: 'pre-line',\n          textAlign: 'right'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        item: true,\n        sx: {\n          display: 'flex',\n          justifyContent: 'space-between'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        align: \"left\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n        onClick: function onClick() {\n          return copyToClipboard(\"\".concat(mess.role, \" (\").concat(mess.time, \")\\n\\n\").concat(mess.message));\n        },\n        \"aria-label\": \"copy\",\n        size: \"small\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_ContentCopy__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        fontSize: \"small\"\n      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        pt: 0.8,\n        align: \"right\",\n        style: {\n          whiteSpace: \"pre-wrap\"\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, \" \", mess.role, \" (\", mess.time, \")  \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \" \", mess.message, \" \")))));\n    } else if (mess.holder) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        key: mess.holderid\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        p: 1,\n        sx: {\n          borderLeft: 5,\n          borderRadius: 1\n        },\n        className: \"message_log_container\",\n        style: {\n          whiteSpace: 'pre-line'\n        },\n        id: mess.holderid\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        item: true,\n        sx: {\n          display: 'flex',\n          justifyContent: 'space-between'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        pt: 0.8,\n        align: \"left\",\n        style: {\n          whiteSpace: \"pre-wrap\"\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, \" \", mess.role, \" - \", mess.time, \": \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \" \", mess.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        align: \"right\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n        onClick: function onClick() {\n          return copyToClipboard(\"\".concat(mess.role, \" - \").concat(mess.time, \":\\n\\n\").concat(mess.message));\n        },\n        \"aria-label\": \"copy\",\n        size: \"small\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_ContentCopy__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        fontSize: \"small\"\n      }))))));\n    } else if (mess.role == 'Server') {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        key: mess.message\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        p: 1,\n        sx: {\n          borderLeft: 5,\n          borderRadius: 1\n        },\n        className: \"message_log_container\",\n        style: {\n          whiteSpace: 'pre-line'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        item: true,\n        sx: {\n          display: 'flex',\n          justifyContent: 'space-between'\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        pt: 0.8,\n        align: \"left\",\n        style: {\n          whiteSpace: \"pre-wrap\"\n        }\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"span\", null, \" \", mess.message, \" (\", mess.role, \" - \", mess.time, \") \")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        align: \"right\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n        onClick: function onClick() {\n          return copyToClipboard(\"\".concat(mess.message, \" (\").concat(mess.role, \" - \").concat(mess.time, \")\"));\n        },\n        \"aria-label\": \"copy\",\n        size: \"small\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_ContentCopy__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        fontSize: \"small\"\n      }))))));\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    ref: messagesEndRef\n  }, \" \")), shownthinking && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_7__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    mt: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    component: \"form\",\n    sx: {\n      p: '2px 4px',\n      display: 'flex',\n      minWidth: {\n        inputsize: inputsize\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ChatInput, {\n    id: \"standard-multiline-flexible\",\n    multiline: true,\n    maxRows: 6,\n    value: usermessage,\n    error: usermessageError,\n    onChange: function onChange(e) {\n      setUserMessage(e.target.value);\n      check_duplicate_message(e.target.value);\n    },\n    onKeyUp: function onKeyUp(e) {\n      return handleEnter(e);\n    },\n    minRows: 4,\n    variant: \"standard\",\n    InputProps: {\n      endAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        sx: {\n          position: 'absolute',\n          bottom: 30,\n          right: 10\n        },\n        position: \"end\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n        sx: {\n          height: 32\n        },\n        variant: \"contained\",\n        size: \"small\",\n        onClick: submitChat,\n        endIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Send__WEBPACK_IMPORTED_MODULE_10__[\"default\"], null)\n      }, \"Send\")),\n      startAdornment: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputAdornment__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        position: \"start\"\n      }, \"   \")\n    }\n  }))));\n};\n\n//# sourceURL=webpack://inference_portal/./frontend/component/chatbox.js?");

/***/ }),

/***/ "./frontend/component/chatsocket.js":
/*!******************************************!*\
  !*** ./frontend/component/chatsocket.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   agentsocket: () => (/* binding */ agentsocket),\n/* harmony export */   chatsocket: () => (/* binding */ chatsocket)\n/* harmony export */ });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction chatsocket(websocket, setChatMessage, setThinking, document) {\n  websocket.current.onopen = function () {\n    console.log(\"WebSocket  Connected\");\n  };\n  websocket.current.onclose = function () {\n    console.log(\"WebSocket  Disconnected\");\n  };\n  websocket.current.onmessage = function (message) {\n    var dataFromServer = JSON.parse(message.data);\n    if (dataFromServer) {\n      if (dataFromServer.role == \"Human\" || dataFromServer.role == \"Server\" || dataFromServer.holder) {\n        if (dataFromServer.holder) {\n          setThinking(true);\n          dataFromServer.message = \"\";\n        }\n        setChatMessage(function (chat_message) {\n          return [].concat(_toConsumableArray(chat_message), [{\n            holder: dataFromServer.holder,\n            holderid: dataFromServer.holderid,\n            role: dataFromServer.role,\n            time: dataFromServer.time,\n            credit: dataFromServer.credit,\n            message: dataFromServer.message\n          }]);\n        });\n      } else {\n        setThinking(false);\n        setChatMessage(function (chat_message) {\n          return [].concat(_toConsumableArray(chat_message.slice(0, -1)), [{\n            holder: chat_message[chat_message.length - 1].holder,\n            holderid: chat_message[chat_message.length - 1].holderid,\n            role: chat_message[chat_message.length - 1].role,\n            time: chat_message[chat_message.length - 1].time,\n            credit: chat_message[chat_message.length - 1].credit,\n            message: chat_message[chat_message.length - 1].message += dataFromServer.message\n          }]);\n        });\n      }\n      ;\n      var logTa = document.getElementById(\"chat-log\");\n      logTa.scrollTop = logTa.scrollHeight;\n    }\n  };\n}\nfunction agentsocket(websocket, setChatMessage, setThinking, document, setParentInstruct, setChildInstruct, setDefaultChildTemplateList, use_user_template, setUserParentInstruct, setUserChildInstruct, setDefaultUserChildTemplateList, setEditor, setCurrentParagraph, editorref) {\n  websocket.current.onopen = function () {\n    console.log(\"WebSocket  Connected\");\n  };\n  websocket.current.onclose = function () {\n    console.log(\"WebSocket  Disconnected\");\n  };\n  websocket.current.onmessage = function (message) {\n    var dataFromServer = JSON.parse(message.data);\n    if (dataFromServer) {\n      if (dataFromServer.hasOwnProperty(\"swap_template\")) {\n        if (!use_user_template) {\n          var new_child_template_list = [];\n          for (var new_child in dataFromServer.child_template_name_list) {\n            new_child_template_list.push({\n              'name': dataFromServer.child_template_name_list[new_child]\n            });\n          }\n          setParentInstruct(dataFromServer.swap_instruction);\n          setChildInstruct(dataFromServer.default_child_instruct);\n          setDefaultChildTemplateList(new_child_template_list);\n          if (setEditor) {\n            setEditor(JSON.parse(dataFromServer.swap_template));\n          }\n          if (editorref) {\n            editorref.current.render(JSON.parse(dataFromServer.swap_template));\n          }\n        } else {\n          var _new_child_template_list = [];\n          for (var new_child in dataFromServer.child_template_name_list) {\n            _new_child_template_list.push({\n              'displayed_name': dataFromServer.child_template_name_list[new_child]\n            });\n          }\n          setUserParentInstruct(dataFromServer.swap_instruction);\n          setUserChildInstruct(dataFromServer.default_child_instruct);\n          setDefaultUserChildTemplateList(_new_child_template_list);\n          var default_editor = {\n            \"time\": 1709749130861,\n            \"blocks\": [{\n              \"id\": \"1hYKvu7PTO\",\n              \"type\": \"header\",\n              \"data\": {\n                \"text\": \"Response\",\n                \"level\": 2\n              }\n            }, {\n              \"id\": \"SrV68agaen\",\n              \"type\": \"paragraph\",\n              \"data\": {\n                \"text\": \"\"\n              }\n            }],\n            \"version\": \"2.29.1\"\n          };\n          if (setEditor) {\n            setEditor(default_editor);\n          }\n          if (editorref) {\n            editorref.current.render(default_editor);\n          }\n        }\n        dataFromServer.message = \"\";\n      } else if (dataFromServer.hasOwnProperty(\"child_instruct\")) {\n        if (!use_user_template) {\n          setChildInstruct(dataFromServer.child_instruct);\n        } else {\n          setUserChildInstruct(dataFromServer.child_instruct);\n        }\n        dataFromServer.message = \"\";\n      } else if (dataFromServer.hasOwnProperty(\"paragraph\")) {\n        if (setCurrentParagraph) {\n          setCurrentParagraph(dataFromServer.paragraph);\n          dataFromServer.message = \"\";\n        }\n      }\n      if (dataFromServer.role == \"Human\" || dataFromServer.role == \"Server\" || dataFromServer.holder) {\n        if (dataFromServer.holder) {\n          setThinking(true);\n          dataFromServer.message = \"\";\n        }\n        setChatMessage(function (chat_message) {\n          return [].concat(_toConsumableArray(chat_message), [{\n            holder: dataFromServer.holder,\n            holderid: dataFromServer.holderid,\n            role: dataFromServer.role,\n            time: dataFromServer.time,\n            credit: dataFromServer.credit,\n            message: dataFromServer.message\n          }]);\n        });\n      } else if (dataFromServer.hasOwnProperty(\"agent_action\")) {\n        if (dataFromServer.agent_action == \"STOP\" || dataFromServer.agent_action == \"NEXT\") {\n          var blockToAdd = {\n            type: 'paragraph',\n            data: {\n              text: dataFromServer.full_result.replace(/\\n/g, \"<br>\")\n            }\n          };\n          editorref.current.blocks.insert(blockToAdd.type, blockToAdd.data, null, dataFromServer.result_id);\n        }\n      } else {\n        setThinking(false);\n        setChatMessage(function (chat_message) {\n          return [].concat(_toConsumableArray(chat_message.slice(0, -1)), [{\n            holder: chat_message[chat_message.length - 1].holder,\n            holderid: chat_message[chat_message.length - 1].holderid,\n            role: chat_message[chat_message.length - 1].role,\n            time: chat_message[chat_message.length - 1].time,\n            credit: chat_message[chat_message.length - 1].credit,\n            message: chat_message[chat_message.length - 1].message += dataFromServer.message\n          }]);\n        });\n      }\n      ;\n      var logTa = document.getElementById(\"chat-log\");\n      if (!logTa) {\n        var logTa = document.getElementById(\"chat-log-agent\");\n      }\n      logTa.scrollTop = logTa.scrollHeight;\n    }\n  };\n}\n\n//# sourceURL=webpack://inference_portal/./frontend/component/chatsocket.js?");

/***/ })

}]);