"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkinference_portal"] = self["webpackChunkinference_portal"] || []).push([["frontend_user_instruction_js"],{

/***/ "./frontend/user_instruction.js":
/*!**************************************!*\
  !*** ./frontend/user_instruction.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ \"./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/Grid */ \"./node_modules/@mui/material/Grid/Grid.js\");\n/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/Container */ \"./node_modules/@mui/material/Container/Container.js\");\n/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/material/TextField */ \"./node_modules/@mui/material/TextField/TextField.js\");\n/* harmony import */ var _component_navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/navbar */ \"./frontend/component/navbar.js\");\n/* harmony import */ var _component_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/footer */ \"./frontend/component/footer.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/List/List.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/Divider/Divider.js\");\n/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/Alert */ \"./node_modules/@mui/material/Alert/Alert.js\");\n/* harmony import */ var _mui_material_IconButton__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/material/IconButton */ \"./node_modules/@mui/material/IconButton/IconButton.js\");\n/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react-beautiful-dnd */ \"./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js\");\n/* harmony import */ var _mui_icons_material_AddCircleOutline__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/icons-material/AddCircleOutline */ \"./node_modules/@mui/icons-material/AddCircleOutline.js\");\n/* harmony import */ var _mui_material_FormControl__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/material/FormControl */ \"./node_modules/@mui/material/FormControl/FormControl.js\");\n/* harmony import */ var _mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @mui/icons-material/Delete */ \"./node_modules/@mui/icons-material/Delete.js\");\n/* harmony import */ var _mui_icons_material_DragHandle__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @mui/icons-material/DragHandle */ \"./node_modules/@mui/icons-material/DragHandle.js\");\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @mui/material/Stack */ \"./node_modules/@mui/material/Stack/Stack.js\");\n/* harmony import */ var _mui_icons_material_Save__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @mui/icons-material/Save */ \"./node_modules/@mui/icons-material/Save.js\");\n/* harmony import */ var _mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/ListItemButton */ \"./node_modules/@mui/material/ListItemButton/ListItemButton.js\");\n/* harmony import */ var _mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/ListItemIcon */ \"./node_modules/@mui/material/ListItemIcon/ListItemIcon.js\");\n/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/ListItemText */ \"./node_modules/@mui/material/ListItemText/ListItemText.js\");\n/* harmony import */ var _mui_icons_material_Folder__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/icons-material/Folder */ \"./node_modules/@mui/icons-material/Folder.js\");\n/* harmony import */ var _mui_icons_material_FolderOpen__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/icons-material/FolderOpen */ \"./node_modules/@mui/icons-material/FolderOpen.js\");\n/* harmony import */ var _component_getCookie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/getCookie */ \"./frontend/component/getCookie.js\");\n/* harmony import */ var _mui_lab_LoadingButton__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @mui/lab/LoadingButton */ \"./node_modules/@mui/lab/LoadingButton/LoadingButton.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction UserInstruction() {\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState2 = _slicedToArray(_useState, 2),\n    loading = _useState2[0],\n    setLoading = _useState2[1];\n  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),\n    _useState4 = _slicedToArray(_useState3, 2),\n    template_list = _useState4[0],\n    setTemplateList = _useState4[1];\n  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),\n    _useState6 = _slicedToArray(_useState5, 2),\n    selectedIndex = _useState6[0],\n    setSelectedIndex = _useState6[1];\n  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState8 = _slicedToArray(_useState7, 2),\n    add_child_error = _useState8[0],\n    setAddChildError = _useState8[1];\n  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),\n    _useState10 = _slicedToArray(_useState9, 2),\n    add_parent_error = _useState10[0],\n    setAddParentError = _useState10[1];\n  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([{\n      id: null,\n      name: \"\",\n      instruction: \"\"\n    }]),\n    _useState12 = _slicedToArray(_useState11, 2),\n    children_instruction_list = _useState12[0],\n    setChildInstructionList = _useState12[1];\n  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n      id: null,\n      name: \"\",\n      instruction: \"\"\n    }),\n    _useState14 = _slicedToArray(_useState13, 2),\n    default_parent_instruction = _useState14[0],\n    setDefaultParentInstruction = _useState14[1];\n  var handleOnDragEnd = function handleOnDragEnd(result) {\n    var items = children_instruction_list;\n    var _items$splice = items.splice(result.source.index, 1),\n      _items$splice2 = _slicedToArray(_items$splice, 1),\n      reorderedItem = _items$splice2[0];\n    items.splice(result.destination.index, 0, reorderedItem);\n    setChildInstructionList(items);\n  };\n  var updateTemplateName = function updateTemplateName(v) {\n    var new_parent_instruction = default_parent_instruction;\n    new_parent_instruction['name'] = v;\n    setDefaultParentInstruction(new_parent_instruction);\n    var new_template_list = _toConsumableArray(template_list);\n    var new_template = _objectSpread({}, template_list[default_parent_instruction['template_list_index']]);\n    new_template['name'] = v;\n    new_template_list[default_parent_instruction['template_list_index']] = new_template;\n    setTemplateList(new_template_list);\n  };\n  var updateParentInstruction = function updateParentInstruction(v) {\n    var new_parent_instruction = default_parent_instruction;\n    new_parent_instruction['instruction'] = v;\n    setDefaultParentInstruction(new_parent_instruction);\n  };\n  var submitTemplate = function submitTemplate() {\n    setLoading(true);\n    var csrftoken = (0,_component_getCookie__WEBPACK_IMPORTED_MODULE_3__.getCookie)('csrftoken');\n    var config = {\n      headers: {\n        'content-type': 'application/json',\n        'X-CSRFToken': csrftoken\n      }\n    };\n    var data = {\n      \"parent_instruction\": default_parent_instruction,\n      \"childrens\": children_instruction_list\n    };\n    console.log(data);\n    console.log(data);\n    axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].post(\"/frontend-api/crud-user-instruction\", data, config).then(function (response) {\n      console.log(response);\n      request_instruction();\n      setLoading(false);\n    })[\"catch\"](function (error) {\n      setLoading(false);\n    });\n  };\n  var handleTextFieldChange = function handleTextFieldChange(index, property, value) {\n    var new_children_instruction_list = _toConsumableArray(children_instruction_list);\n    var new_instruction = _objectSpread({}, children_instruction_list[index]);\n    new_instruction[property] = value;\n    new_children_instruction_list[index] = new_instruction;\n    console.log(new_children_instruction_list);\n    setChildInstructionList(new_children_instruction_list);\n  };\n  var handleListItemClick = function handleListItemClick(event, index) {\n    var new_parent = {\n      'template_list_index': index,\n      'id': template_list[index]['id'],\n      'name': template_list[index]['name'],\n      'instruction': template_list[index]['instruction']\n    };\n    setDefaultParentInstruction(new_parent);\n    console.log(default_parent_instruction);\n    var default_child_instruction = [];\n    if (template_list[index]['children'] === null) {\n      setChildInstructionList([{\n        id: null,\n        name: \"\",\n        instruction: \"\"\n      }]);\n    } else {\n      for (var c in template_list[index]['children']) {\n        default_child_instruction.push({\n          'id': template_list[index]['children'][c]['id'],\n          'name': template_list[index]['children'][c]['displayed_name'],\n          'instruction': template_list[index]['children'][c]['instruct']\n        });\n      }\n      setChildInstructionList(default_child_instruction);\n    }\n    setSelectedIndex(index);\n  };\n  var addParent = function addParent(operation) {\n    var length = template_list.length;\n    if (length < 5) {\n      if (operation == \"add\") {\n        var new_template_list = [].concat(_toConsumableArray(template_list), [{\n          id: null,\n          name: \"Empty Template\",\n          instruction: \"\",\n          children: null\n        }]);\n        setTemplateList(new_template_list);\n        setChildInstructionList([{\n          id: null,\n          name: \"\",\n          instruction: \"\"\n        }]);\n        setDefaultParentInstruction({\n          'id': null,\n          'name': \"\",\n          'instruction': \"\",\n          'template_list_index': null\n        });\n      }\n    }\n  };\n  function addChild(operation) {\n    var length = children_instruction_list.length;\n    if (length < 3) {\n      setAddChildError(false);\n      if (operation == \"add\") {\n        var new_children_instruction_list = [].concat(_toConsumableArray(children_instruction_list), [{\n          id: null,\n          name: \"\",\n          instruction: \"\"\n        }]);\n        setChildInstructionList(new_children_instruction_list);\n      } else {\n        var _new_children_instruction_list = _toConsumableArray(children_instruction_list);\n        _new_children_instruction_list.splice(-1);\n        setChildInstructionList(_new_children_instruction_list);\n      }\n    } else {\n      setAddChildError(true);\n      if (operation == \"delete\") {\n        var _new_children_instruction_list2 = _toConsumableArray(children_instruction_list);\n        _new_children_instruction_list2.splice(-1);\n        setChildInstructionList(_new_children_instruction_list2);\n        setAddChildError(false);\n      }\n    }\n  }\n  var request_instruction = function request_instruction() {\n    axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].all([axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get('/frontend-api/get-user-instruction')]).then(axios__WEBPACK_IMPORTED_MODULE_4__[\"default\"].spread(function (template_object) {\n      if (template_object.status != 204) {\n        var _template_list = [];\n        if (template_object.data.root_nodes.length >= 5) {\n          setAddParentError(true);\n        }\n        for (var template in template_object.data.root_nodes) {\n          if (template == 0) {\n            setDefaultParentInstruction({\n              'template_list_index': template,\n              'id': template_object.data.root_nodes[template]['id'],\n              'name': template_object.data.root_nodes[template]['displayed_name'],\n              'instruction': template_object.data.root_nodes[template]['instruct']\n            });\n            var default_child_instruction = [];\n            for (var c in template_object.data.root_nodes[template].children) {\n              default_child_instruction.push({\n                'id': template_object.data.root_nodes[0].children[c]['id'],\n                'name': template_object.data.root_nodes[0].children[c]['displayed_name'],\n                'instruction': template_object.data.root_nodes[0].children[c]['instruct']\n              });\n            }\n            setChildInstructionList(default_child_instruction);\n          }\n          _template_list.push({\n            'id': template_object.data.root_nodes[template]['id'],\n            'name': template_object.data.root_nodes[template]['displayed_name'],\n            'instruction': template_object.data.root_nodes[template]['instruct'],\n            'children': template_object.data.root_nodes[template]['children']\n          });\n        }\n        setTemplateList(_template_list);\n      }\n    }))[\"catch\"](function (error) {\n      console.log(error);\n    });\n  };\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    request_instruction();\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    maxWidth: false,\n    sx: {\n      minWidth: 1200\n    },\n    disableGutters: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"title\", null, \"Templates\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_navbar__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    maxWidth: \"lg\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    m: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    container: true,\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    item: true,\n    xs: 4\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    mt: 1,\n    mb: 1,\n    variant: \"body1\"\n  }, \"Instruction Template\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_9__[\"default\"], null, template_list.map(function (t, index) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemButton__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n      sx: {\n        height: 38\n      },\n      key: index,\n      selected: selectedIndex === index,\n      onClick: function onClick(event) {\n        return handleListItemClick(event, index);\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemIcon__WEBPACK_IMPORTED_MODULE_11__[\"default\"], null, selectedIndex === index && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_FolderOpen__WEBPACK_IMPORTED_MODULE_12__[\"default\"], null), selectedIndex !== index && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Folder__WEBPACK_IMPORTED_MODULE_13__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n      primaryTypographyProps: {\n        fontWeight: 'medium',\n        variant: 'body2'\n      },\n      primary: t.name\n    }));\n  }), add_parent_error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    severity: \"warning\"\n  }, \"Reaching the maximum number of parent (5).\"), !add_parent_error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    \"aria-label\": \"add\",\n    onClick: function onClick() {\n      addParent(\"add\");\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_AddCircleOutline__WEBPACK_IMPORTED_MODULE_17__[\"default\"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    item: true,\n    xs: 8\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    fullWidth: true,\n    sx: {\n      m: 1\n    },\n    variant: \"standard\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    label: \"Template Name\",\n    multiline: true,\n    maxRows: 1,\n    InputLabelProps: {\n      shrink: true\n    },\n    defaultValue: default_parent_instruction['name'],\n    onChange: function onChange(e) {\n      updateTemplateName(e.target.value);\n    },\n    inputProps: {\n      maxLength: 35\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    mt: 1,\n    mb: 1,\n    display: \"flex\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    fullWidth: true,\n    variant: \"standard\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    label: \"Parent Instruction\",\n    multiline: true,\n    minRows: 4,\n    maxRows: 8,\n    InputLabelProps: {\n      shrink: true\n    },\n    onChange: function onChange(e) {\n      updateParentInstruction(e.target.value);\n    },\n    defaultValue: default_parent_instruction['instruction'],\n    inputProps: {\n      maxLength: 2500\n    }\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_20__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_21__.DragDropContext, {\n    onDragEnd: handleOnDragEnd\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_21__.Droppable, {\n    droppableId: \"childrens\"\n  }, function (provided) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__[\"default\"], _extends({\n      className: \"childrens\"\n    }, provided.droppableProps, {\n      ref: provided.innerRef\n    }), children_instruction_list && children_instruction_list.map(function (child, index) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_21__.Draggable, {\n        key: index,\n        draggableId: child.name + index,\n        index: index\n      }, function (provided) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__[\"default\"], _extends({\n          mt: 1,\n          className: \"childrens\",\n          ref: provided.innerRef\n        }, provided.draggableProps, provided.dragHandleProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_22__[\"default\"], {\n          direction: \"row\",\n          spacing: 2\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n          \"aria-label\": \"delete\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_DragHandle__WEBPACK_IMPORTED_MODULE_23__[\"default\"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n          fullWidth: true,\n          variant: \"standard\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n          mt: 1,\n          display: \"flex\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n          fullWidth: true,\n          variant: \"standard\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n          label: \"Children No.\".concat(index, \" Name\"),\n          inputProps: {\n            maxLength: 35\n          },\n          maxRows: 1,\n          defaultValue: child.name,\n          InputLabelProps: {\n            shrink: true\n          },\n          onChange: function onChange(e) {\n            return handleTextFieldChange(index, \"name\", e.target.value);\n          }\n        }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n          mt: 1,\n          display: \"flex\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControl__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n          fullWidth: true,\n          variant: \"standard\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n          label: \"Child No.\".concat(index, \" Instruction\"),\n          multiline: true,\n          minRows: 4,\n          inputProps: {\n            maxLength: 2500\n          },\n          InputLabelProps: {\n            shrink: true\n          },\n          maxRows: 8,\n          defaultValue: child.instruction,\n          onChange: function onChange(e) {\n            return handleTextFieldChange(index, \"instruction\", e.target.value);\n          }\n        }))))));\n      });\n    }), provided.placeholder);\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    display: \"flex\",\n    justifyContent: \"center\",\n    alignItems: \"center\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_lab_LoadingButton__WEBPACK_IMPORTED_MODULE_24__[\"default\"], {\n    size: \"small\",\n    loading: loading,\n    loadingPosition: \"end\",\n    variant: \"contained\",\n    onClick: submitTemplate,\n    endIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Save__WEBPACK_IMPORTED_MODULE_25__[\"default\"], null)\n  }, \"Save\"), add_child_error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    severity: \"warning\"\n  }, \"Reaching the maximum number of child (3).\"), !add_child_error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    \"aria-label\": \"add\",\n    onClick: function onClick() {\n      addChild(\"add\");\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_AddCircleOutline__WEBPACK_IMPORTED_MODULE_17__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_IconButton__WEBPACK_IMPORTED_MODULE_16__[\"default\"], {\n    \"aria-label\": \"delete\",\n    onClick: function onClick() {\n      addChild(\"delete\");\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_26__[\"default\"], null)))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_component_footer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserInstruction);\n\n//# sourceURL=webpack://inference_portal/./frontend/user_instruction.js?");

/***/ })

}]);