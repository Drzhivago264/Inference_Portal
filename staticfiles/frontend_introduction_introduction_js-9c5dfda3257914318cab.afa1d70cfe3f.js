"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkinference_portal"] = self["webpackChunkinference_portal"] || []).push([["frontend_introduction_introduction_js"],{

/***/ "./frontend/introduction/introduction.js":
/*!***********************************************!*\
  !*** ./frontend/introduction/introduction.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/material/Grid */ \"./node_modules/@mui/material/Grid/Grid.js\");\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @mui/material/Paper */ \"./node_modules/@mui/material/Paper/Paper.js\");\n/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/Container */ \"./node_modules/@mui/material/Container/Container.js\");\n/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ \"./node_modules/prismjs/prism.js\");\n/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prismjs_themes_prism_okaidia_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prismjs/themes/prism-okaidia.min.css */ \"./node_modules/prismjs/themes/prism-okaidia.min.css\");\n/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prismjs/plugins/toolbar/prism-toolbar.min.css */ \"./node_modules/prismjs/plugins/toolbar/prism-toolbar.min.css\");\n/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar_min__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prismjs/plugins/toolbar/prism-toolbar.min */ \"./node_modules/prismjs/plugins/toolbar/prism-toolbar.min.js\");\n/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar_min__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_toolbar_prism_toolbar_min__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _component_navbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../component/navbar */ \"./frontend/component/navbar.js\");\n/* harmony import */ var _component_vertical_nav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../component/vertical_nav */ \"./frontend/component/vertical_nav.js\");\n/* harmony import */ var _mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/material/Skeleton */ \"./node_modules/@mui/material/Skeleton/Skeleton.js\");\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/material/Stack */ \"./node_modules/@mui/material/Stack/Stack.js\");\n/* harmony import */ var mui_markdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mui-markdown */ \"./node_modules/mui-markdown/dist/index.esm.js\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @mui/material/Typography */ \"./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var react_type_animation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-type-animation */ \"./node_modules/react-type-animation/dist/esm/index.es.js\");\n/* harmony import */ var _docs_PageContent_introduction_md__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../docs/PageContent/introduction.md */ \"./docs/PageContent/introduction.md\");\n/* harmony import */ var prism_react_renderer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prism-react-renderer */ \"./node_modules/prism-react-renderer/dist/index.mjs\");\n/* harmony import */ var _component_footer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../component/footer */ \"./frontend/component/footer.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/Divider/Divider.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/dist/index.js\");\n/* harmony import */ var _component_css_background_video_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../component/css/background_video.css */ \"./frontend/component/css/background_video.css\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n__webpack_require__(/*! prismjs/components/prism-c */ \"./node_modules/prismjs/components/prism-c.js\");\n__webpack_require__(/*! prismjs/components/prism-python */ \"./node_modules/prismjs/components/prism-python.js\");\n__webpack_require__(/*! prismjs/components/prism-bash */ \"./node_modules/prismjs/components/prism-bash.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction Information() {\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    prismjs__WEBPACK_IMPORTED_MODULE_1___default().highlightAll();\n  });\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),\n    _useState2 = _slicedToArray(_useState, 2),\n    intro = _useState2[0],\n    setMessage = _useState2[1];\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),\n    _useState4 = _slicedToArray(_useState3, 2),\n    introloading = _useState4[0],\n    setIntroLoading = _useState4[1];\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    axios__WEBPACK_IMPORTED_MODULE_13__[\"default\"].all([axios__WEBPACK_IMPORTED_MODULE_13__[\"default\"].get(_docs_PageContent_introduction_md__WEBPACK_IMPORTED_MODULE_9__[\"default\"])]).then(axios__WEBPACK_IMPORTED_MODULE_13__[\"default\"].spread(function (intro_object) {\n      setIntroLoading(false);\n      setMessage(intro_object.data);\n    }))[\"catch\"](function (error) {\n      console.log(error);\n    });\n  }, []);\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default().useState(null),\n    _React$useState2 = _slicedToArray(_React$useState, 2),\n    destination = _React$useState2[0],\n    setDestination = _React$useState2[1];\n  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useNavigate)();\n  react__WEBPACK_IMPORTED_MODULE_0___default().useEffect(function () {\n    if (destination) {\n      navigate(destination, {\n        replace: true\n      });\n    }\n  }, [destination]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    maxWidth: false,\n    disableGutters: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"title\", null, \"Introduction\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_navbar__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    \"class\": \"video-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"video\", {\n    className: \"videoTag\",\n    autoPlay: true,\n    loop: true,\n    muted: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"source\", {\n    src: \"/static/video/06_09_19_14.webm\",\n    type: \"video/webm\"\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    maxWidth: \"lg\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    sx: {\n      display: 'flex',\n      flexWrap: 'wrap',\n      '& > :not(style)': {\n        width: 1,\n        mt: 5,\n        height: {\n          xs: \"150px\",\n          sm: '170px',\n          md: '170px',\n          lg: '120px'\n        },\n        fontSize: {\n          xs: \"1.3em\",\n          sm: '1.5em',\n          md: '1.75em'\n        }\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    sx: {\n      backgroundColor: 'rgba(0, 0, 0, .5)'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_type_animation__WEBPACK_IMPORTED_MODULE_8__.TypeAnimation, {\n    style: {\n      whiteSpace: 'pre-line',\n      display: 'inline-block',\n      padding: '10px',\n      lineHeight: 1.7\n    },\n    sequence: [\"Newspaper, radio, television, the internet, social media and now large language models.\", 1500, \"Newspaper, radio, television, the internet, social media and now large language models.\\nWe are building a new medium for your voices.\", 1500, \"Newspaper, radio, television, the internet, social media and now large language models.\\nWe are building a new medium for your voices. \\n Or the voice that you want to be heard.\", 3000, '', function () {}],\n    wrapper: \"span\",\n    cursor: true,\n    repeat: Infinity,\n    speed: 120,\n    deletionSpeed: 90\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n    mt: 30,\n    container: true,\n    spacing: 0\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n    item: true,\n    sm: 12,\n    md: 8,\n    lg: 10\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    mt: 5,\n    mb: 5,\n    p: 1\n  }, introloading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    spacing: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    variant: \"rounded\",\n    animation: \"wave\",\n    height: 150\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    variant: \"rounded\",\n    animation: \"wave\",\n    height: 150\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    variant: \"rounded\",\n    animation: \"wave\",\n    height: 100\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(mui_markdown__WEBPACK_IMPORTED_MODULE_7__.MuiMarkdown, {\n    overrides: _objectSpread(_objectSpread({}, (0,mui_markdown__WEBPACK_IMPORTED_MODULE_7__.getOverrides)({\n      Highlight: prism_react_renderer__WEBPACK_IMPORTED_MODULE_10__.Highlight,\n      themes: prism_react_renderer__WEBPACK_IMPORTED_MODULE_10__.themes,\n      theme: prism_react_renderer__WEBPACK_IMPORTED_MODULE_10__.themes.okaidia\n    })), {}, {\n      h1: {\n        component: 'h1'\n      },\n      h2: {\n        component: 'h2'\n      },\n      h3: {\n        component: 'h3'\n      }\n    })\n  }, intro), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    mt: 2\n  }, \"The two examples below can be currently generated by a popular large language model. In fact, we just input the prompts into our chatbots. You can generate a key and try it by yourself.\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    mt: 1,\n    mb: 1,\n    sx: {\n      display: 'flex',\n      flexWrap: 'wrap',\n      '& > :not(style)': {\n        width: 1,\n        height: {\n          xs: \"250px\"\n        },\n        overflow: 'auto',\n        fontSize: {\n          xs: \"1em\"\n        }\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    variant: \"outlined\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    variant: \"body1\",\n    style: _defineProperty({\n      whiteSpace: 'pre-line',\n      display: 'block',\n      padding: '10px',\n      lineHeight: 1.7\n    }, \"whiteSpace\", \"pre-wrap\")\n  }, \"Prompt: You are an educated man in your 20s, you believe in equality, freedom and justice. You must response to the following sentence based on what you believe in. \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"Sentence: The reality is deterministic, there is no freedom.\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_22__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_type_animation__WEBPACK_IMPORTED_MODULE_8__.TypeAnimation, {\n    style: {\n      whiteSpace: 'pre-line',\n      display: 'block',\n      padding: '10px',\n      lineHeight: 1.7\n    },\n    sequence: [\"Answer: I respectfully disagree. The concept of determinism suggests that every event, including human cognition and behavior, decision and action, is causally determined by an unbroken chain of prior occurrences. While this view might hold some scientific grounding, it undermines the essence of human agency and free will. I believe in freedom - the ability to choose, to act, to shape our own destiny. This freedom is what allows us to learn, grow, and make decisions that can change the course of our lives. Even if some aspects of reality are deterministic, it doesn't negate the existence of personal freedom.\", 3000, '', function () {}],\n    wrapper: \"span\",\n    cursor: true,\n    repeat: Infinity,\n    speed: 120,\n    deletionSpeed: 90\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    mt: 2\n  }, \"The current models are pretty smart, they have a great understanding of human society. At least, they understand Western society that generates the majority of their training datasets. Imagine we can train our own models (smaller, cheaper, and quicker) on our (localised) data to speak up the voices that we want them to speak and at the scale that hardware can support.\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    sx: {\n      display: 'flex',\n      flexWrap: 'wrap',\n      '& > :not(style)': {\n        width: 1,\n        mt: 2,\n        height: {\n          xs: \"250px\"\n        },\n        overflow: 'auto',\n        fontSize: {\n          xs: \"1em\"\n        }\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    variant: \"outlined\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    variant: \"body1\",\n    style: _defineProperty({\n      whiteSpace: 'pre-line',\n      display: 'block',\n      padding: '10px',\n      lineHeight: 1.7\n    }, \"whiteSpace\", \"pre-wrap\")\n  }, \"Prompt: You are a man in your 30s, you come from a working class family, you are tired of paying for your mortgage. You must response to the following sentence based on who you are. \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"Sentence: It is important to raise income taxes for education.\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_22__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_type_animation__WEBPACK_IMPORTED_MODULE_8__.TypeAnimation, {\n    style: {\n      whiteSpace: 'pre-line',\n      display: 'block',\n      padding: '10px',\n      lineHeight: 1.7\n    },\n    sequence: [\"Answer: While I understand the value of investing in education, I must say that the prospect of raising interest rates and income taxes is a tough pill to swallow for folks like me. Many of us are already struggling to make ends meet, paying mortgages and trying to secure a decent life for our families. It seems like we're always the ones shouldering the burden. I think it's important to find a balance and look at other ways to fund education, without putting the entire weight on the working class.\", 3000, '', function () {}],\n    wrapper: \"span\",\n    cursor: true,\n    repeat: Infinity,\n    speed: 120,\n    deletionSpeed: 90\n  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n    item: true,\n    md: 3,\n    lg: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    mt: 10.32,\n    sx: {\n      minWidth: 225,\n      display: {\n        xs: 'none',\n        sm: 'none ',\n        md: 'block'\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_vertical_nav__WEBPACK_IMPORTED_MODULE_6__.VerticalNav, {\n    navigate: setDestination\n  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_footer__WEBPACK_IMPORTED_MODULE_11__[\"default\"], null));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Information);\n\n//# sourceURL=webpack://inference_portal/./frontend/introduction/introduction.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./frontend/component/css/background_video.css":
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./frontend/component/css/background_video.css ***!
  \*******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `video {\n    position: relative;\n    width: auto;\n    min-width: 100%;\n    height: auto;\n    background-size: cover;\n}\n.video-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    max-height: 500px;\n    overflow: hidden;\n    position: absolute;\n    top: 0;\n    right: 0;\n    z-index: -100;\n  }`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://inference_portal/./frontend/component/css/background_video.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./docs/PageContent/introduction.md":
/*!******************************************!*\
  !*** ./docs/PageContent/introduction.md ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"introduction.md\");\n\n//# sourceURL=webpack://inference_portal/./docs/PageContent/introduction.md?");

/***/ }),

/***/ "./frontend/component/css/background_video.css":
/*!*****************************************************!*\
  !*** ./frontend/component/css/background_video.css ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_background_video_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./background_video.css */ \"./node_modules/css-loader/dist/cjs.js!./frontend/component/css/background_video.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_background_video_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_background_video_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_background_video_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_background_video_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://inference_portal/./frontend/component/css/background_video.css?");

/***/ })

}]);