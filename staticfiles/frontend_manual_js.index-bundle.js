"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkinference_portal"] = self["webpackChunkinference_portal"] || []).push([["frontend_manual_js"],{

/***/ "./frontend/manual.js":
/*!****************************!*\
  !*** ./frontend/manual.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/Grid */ \"./node_modules/@mui/material/Grid/Grid.js\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _component_navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/navbar */ \"./frontend/component/navbar.js\");\n/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/Container */ \"./node_modules/@mui/material/Container/Container.js\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/Typography */ \"./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/dist/index.js\");\n/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @mui/material/Divider */ \"./node_modules/@mui/material/Divider/Divider.js\");\n/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/material/List */ \"./node_modules/@mui/material/List/List.js\");\n/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/material/ListItemButton */ \"./node_modules/@mui/material/ListItemButton/ListItemButton.js\");\n/* harmony import */ var _component_editor_js_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/editor-js.css */ \"./frontend/component/editor-js.css\");\n/* harmony import */ var _docs_Manual_authentication_md__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../docs/Manual/authentication.md */ \"./docs/Manual/authentication.md\");\n/* harmony import */ var _docs_Manual_behavior_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../docs/Manual/behavior.md */ \"./docs/Manual/behavior.md\");\n/* harmony import */ var _docs_Manual_create_key_md__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../docs/Manual/create_key.md */ \"./docs/Manual/create_key.md\");\n/* harmony import */ var _docs_Manual_error_ratelimit_md__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../docs/Manual/error_ratelimit.md */ \"./docs/Manual/error_ratelimit.md\");\n/* harmony import */ var _docs_Manual_inference_md__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../docs/Manual/inference.md */ \"./docs/Manual/inference.md\");\n/* harmony import */ var mui_markdown__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! mui-markdown */ \"./node_modules/mui-markdown/dist/index.esm.js\");\n/* harmony import */ var prism_react_renderer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prism-react-renderer */ \"./node_modules/prism-react-renderer/dist/index.mjs\");\n/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router */ \"./node_modules/react-router/dist/index.js\");\n/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prismjs */ \"./node_modules/prismjs/prism.js\");\n/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_10__);\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction Manual() {\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    prismjs__WEBPACK_IMPORTED_MODULE_10___default().highlightAll();\n  });\n  var _useParams = (0,react_router__WEBPACK_IMPORTED_MODULE_11__.useParams)(),\n    doc = _useParams.doc;\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),\n    _useState2 = _slicedToArray(_useState, 2),\n    displaydoc = _useState2[0],\n    setDisplayDoc = _useState2[1];\n  var destination_refs = {\n    key: _docs_Manual_create_key_md__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n    errorlimit: _docs_Manual_error_ratelimit_md__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n    authentication: _docs_Manual_authentication_md__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    behavior: _docs_Manual_behavior_md__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n    inference: _docs_Manual_inference_md__WEBPACK_IMPORTED_MODULE_7__[\"default\"]\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    console.log(doc);\n    axios__WEBPACK_IMPORTED_MODULE_12__[\"default\"].all([axios__WEBPACK_IMPORTED_MODULE_12__[\"default\"].get(destination_refs[doc])]).then(axios__WEBPACK_IMPORTED_MODULE_12__[\"default\"].spread(function (display_doc_object) {\n      setDisplayDoc(display_doc_object.data);\n    }))[\"catch\"](function (error) {\n      console.log(error);\n    });\n  }, [doc]);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    maxWidth: false,\n    disableGutters: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"title\", null, \"Manual\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_navbar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    maxWidth: \"xl\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    display: \"flex\",\n    alignItems: \"center\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    container: true,\n    spacing: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    item: true,\n    md: 3,\n    lg: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    mt: 3,\n    mb: 5,\n    sx: {\n      display: {\n        xs: 'none',\n        sm: 'none ',\n        md: 'block'\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    variant: \"body1\",\n    component: \"body1\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_List__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n    dense: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_19__.Link,\n    to: \"/frontend/manual/key\"\n  }, \" \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    variant: \"body2\",\n    component: \"body2\"\n  }, \" Setting Up Your API Key \"), \" \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_19__.Link,\n    to: \"/frontend/manual/authentication\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    variant: \"body2\",\n    component: \"body2\"\n  }, \" Authentication \"), \" \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_19__.Link,\n    to: \"/frontend/manual/inference\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    variant: \"body2\",\n    component: \"body2\"\n  }, \" Inference \"), \" \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_19__.Link,\n    to: \"/frontend/manual/errorlimit\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    variant: \"body2\",\n    component: \"body2\"\n  }, \" Common Errors and Ratelimits \"), \" \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_19__.Link,\n    to: \"/frontend/manual/behavior\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    variant: \"body2\",\n    component: \"body2\"\n  }, \"The behaviors of this website \"), \" \"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    orientation: \"vertical\",\n    flexItem: true,\n    sx: {\n      mr: \"-1px\"\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    item: true,\n    xs: 12,\n    md: 8,\n    lg: 8\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    mt: 3,\n    sx: {\n      display: {\n        sm: 'block ',\n        md: 'none'\n      }\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    variant: \"body1\",\n    component: \"body1\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_List__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n    dense: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_19__.Link,\n    to: \"/frontend/manual/key\"\n  }, \" \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__[\"default\"], null, \" Setting Up Your API Key \"), \" \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_19__.Link,\n    to: \"/frontend/manual/authentication\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__[\"default\"], null, \" Authentication \"), \" \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_19__.Link,\n    to: \"/frontend/manual/inference\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__[\"default\"], null, \" Inference \"), \" \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_19__.Link,\n    to: \"/frontend/manual/errorlimit\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__[\"default\"], null, \" Common Errors and Ratelimits \"), \" \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    component: react_router_dom__WEBPACK_IMPORTED_MODULE_19__.Link,\n    to: \"/frontend/manual/behavior\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_16__[\"default\"], null, \"The behaviors of this website \"), \" \")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    m: 3\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(mui_markdown__WEBPACK_IMPORTED_MODULE_8__.MuiMarkdown, {\n    overrides: _objectSpread(_objectSpread({}, (0,mui_markdown__WEBPACK_IMPORTED_MODULE_8__.getOverrides)({\n      Highlight: prism_react_renderer__WEBPACK_IMPORTED_MODULE_9__.Highlight,\n      themes: prism_react_renderer__WEBPACK_IMPORTED_MODULE_9__.themes,\n      theme: prism_react_renderer__WEBPACK_IMPORTED_MODULE_9__.themes.okaidia\n    })), {}, {\n      h1: {\n        component: 'h1'\n      },\n      h2: {\n        component: 'h2'\n      },\n      h3: {\n        component: 'h3'\n      }\n    })\n  }, displaydoc))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    orientation: \"vertical\",\n    flexItem: true,\n    sx: {\n      mr: \"-1px\"\n    }\n  })))));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Manual);\n\n//# sourceURL=webpack://inference_portal/./frontend/manual.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./frontend/component/editor-js.css":
/*!********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./frontend/component/editor-js.css ***!
  \********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `#editorjs {\n    background-color: white;\n    color: black;\n    border-radius: 5px;\n    padding: 25px;\n    font-size: 16px;\n    max-height: 600px;\n    overflow: auto;\n}\n\n#editorjs h1 {\n    font-size: 28px;\n    color: black;\n}\n\n#editorjs h2 {\n    font-size: 24px;\n    color: black;\n}\n\n#editorjs h3 {\n    font-size: 20px;\n    color: black;\n}\n\n#editorjs h4 {\n    font-size: 18px;\n    color: black;\n}\n\n#editorjs h5 {\n    font-size: 16px;\n    color: black;\n}\n\n#editorjs h6 {\n    font-size: 14px;\n    color: black;\n}\n\n#editorjs small {\n    font-size: 12px;\n    color: black;\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://inference_portal/./frontend/component/editor-js.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./docs/Manual/authentication.md":
/*!***************************************!*\
  !*** ./docs/Manual/authentication.md ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"authentication.md\");\n\n//# sourceURL=webpack://inference_portal/./docs/Manual/authentication.md?");

/***/ }),

/***/ "./docs/Manual/behavior.md":
/*!*********************************!*\
  !*** ./docs/Manual/behavior.md ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"behavior.md\");\n\n//# sourceURL=webpack://inference_portal/./docs/Manual/behavior.md?");

/***/ }),

/***/ "./docs/Manual/create_key.md":
/*!***********************************!*\
  !*** ./docs/Manual/create_key.md ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"create_key.md\");\n\n//# sourceURL=webpack://inference_portal/./docs/Manual/create_key.md?");

/***/ }),

/***/ "./docs/Manual/error_ratelimit.md":
/*!****************************************!*\
  !*** ./docs/Manual/error_ratelimit.md ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"error_ratelimit.md\");\n\n//# sourceURL=webpack://inference_portal/./docs/Manual/error_ratelimit.md?");

/***/ }),

/***/ "./docs/Manual/inference.md":
/*!**********************************!*\
  !*** ./docs/Manual/inference.md ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"inference.md\");\n\n//# sourceURL=webpack://inference_portal/./docs/Manual/inference.md?");

/***/ }),

/***/ "./frontend/component/editor-js.css":
/*!******************************************!*\
  !*** ./frontend/component/editor-js.css ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_editor_js_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./editor-js.css */ \"./node_modules/css-loader/dist/cjs.js!./frontend/component/editor-js.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_editor_js_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_editor_js_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_editor_js_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_editor_js_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://inference_portal/./frontend/component/editor-js.css?");

/***/ })

}]);