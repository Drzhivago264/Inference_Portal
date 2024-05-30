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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @mui/material/Paper */ \"./node_modules/@mui/material/Paper/Paper.js\");\n/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/Container */ \"./node_modules/@mui/material/Container/Container.js\");\n/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prismjs */ \"./node_modules/prismjs/prism.js\");\n/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var prismjs_themes_prism_okaidia_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prismjs/themes/prism-okaidia.min.css */ \"./node_modules/prismjs/themes/prism-okaidia.min.css\");\n/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prismjs/plugins/toolbar/prism-toolbar.min.css */ \"./node_modules/prismjs/plugins/toolbar/prism-toolbar.min.css\");\n/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar_min__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prismjs/plugins/toolbar/prism-toolbar.min */ \"./node_modules/prismjs/plugins/toolbar/prism-toolbar.min.js\");\n/* harmony import */ var prismjs_plugins_toolbar_prism_toolbar_min__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prismjs_plugins_toolbar_prism_toolbar_min__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _component_navbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../component/navbar */ \"./frontend/component/navbar.js\");\n/* harmony import */ var _component_vertical_nav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../component/vertical_nav */ \"./frontend/component/vertical_nav.js\");\n/* harmony import */ var _mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/material/Skeleton */ \"./node_modules/@mui/material/Skeleton/Skeleton.js\");\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/material/Stack */ \"./node_modules/@mui/material/Stack/Stack.js\");\n/* harmony import */ var mui_markdown__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! mui-markdown */ \"./node_modules/mui-markdown/dist/index.esm.js\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @mui/material/Typography */ \"./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var react_type_animation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-type-animation */ \"./node_modules/react-type-animation/dist/esm/index.es.js\");\n/* harmony import */ var _docs_PageContent_introduction_md__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../docs/PageContent/introduction.md */ \"./docs/PageContent/introduction.md\");\n/* harmony import */ var prism_react_renderer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prism-react-renderer */ \"./node_modules/prism-react-renderer/dist/index.mjs\");\n/* harmony import */ var _component_footer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../component/footer */ \"./frontend/component/footer.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/Divider/Divider.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/dist/index.js\");\n/* harmony import */ var _component_css_background_video_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../component/css/background_video.css */ \"./frontend/component/css/background_video.css\");\n/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-i18next */ \"./node_modules/react-i18next/dist/es/index.js\");\n/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @mui/material/List */ \"./node_modules/@mui/material/List/List.js\");\n/* harmony import */ var _mui_material_ListItem__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @mui/material/ListItem */ \"./node_modules/@mui/material/ListItem/ListItem.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n__webpack_require__(/*! prismjs/components/prism-c */ \"./node_modules/prismjs/components/prism-c.js\");\n__webpack_require__(/*! prismjs/components/prism-python */ \"./node_modules/prismjs/components/prism-python.js\");\n__webpack_require__(/*! prismjs/components/prism-bash */ \"./node_modules/prismjs/components/prism-bash.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction Information() {\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    prismjs__WEBPACK_IMPORTED_MODULE_1___default().highlightAll();\n  });\n  var videoRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n  var _useTranslation = (0,react_i18next__WEBPACK_IMPORTED_MODULE_13__.useTranslation)(),\n    t = _useTranslation.t,\n    i18n = _useTranslation.i18n;\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),\n    _useState2 = _slicedToArray(_useState, 2),\n    intro = _useState2[0],\n    setMessage = _useState2[1];\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState4 = _slicedToArray(_useState3, 2),\n    videoloaded = _useState4[0],\n    setVideoLoaded = _useState4[1];\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    axios__WEBPACK_IMPORTED_MODULE_14__[\"default\"].all([axios__WEBPACK_IMPORTED_MODULE_14__[\"default\"].get(_docs_PageContent_introduction_md__WEBPACK_IMPORTED_MODULE_9__[\"default\"])]).then(axios__WEBPACK_IMPORTED_MODULE_14__[\"default\"].spread(function (intro_object) {\n      setMessage(intro_object.data);\n    }))[\"catch\"](function (error) {\n      console.log(error);\n    });\n    if (videoRef) {\n      videoRef.current.play();\n      setVideoLoaded(true);\n    }\n  }, []);\n  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null),\n    _useState6 = _slicedToArray(_useState5, 2),\n    destination = _useState6[0],\n    setDestination = _useState6[1];\n  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_15__.useNavigate)();\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    if (destination) {\n      navigate(destination, {\n        replace: true\n      });\n    }\n  }, [destination]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    maxWidth: false,\n    disableGutters: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"video-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"video\", {\n    ref: videoRef,\n    className: \"videoTag\",\n    autoPlay: true,\n    loop: true,\n    muted: true,\n    playsInline: true,\n    disablePictureInPicture: true,\n    controlsList: \"nodownload\",\n    onPlay: function onPlay() {\n      setVideoLoaded(true);\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"source\", {\n    src: \"/static/video/introduction_background.mp4\",\n    type: \"video/mp4\"\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"title\", null, \"Introduction\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_navbar__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null), !videoloaded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    maxWidth: \"lg\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n    mt: {\n      xs: 75\n    },\n    spacing: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    variant: \"rounded\",\n    animation: \"wave\",\n    height: 350\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    variant: \"rounded\",\n    animation: \"wave\",\n    height: 350\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Skeleton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    variant: \"rounded\",\n    animation: \"wave\",\n    height: 300\n  }))), videoloaded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    maxWidth: \"lg\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    sx: {\n      display: 'flex',\n      flexWrap: 'wrap',\n      '& > :not(style)': {\n        width: 1,\n        mt: {\n          xs: 12,\n          sm: 12,\n          md: 15,\n          lg: 17\n        },\n        height: {\n          xs: \"240px\",\n          sm: '270px',\n          md: '220px',\n          lg: '180px'\n        },\n        fontSize: {\n          xs: \"1.3em\",\n          sm: '1.5em',\n          md: '1.75em'\n        }\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    sx: {\n      backgroundColor: function backgroundColor(theme) {\n        return theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, .25)' : 'rgba(255, 255, 255, .25)';\n      },\n      borderRadius: '12px'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_type_animation__WEBPACK_IMPORTED_MODULE_8__.TypeAnimation, {\n    style: {\n      whiteSpace: 'pre-line',\n      display: 'inline-block',\n      padding: '20px',\n      lineHeight: 1.7\n    },\n    sequence: [t('introduction.introduction_animation', {\n      returnObjects: true\n    })[0], 1500, t('introduction.introduction_animation', {\n      returnObjects: true\n    })[1], 1500, t('introduction.introduction_animation', {\n      returnObjects: true\n    })[2], 3000, '', function () {}],\n    wrapper: \"span\",\n    cursor: true,\n    repeat: Infinity,\n    speed: 120,\n    deletionSpeed: 90\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    sx: {\n      display: 'flex',\n      justifyContent: 'center',\n      alignItems: 'center'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    maxWidth: \"md\",\n    mt: {\n      xs: 22,\n      sm: 24,\n      md: 20,\n      lg: 22\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    mt: 5,\n    mb: 5,\n    p: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    mt: 2,\n    mb: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    variant: \"h4\"\n  }, t('introduction.about_title'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_21__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    mt: 2,\n    mb: 8\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], null, t('introduction.about_chunk_1')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    ml: 4\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_List__WEBPACK_IMPORTED_MODULE_22__[\"default\"], {\n    sx: {\n      listStyleType: 'disc'\n    }\n  }, t('introduction.user_list', {\n    returnObjects: true\n  }).map(function (l) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_23__[\"default\"], {\n      sx: {\n        display: 'list-item'\n      }\n    }, l);\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    style: {\n      whiteSpace: 'pre-line'\n    }\n  }, t('introduction.about_chunk_2'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    mt: 2,\n    mb: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    variant: \"h4\"\n  }, t('introduction.tool_title'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_21__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    mt: 2,\n    mb: 8\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], null, t('introduction.tool_chunk_1')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    ml: 4\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_List__WEBPACK_IMPORTED_MODULE_22__[\"default\"], {\n    sx: {\n      listStyleType: 'disc'\n    }\n  }, t('introduction.tool_list', {\n    returnObjects: true\n  }).map(function (l) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_23__[\"default\"], {\n      sx: {\n        display: 'list-item'\n      }\n    }, l);\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], null, t('introduction.tool_chunk_2')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    ml: 4\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_List__WEBPACK_IMPORTED_MODULE_22__[\"default\"], {\n    sx: {\n      listStyleType: 'disc'\n    }\n  }, t('introduction.call_to_act_list', {\n    returnObjects: true\n  }).map(function (l) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_23__[\"default\"], {\n      sx: {\n        display: 'list-item'\n      }\n    }, l);\n  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    mt: 2,\n    mb: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    variant: \"h4\"\n  }, t('introduction.example_title'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_21__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    mt: 2\n  }, t('introduction.example_chunk_1')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    mt: 1,\n    mb: 1,\n    sx: {\n      display: 'flex',\n      flexWrap: 'wrap',\n      '& > :not(style)': {\n        width: 1,\n        height: {\n          xs: \"250px\"\n        },\n        overflow: 'auto',\n        fontSize: {\n          xs: \"1em\"\n        }\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_24__[\"default\"], {\n    variant: \"outlined\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    variant: \"body1\",\n    style: _defineProperty({\n      whiteSpace: 'pre-line',\n      display: 'block',\n      padding: '10px',\n      lineHeight: 1.7\n    }, \"whiteSpace\", \"pre-wrap\")\n  }, t('introduction.example_1')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_21__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_type_animation__WEBPACK_IMPORTED_MODULE_8__.TypeAnimation, {\n    style: {\n      whiteSpace: 'pre-line',\n      display: 'block',\n      padding: '10px',\n      lineHeight: 1.7\n    },\n    sequence: [t('introduction.example_1_answer'), 3000, '', function () {}],\n    wrapper: \"span\",\n    cursor: true,\n    repeat: Infinity,\n    speed: 120,\n    deletionSpeed: 90\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    mt: 2\n  }, t('introduction.example_chunk_2')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    sx: {\n      display: 'flex',\n      flexWrap: 'wrap',\n      '& > :not(style)': {\n        width: 1,\n        mt: 2,\n        height: {\n          xs: \"250px\"\n        },\n        overflow: 'auto',\n        fontSize: {\n          xs: \"1em\"\n        }\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Paper__WEBPACK_IMPORTED_MODULE_24__[\"default\"], {\n    variant: \"outlined\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    variant: \"body1\",\n    style: _defineProperty({\n      whiteSpace: 'pre-line',\n      display: 'block',\n      padding: '10px',\n      lineHeight: 1.7\n    }, \"whiteSpace\", \"pre-wrap\")\n  }, t('introduction.example_2')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_21__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_type_animation__WEBPACK_IMPORTED_MODULE_8__.TypeAnimation, {\n    style: {\n      whiteSpace: 'pre-line',\n      display: 'block',\n      padding: '10px',\n      lineHeight: 1.7\n    },\n    sequence: [t('introduction.example_2_answer'), 3000, '', function () {}],\n    wrapper: \"span\",\n    cursor: true,\n    repeat: Infinity,\n    speed: 120,\n    deletionSpeed: 90\n  }))))))), videoloaded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_footer__WEBPACK_IMPORTED_MODULE_11__[\"default\"], null));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Information);\n\n//# sourceURL=webpack://inference_portal/./frontend/introduction/introduction.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./frontend/component/css/background_video.css":
/*!*******************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./frontend/component/css/background_video.css ***!
  \*******************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `video {\n    position: relative;\n    width: auto;\n    min-width: 1500px;\n    width: 100%;\n    height: auto;\n    background-size: cover;\n}\n.video-container {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    min-width: 100%;\n    height: 550px;\n    overflow: hidden;\n    position: absolute;\n    top: 0;\n    right: 0;\n    z-index: -1;  \n  }`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://inference_portal/./frontend/component/css/background_video.css?./node_modules/css-loader/dist/cjs.js");

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