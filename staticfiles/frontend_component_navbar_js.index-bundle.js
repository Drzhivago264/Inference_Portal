"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkinference_portal"] = self["webpackChunkinference_portal"] || []).push([["frontend_component_navbar_js"],{

/***/ "./frontend/component/color.js":
/*!*************************************!*\
  !*** ./frontend/component/color.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Constant_Colours = {\n  blue: {\n    50: '#F0F7FF',\n    100: '#C2E0FF',\n    200: '#99CCF3',\n    300: '#66B2FF',\n    400: '#3399FF',\n    500: '#007FFF',\n    600: '#0072E6',\n    700: '#0059B3',\n    800: '#004C99',\n    900: '#003A75'\n  },\n  grey: {\n    50: '#F3F6F9',\n    100: '#E5EAF2',\n    200: '#DAE2ED',\n    300: '#C7D0DD',\n    400: '#B0B8C4',\n    500: '#9DA8B7',\n    600: '#6B7A90',\n    700: '#434D5B',\n    800: '#303740',\n    900: '#1C2025'\n  },\n  OTHER_THINGS: 'whatever'\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Constant_Colours);\n\n//# sourceURL=webpack://inference_portal/./frontend/component/color.js?");

/***/ }),

/***/ "./frontend/component/navbar.js":
/*!**************************************!*\
  !*** ./frontend/component/navbar.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material_AppBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/AppBar */ \"./node_modules/@mui/material/AppBar/AppBar.js\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/IconButton */ \"./node_modules/@mui/material/IconButton/IconButton.js\");\n/* harmony import */ var _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/icons-material/Menu */ \"./node_modules/@mui/icons-material/Menu.js\");\n/* harmony import */ var _mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/Toolbar */ \"./node_modules/@mui/material/Toolbar/Toolbar.js\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/material/Typography */ \"./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/Container */ \"./node_modules/@mui/material/Container/Container.js\");\n/* harmony import */ var _mui_base_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/base/Button */ \"./node_modules/@mui/base/Button/Button.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/dist/index.js\");\n/* harmony import */ var _mui_base_Dropdown__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/base/Dropdown */ \"./node_modules/@mui/base/Dropdown/Dropdown.js\");\n/* harmony import */ var _mui_base_Menu__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/base/Menu */ \"./node_modules/@mui/base/Menu/Menu.js\");\n/* harmony import */ var _mui_base_MenuButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/base/MenuButton */ \"./node_modules/@mui/base/MenuButton/MenuButton.js\");\n/* harmony import */ var _mui_base_MenuItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/base/MenuItem */ \"./node_modules/@mui/base/MenuItem/MenuItem.js\");\n/* harmony import */ var _mui_base_MenuItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/base/MenuItem */ \"./node_modules/@mui/base/MenuItem/menuItemClasses.js\");\n/* harmony import */ var _mui_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/system */ \"./node_modules/@mui/system/esm/styled.js\");\n/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ \"./frontend/component/color.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/dist/index.js\");\n/* harmony import */ var _mui_material_Drawer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/Drawer */ \"./node_modules/@mui/material/Drawer/Drawer.js\");\n/* harmony import */ var _vertical_nav_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vertical_nav.js */ \"./frontend/component/vertical_nav.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar blue = _color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].blue;\nvar grey = _color_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].grey;\nvar Listbox = (0,_mui_system__WEBPACK_IMPORTED_MODULE_3__[\"default\"])('ul')(function (_ref) {\n  var theme = _ref.theme;\n  return \"\\n  font-family: 'IBM Plex Sans', sans-serif;\\n  font-size: 0.875rem;\\n  box-sizing: border-box;\\n  padding: 6px;\\n  margin: 12px 0;\\n  min-width: 80px;\\n  border-radius: 12px;\\n  overflow: auto;\\n  outline: 0px;\\n  background: \".concat(theme.palette.mode === 'dark' ? grey[900] : '#fff', \";\\n  border: 1px solid \").concat(theme.palette.mode === 'dark' ? grey[700] : grey[200], \";\\n  color: \").concat(theme.palette.mode === 'dark' ? grey[300] : grey[900], \";\\n  box-shadow: 0px 4px 6px \").concat(theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)', \";\\n  z-index: 1;\\n  \");\n});\nvar MenuItem = (0,_mui_system__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_mui_base_MenuItem__WEBPACK_IMPORTED_MODULE_4__.MenuItem)(function (_ref2) {\n  var theme = _ref2.theme;\n  return \"\\n  list-style: none;\\n  padding: 8px;\\n  border-radius: 8px;\\n  cursor: default;\\n  user-select: none;\\n\\n  &:last-of-type {\\n    border-bottom: none;\\n  }\\n\\n  &:focus {\\n    outline: 3px solid \".concat(theme.palette.mode === 'dark' ? blue[600] : blue[200], \";\\n    background-color: \").concat(theme.palette.mode === 'dark' ? grey[800] : grey[100], \";\\n    color: \").concat(theme.palette.mode === 'dark' ? grey[300] : grey[900], \";\\n  }\\n\\n  &.\").concat(_mui_base_MenuItem__WEBPACK_IMPORTED_MODULE_5__.menuItemClasses.disabled, \" {\\n    color: \").concat(theme.palette.mode === 'dark' ? grey[700] : grey[400], \";\\n  }\\n  \");\n});\nvar NavLink = (0,_mui_system__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link)(function (_ref3) {\n  var theme = _ref3.theme;\n  return \"\\n    display: flex;\\n    align-items: center;\\n    text-decoration: none;\\n    width:100%;\\n    cursor: pointer;\\n    color: \".concat(theme.palette.mode === 'dark' ? grey[200] : grey[900], \";\\n    &.active {\\n        color: #4d4dff;\\n    }\\n\");\n});\nvar Button = (0,_mui_system__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_mui_base_Button__WEBPACK_IMPORTED_MODULE_7__.Button)(function (_ref4) {\n  var theme = _ref4.theme;\n  return \"\\n  font-size: 14px;\\n  line-height: 1;\\n  padding-top: 8px;\\n  padding-bottom: 10px;\\n  padding-left: 8px;\\n  padding-right: 8px;\\n  border-radius: 8px;\\n  transition: all 150ms ease;\\n  cursor: pointer;\\n  border: 0px;\\n  background: transparent;\\n  color: \".concat(theme.palette.mode === 'dark' ? grey[100] : grey[900], \";\\n\\n  &:hover {\\n    background: \").concat(theme.palette.mode === 'dark' ? grey[800] : grey[100], \";\\n    color: \").concat(theme.palette.mode === 'dark' ? grey[200] : grey[900], \";\\n    border-color: \").concat(theme.palette.mode === 'dark' ? grey[600] : grey[300], \";\\n    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\\n  }\\n\\n  &:active {\\n    background: \").concat(theme.palette.mode === 'dark' ? grey[700] : grey[100], \";\\n  }\\n\\n  &:focus-visible {\\n    box-shadow: 0 0 0 4px \").concat(theme.palette.mode === 'dark' ? blue[300] : blue[200], \";\\n    outline: none;\\n  }\\n  \");\n});\nvar AppBarColored = (0,_mui_system__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_mui_material_AppBar__WEBPACK_IMPORTED_MODULE_8__[\"default\"])(function (_ref5) {\n  var theme = _ref5.theme;\n  return \"\\n  background: \".concat(theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(0, 0, 0, 0.04)', \";\\n  color: \").concat(theme.palette.mode === 'dark' ? 'white' : 'black', \";\\n  border-bottom: 1px solid \").concat(theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : grey[200], \";\\n  backdrop-filter: blur(20px); \\n  \");\n});\nvar MenuButton = (0,_mui_system__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(_mui_base_MenuButton__WEBPACK_IMPORTED_MODULE_9__.MenuButton)(function (_ref6) {\n  var theme = _ref6.theme;\n  return \"\\n  font-family: 'IBM Plex Sans', sans-serif;\\n  font-weight: 600;\\n  font-size: 0.875rem;\\n  line-height: 1.5;\\n  padding: 8px 16px;\\n  margin: 5px;\\n  border-radius: 8px;\\n  color: white;\\n  transition: all 150ms ease;\\n  cursor: pointer;\\n  background: \".concat(theme.palette.mode === 'dark' ? grey[900] : '#fff', \";\\n  border: 1px solid \").concat(theme.palette.mode === 'dark' ? grey[700] : grey[200], \";\\n  color: \").concat(theme.palette.mode === 'dark' ? grey[200] : grey[900], \";\\n  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\\n\\n  &:hover {\\n    background: \").concat(theme.palette.mode === 'dark' ? grey[800] : grey[50], \";\\n    border-color: \").concat(theme.palette.mode === 'dark' ? grey[600] : grey[300], \";\\n  }\\n\\n  &:active {\\n    background: \").concat(theme.palette.mode === 'dark' ? grey[700] : grey[100], \";\\n  }\\n\\n  &:focus-visible {\\n    box-shadow: 0 0 0 4px \").concat(theme.palette.mode === 'dark' ? blue[300] : blue[200], \";\\n    outline: none;\\n  }\\n  \");\n});\nfunction ResponsiveAppBar() {\n  var navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useNavigate)();\n  var redirect = function redirect(e) {\n    if (e.target.value == \"key-management\") {\n      navigate('/frontend/key-management');\n    } else if (e.target.value == \"contact\") {\n      navigate('/frontend/contact');\n    }\n  };\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),\n    _React$useState2 = _slicedToArray(_React$useState, 2),\n    open = _React$useState2[0],\n    setOpen = _React$useState2[1];\n  var toggleDrawer = function toggleDrawer(newOpen) {\n    return function () {\n      setOpen(newOpen);\n    };\n  };\n  var DrawerList = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    sx: {\n      width: 250\n    },\n    role: \"presentation\",\n    onClick: toggleDrawer(false)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_vertical_nav_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null));\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AppBarColored, {\n    position: \"sticky\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Drawer__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    open: open,\n    onClose: toggleDrawer(false)\n  }, DrawerList), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    maxWidth: \"xl\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Toolbar__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    disableGutters: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    size: \"large\",\n    edge: \"start\",\n    color: \"inherit\",\n    \"aria-label\": \"menu\",\n    sx: {\n      mr: 2,\n      display: {\n        xs: 'block',\n        sm: 'none'\n      }\n    },\n    onClick: toggleDrawer(true)\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_16__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n    variant: \"h6\",\n    noWrap: true,\n    component: \"a\",\n    href: \"/\",\n    sx: {\n      mr: 2,\n      fontWeight: 700,\n      color: 'inherit',\n      textDecoration: 'none'\n    }\n  }, \"Inference\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_base_Dropdown__WEBPACK_IMPORTED_MODULE_18__.Dropdown, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MenuButton, {\n    sx: {\n      display: {\n        xs: 'none',\n        sm: 'block'\n      }\n    }\n  }, \"Information\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_base_Menu__WEBPACK_IMPORTED_MODULE_19__.Menu, {\n    slots: {\n      listbox: Listbox\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MenuItem, null, \" \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavLink, {\n    to: \"/\"\n  }, \"Introduction\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MenuItem, null, \" \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavLink, {\n    to: \"/frontend/manual/key\"\n  }, \"Manual\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MenuItem, null, \" \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavLink, {\n    to: \"/frontend/model\"\n  }, \"Model\")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_base_Dropdown__WEBPACK_IMPORTED_MODULE_18__.Dropdown, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MenuButton, {\n    sx: {\n      display: {\n        xs: 'none',\n        sm: 'block'\n      }\n    }\n  }, \"Modes\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_mui_base_Menu__WEBPACK_IMPORTED_MODULE_19__.Menu, {\n    slots: {\n      listbox: Listbox\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MenuItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavLink, {\n    to: \"/frontend/hub\"\n  }, \"Chat & Log\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(MenuItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavLink, {\n    to: \"/frontend/api/docs\"\n  }, \"API Docs\")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Button, {\n    key: \"key-management\",\n    value: \"key-management\",\n    onClick: function onClick(e) {\n      return redirect(e);\n    },\n    sx: {\n      textDecoration: 'none',\n      display: {\n        xs: 'none',\n        sm: 'block'\n      }\n    }\n  }, \"Key & Credit\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Button, {\n    key: \"contact\",\n    value: \"contact\",\n    onClick: function onClick(e) {\n      return redirect(e);\n    },\n    sx: {\n      textDecoration: 'none',\n      display: {\n        xs: 'none',\n        sm: 'block'\n      }\n    }\n  }, \"Contact\"))));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResponsiveAppBar);\n\n//# sourceURL=webpack://inference_portal/./frontend/component/navbar.js?");

/***/ }),

/***/ "./frontend/component/vertical_nav.js":
/*!********************************************!*\
  !*** ./frontend/component/vertical_nav.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_icons_material_Api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/icons-material/Api */ \"./node_modules/@mui/icons-material/Api.js\");\n/* harmony import */ var _mui_icons_material_Article__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/icons-material/Article */ \"./node_modules/@mui/icons-material/Article.js\");\n/* harmony import */ var _mui_icons_material_PrecisionManufacturing__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/icons-material/PrecisionManufacturing */ \"./node_modules/@mui/icons-material/PrecisionManufacturing.js\");\n/* harmony import */ var _mui_icons_material_Layers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/icons-material/Layers */ \"./node_modules/@mui/icons-material/Layers.js\");\n/* harmony import */ var _mui_icons_material_Chat__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/icons-material/Chat */ \"./node_modules/@mui/icons-material/Chat.js\");\n/* harmony import */ var _mui_icons_material_Key__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/icons-material/Key */ \"./node_modules/@mui/icons-material/Key.js\");\n/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/ListItemButton */ \"./node_modules/@mui/material/ListItemButton/ListItemButton.js\");\n/* harmony import */ var _mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/ListItemIcon */ \"./node_modules/@mui/material/ListItemIcon/ListItemIcon.js\");\n/* harmony import */ var _mui_icons_material_Email__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/icons-material/Email */ \"./node_modules/@mui/icons-material/Email.js\");\n/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/List */ \"./node_modules/@mui/material/List/List.js\");\n/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/ListItemText */ \"./node_modules/@mui/material/ListItemText/ListItemText.js\");\n/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Divider */ \"./node_modules/@mui/material/Divider/Divider.js\");\n/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Link */ \"./node_modules/@mui/material/Link/Link.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar VerticalNav = function VerticalNav() {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_List__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    component: _mui_material_Link__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    href: \"/frontend/key-management\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Key__WEBPACK_IMPORTED_MODULE_5__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    primary: \"Key & Credit\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    component: \"li\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    button: true,\n    component: _mui_material_Link__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    href: \"/frontend/api/docs\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Api__WEBPACK_IMPORTED_MODULE_8__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    primary: \"APIs\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    component: \"li\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    button: true,\n    component: _mui_material_Link__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    href: \"/frontend/hub\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Chat__WEBPACK_IMPORTED_MODULE_9__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    primary: \"Chatbots & Agents\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    component: \"li\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    button: true,\n    component: _mui_material_Link__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    href: \"/frontend/manual/key\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Article__WEBPACK_IMPORTED_MODULE_10__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    primary: \"Manual\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    component: \"li\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    button: true,\n    component: _mui_material_Link__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    href: \"/frontend/model\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Layers__WEBPACK_IMPORTED_MODULE_11__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    primary: \"Available Models\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    component: \"li\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    button: true,\n    component: _mui_material_Link__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    href: \"https://construction.professorparakeet.com/\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_PrecisionManufacturing__WEBPACK_IMPORTED_MODULE_12__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    primary: \"Construction Zone\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    component: \"li\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    button: true,\n    component: _mui_material_Link__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    href: \"/frontend/contact\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_4__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Email__WEBPACK_IMPORTED_MODULE_13__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    primary: \"Contact Us\"\n  })));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VerticalNav);\n\n//# sourceURL=webpack://inference_portal/./frontend/component/vertical_nav.js?");

/***/ })

}]);