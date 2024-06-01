"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkinference_portal"] = self["webpackChunkinference_portal"] || []).push([["frontend_component_chatroom_parameters_js"],{

/***/ "./frontend/component/chatroom_parameters.js":
/*!***************************************************!*\
  !*** ./frontend/component/chatroom_parameters.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChatParameter: () => (/* binding */ ChatParameter),\n/* harmony export */   HotpotParameter: () => (/* binding */ HotpotParameter),\n/* harmony export */   OpenAPIParameter: () => (/* binding */ OpenAPIParameter)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/FormControl/FormControl.js\");\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/FormLabel/FormLabel.js\");\n/* harmony import */ var _mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/InputLabel */ \"./node_modules/@mui/material/InputLabel/InputLabel.js\");\n/* harmony import */ var _mui_material_Radio__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/Radio */ \"./node_modules/@mui/material/Radio/Radio.js\");\n/* harmony import */ var _mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/MenuItem */ \"./node_modules/@mui/material/MenuItem/MenuItem.js\");\n/* harmony import */ var _mui_material_Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Select */ \"./node_modules/@mui/material/Select/Select.js\");\n/* harmony import */ var _mui_material_RadioGroup__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/RadioGroup */ \"./node_modules/@mui/material/RadioGroup/RadioGroup.js\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Typography */ \"./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mui/material/Stack */ \"./node_modules/@mui/material/Stack/Stack.js\");\n/* harmony import */ var _mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/FormControlLabel */ \"./node_modules/@mui/material/FormControlLabel/FormControlLabel.js\");\n/* harmony import */ var _mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/Slider */ \"./node_modules/@mui/material/Slider/Slider.js\");\n/* harmony import */ var _mui_material_Switch__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/Switch */ \"./node_modules/@mui/material/Switch/Switch.js\");\n/* harmony import */ var _mui_material_Divider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/Divider */ \"./node_modules/@mui/material/Divider/Divider.js\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar OpenAPIParameter = function OpenAPIParameter(_ref) {\n  var choosen_model = _ref.choosen_model,\n    setChoosenModel = _ref.setChoosenModel,\n    frequencypenalty = _ref.frequencypenalty,\n    setFrequencyPenalty = _ref.setFrequencyPenalty,\n    presencepenalty = _ref.presencepenalty,\n    setPresencePenalty = _ref.setPresencePenalty,\n    agent_objects = _ref.agent_objects,\n    top_p = _ref.top_p,\n    setTopp = _ref.setTopp,\n    temperature = _ref.temperature,\n    setTemperature = _ref.setTemperature,\n    max_tokens = _ref.max_tokens,\n    setMaxToken = _ref.setMaxToken,\n    max_turn = _ref.max_turn,\n    setMaxTurn = _ref.setMaxTurn;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    direction: \"column\",\n    spacing: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    id: \"model-label\"\n  }, \"Models\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    labelId: \"model-label\",\n    id: \"model-select\",\n    onChange: function onChange(e) {\n      return setChoosenModel(e.target.value);\n    },\n    value: choosen_model,\n    label: \"Models\",\n    size: \"small\"\n  }, agent_objects.map(function (agent_object_) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      key: agent_object_.name,\n      value: agent_object_.name\n    }, agent_object_.name);\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__[\"default\"], null, \"Parameters\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Max_turns: \", max_turn), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    step: 1,\n    min: 1,\n    max: 10,\n    marks: true,\n    valueLabelDisplay: \"off\",\n    onChange: function onChange(e) {\n      return setMaxTurn(e.target.value);\n    },\n    value: max_turn\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Top_p: \", top_p), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    step: 0.01,\n    min: 0,\n    max: 1,\n    valueLabelDisplay: \"off\",\n    onChange: function onChange(e) {\n      return setTopp(e.target.value);\n    },\n    value: top_p\n  }), agent_objects.map(function (agent_object_) {\n    if (agent_object_.name == choosen_model) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_10__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        gutterBottom: true\n      }, \"Max_tokens: \", max_tokens), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n        defaultValue: 512,\n        step: 1,\n        min: 1,\n        max: agent_object_.context_length,\n        onChange: function onChange(e) {\n          return setMaxToken(e.target.value);\n        },\n        value: max_tokens,\n        valueLabelDisplay: \"off\"\n      }));\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Temperature: \", temperature), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    defaultValue: 0.73,\n    step: 0.01,\n    min: 0,\n    max: 1,\n    onChange: function onChange(e) {\n      return setTemperature(e.target.value);\n    },\n    value: temperature,\n    valueLabelDisplay: \"off\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Presence penalty: \", presencepenalty), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    \"aria-label\": \"Small steps\",\n    defaultValue: 0,\n    step: 0.01,\n    min: -2,\n    max: 2,\n    onChange: function onChange(e) {\n      return setPresencePenalty(e.target.value);\n    },\n    value: presencepenalty,\n    valueLabelDisplay: \"off\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Frequency penalty: \", frequencypenalty), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    \"aria-label\": \"Small steps\",\n    defaultValue: 0,\n    step: 0.01,\n    min: -2,\n    max: 2,\n    onChange: function onChange(e) {\n      return setFrequencyPenalty(e.target.value);\n    },\n    value: frequencypenalty,\n    valueLabelDisplay: \"off\"\n  }), \"   \");\n};\nvar ChatParameter = function ChatParameter(_ref2) {\n  var setSocketDestination = _ref2.setSocketDestination,\n    socket_destination = _ref2.socket_destination,\n    setUseMemory = _ref2.setUseMemory,\n    choosen_model = _ref2.choosen_model,\n    setChoosenModel = _ref2.setChoosenModel,\n    mode = _ref2.mode,\n    setMode = _ref2.setMode,\n    top_k = _ref2.top_k,\n    setTopk = _ref2.setTopk,\n    top_p = _ref2.top_p,\n    setTopp = _ref2.setTopp,\n    temperature = _ref2.temperature,\n    setTemperature = _ref2.setTemperature,\n    bestof = _ref2.bestof,\n    setBestof = _ref2.setBestof,\n    lengthpenalty = _ref2.lengthpenalty,\n    setLengthPenalty = _ref2.setLengthPenalty,\n    frequencypenalty = _ref2.frequencypenalty,\n    setFrequencyPenalty = _ref2.setFrequencyPenalty,\n    presencepenalty = _ref2.presencepenalty,\n    setPresencePenalty = _ref2.setPresencePenalty,\n    beam = _ref2.beam,\n    setBeam = _ref2.setBeam,\n    max_tokens = _ref2.max_tokens,\n    setMaxToken = _ref2.setMaxToken,\n    model_objects = _ref2.model_objects,\n    agent_objects = _ref2.agent_objects,\n    earlystopping = _ref2.earlystopping,\n    setEarlyStopping = _ref2.setEarlyStopping;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    fullWidth: true,\n    defaultValue: \"\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    direction: \"column\",\n    spacing: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    id: \"model-label\"\n  }, \"Models\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    labelId: \"model-label\",\n    id: \"model-select\",\n    onChange: function onChange(e) {\n      return setChoosenModel(e.target.value);\n    },\n    value: choosen_model,\n    label: \"Models\",\n    size: \"small\"\n  }, model_objects.map(function (model_object_) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      key: model_object_.name,\n      value: model_object_.name\n    }, model_object_.name);\n  }), agent_objects.map(function (agent_object_) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      key: agent_object_.name,\n      value: agent_object_.name\n    }, agent_object_.name);\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    defaultValue: \"\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    id: \"model-label\"\n  }, \"Backends\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    labelId: \"socket-label\",\n    id: \"socket-select\",\n    onChange: function onChange(e) {\n      return setSocketDestination(e.target.value);\n    },\n    value: socket_destination,\n    label: \"Backends\",\n    size: \"small\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    key: \"/ws/chat/\",\n    value: \"/ws/chat/\"\n  }, \"Celery Backend\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    key: \"/ws/chat-async/\",\n    value: \"/ws/chat-async/\"\n  }, \"Async Backend\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    id: \"demo-radio-buttons-group-label\"\n  }, \"Parameters\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Switch__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n      defaultChecked: true,\n      onChange: function onChange(e) {\n        return setUseMemory(e.target.checked);\n      }\n    }),\n    label: \"Use Memory\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_RadioGroup__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    defaultValue: \"chat\",\n    name: \"radio-buttons-group\",\n    onChange: function onChange(e) {\n      return setMode(e.target.value);\n    },\n    value: mode\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    key: \"chat\",\n    value: \"chat\",\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n      size: \"small\"\n    }),\n    label: \"Chat Bot Mode\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    key: \"generate\",\n    value: \"generate\",\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n      size: \"small\"\n    }),\n    label: \"Text Completion\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Top_p: \", top_p), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    step: 0.01,\n    min: 0,\n    max: 1,\n    valueLabelDisplay: \"off\",\n    onChange: function onChange(e) {\n      return setTopp(e.target.value);\n    },\n    value: top_p\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Top_k: \", top_k), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    defaultValue: -1,\n    step: 1,\n    min: -1,\n    max: 100,\n    valueLabelDisplay: \"off\",\n    onChange: function onChange(e) {\n      return setTopk(e.target.value);\n    },\n    value: top_k\n  }), agent_objects.map(function (agent_object_) {\n    if (agent_object_.name == choosen_model) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_10__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        gutterBottom: true\n      }, \"Max_tokens: \", max_tokens), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n        defaultValue: 1024,\n        step: 1,\n        min: 1,\n        max: agent_object_.context_length,\n        onChange: function onChange(e) {\n          return setMaxToken(e.target.value);\n        },\n        value: max_tokens,\n        valueLabelDisplay: \"off\"\n      }));\n    }\n  }), model_objects.map(function (model_object_) {\n    if (model_object_.name == choosen_model) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_10__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        gutterBottom: true\n      }, \"Max_tokens: \", max_tokens), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n        defaultValue: 1024,\n        step: 1,\n        min: 1,\n        max: model_object_.context_length,\n        onChange: function onChange(e) {\n          return setMaxToken(e.target.value);\n        },\n        value: max_tokens,\n        valueLabelDisplay: \"off\"\n      }));\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Temperature: \", temperature), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    defaultValue: 0.73,\n    step: 0.01,\n    min: 0,\n    max: 1,\n    onChange: function onChange(e) {\n      return setTemperature(e.target.value);\n    },\n    value: temperature,\n    valueLabelDisplay: \"off\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Presence penalty: \", presencepenalty), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    \"aria-label\": \"Small steps\",\n    defaultValue: 0,\n    step: 0.01,\n    min: -2,\n    max: 2,\n    onChange: function onChange(e) {\n      return setPresencePenalty(e.target.value);\n    },\n    value: presencepenalty,\n    valueLabelDisplay: \"off\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Frequency penalty: \", frequencypenalty), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    \"aria-label\": \"Small steps\",\n    defaultValue: 0,\n    step: 0.01,\n    min: -2,\n    max: 2,\n    onChange: function onChange(e) {\n      return setFrequencyPenalty(e.target.value);\n    },\n    value: frequencypenalty,\n    valueLabelDisplay: \"off\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Switch__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n      onChange: function onChange(e) {\n        return setBeam(e.target.checked);\n      },\n      value: beam\n    }),\n    label: \"Beam Search \"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Switch__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n      onChange: function onChange(e) {\n        return setEarlyStopping(e.target.checked);\n      },\n      value: earlystopping\n    }),\n    label: \"Early Stopping \"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Best_of: \", bestof), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    onChange: function onChange(e) {\n      return setBestof(e.target.value);\n    },\n    value: bestof,\n    defaultValue: 2,\n    step: 1,\n    min: 1,\n    max: 5,\n    valueLabelDisplay: \"off\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Length penalty: \", lengthpenalty), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    onChange: function onChange(e) {\n      return setLengthPenalty(e.target.value);\n    },\n    value: lengthpenalty,\n    defaultValue: 0,\n    step: 0.01,\n    min: -2,\n    max: 2,\n    valueLabelDisplay: \"off\"\n  })));\n};\nvar HotpotParameter = function HotpotParameter(_ref3) {\n  var template_list = _ref3.template_list,\n    setUseMemory = _ref3.setUseMemory,\n    setDuplicateMessage = _ref3.setDuplicateMessage,\n    choosen_chat_model = _ref3.choosen_chat_model,\n    choosen_template = _ref3.choosen_template,\n    setChoosenTemplate = _ref3.setChoosenTemplate,\n    setChoosenChatModel = _ref3.setChoosenChatModel,\n    choosen_agent_model = _ref3.choosen_agent_model,\n    setChoosenAgentModel = _ref3.setChoosenAgentModel,\n    mode = _ref3.mode,\n    setMode = _ref3.setMode,\n    top_k = _ref3.top_k,\n    setTopk = _ref3.setTopk,\n    top_p = _ref3.top_p,\n    setTopp = _ref3.setTopp,\n    temperature = _ref3.temperature,\n    setTemperature = _ref3.setTemperature,\n    bestof = _ref3.bestof,\n    setBestof = _ref3.setBestof,\n    lengthpenalty = _ref3.lengthpenalty,\n    setLengthPenalty = _ref3.setLengthPenalty,\n    frequencypenalty = _ref3.frequencypenalty,\n    setFrequencyPenalty = _ref3.setFrequencyPenalty,\n    presencepenalty = _ref3.presencepenalty,\n    setPresencePenalty = _ref3.setPresencePenalty,\n    beam = _ref3.beam,\n    setBeam = _ref3.setBeam,\n    max_tokens = _ref3.max_tokens,\n    setMaxToken = _ref3.setMaxToken,\n    model_objects = _ref3.model_objects,\n    agent_objects = _ref3.agent_objects,\n    earlystopping = _ref3.earlystopping,\n    setEarlyStopping = _ref3.setEarlyStopping,\n    socket_destination = _ref3.socket_destination,\n    setSocketDestination = _ref3.setSocketDestination,\n    swap_template = _ref3.swap_template,\n    max_turn = _ref3.max_turn,\n    setMaxTurn = _ref3.setMaxTurn;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    direction: \"column\",\n    spacing: 1\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    defaultValue: \"\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    id: \"model-label\"\n  }, \"Backends\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    labelId: \"socket-label\",\n    id: \"socket-select\",\n    onChange: function onChange(e) {\n      return setSocketDestination(e.target.value);\n    },\n    value: socket_destination,\n    label: \"Backends\",\n    size: \"small\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    key: \"none_async\",\n    value: \"none_async\"\n  }, \"Celery Backend\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    key: \"async\",\n    value: \"async\"\n  }, \"Async Backend\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    id: \"model-label\"\n  }, \"Chat Models\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    labelId: \"model-label\",\n    id: \"model-select\",\n    onChange: function onChange(e) {\n      return setChoosenChatModel(e.target.value);\n    },\n    value: choosen_chat_model,\n    label: \"Models\",\n    size: \"small\"\n  }, agent_objects.map(function (agent_object_) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      key: agent_object_.name,\n      value: agent_object_.name\n    }, agent_object_.name);\n  }), model_objects.map(function (model_object_) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      key: model_object_.name,\n      value: model_object_.name\n    }, model_object_.name);\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    id: \"model-label\"\n  }, \"Agent Models\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    labelId: \"model-label\",\n    id: \"model-select\",\n    onChange: function onChange(e) {\n      return setChoosenAgentModel(e.target.value);\n    },\n    value: choosen_agent_model,\n    label: \"Models\",\n    size: \"small\"\n  }, agent_objects.map(function (agent_object_) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      key: agent_object_.name,\n      value: agent_object_.name\n    }, agent_object_.name);\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_InputLabel__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    id: \"agent-label\"\n  }, \"Agents\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Select__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n    labelId: \"agent-label\",\n    id: \"agent-select\",\n    onChange: function onChange(e) {\n      setChoosenTemplate(e.target.value);\n      swap_template(e.target.value);\n    },\n    value: choosen_template,\n    label: \"Agents\",\n    size: \"small\"\n  }, template_list.map(function (template) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_MenuItem__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n      key: template.name,\n      value: template.name\n    }, template.name);\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    id: \"demo-radio-buttons-group-label\"\n  }, \"Parameters\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Switch__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n      defaultChecked: true,\n      onChange: function onChange(e) {\n        return setDuplicateMessage(e.target.checked);\n      }\n    }),\n    label: \"Duplicate Message\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Switch__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n      defaultChecked: true,\n      onChange: function onChange(e) {\n        return setUseMemory(e.target.checked);\n      }\n    }),\n    label: \"Use Memory\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_RadioGroup__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n    defaultValue: \"chat\",\n    name: \"radio-buttons-group\",\n    onChange: function onChange(e) {\n      return setMode(e.target.value);\n    },\n    value: mode\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    key: \"chat\",\n    value: \"chat\",\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n      size: \"small\"\n    }),\n    label: \"Chat Bot Mode\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    key: \"generate\",\n    value: \"generate\",\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Radio__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n      size: \"small\"\n    }),\n    label: \"Text Completion\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Max_turns: \", max_turn), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    step: 1,\n    min: 1,\n    max: 10,\n    marks: true,\n    valueLabelDisplay: \"off\",\n    onChange: function onChange(e) {\n      return setMaxTurn(e.target.value);\n    },\n    value: max_turn\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Top_p: \", top_p), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    step: 0.01,\n    min: 0,\n    max: 1,\n    valueLabelDisplay: \"off\",\n    onChange: function onChange(e) {\n      return setTopp(e.target.value);\n    },\n    value: top_p\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Top_k: \", top_k), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    defaultValue: -1,\n    step: 1,\n    min: -1,\n    max: 100,\n    valueLabelDisplay: \"off\",\n    onChange: function onChange(e) {\n      return setTopk(e.target.value);\n    },\n    value: top_k\n  }), agent_objects.map(function (agent_object_) {\n    if (agent_object_.name == choosen_chat_model) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_10__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        gutterBottom: true\n      }, \"Max_tokens: \", max_tokens), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n        defaultValue: 1024,\n        step: 1,\n        min: 1,\n        max: agent_object_.context_length,\n        onChange: function onChange(e) {\n          return setMaxToken(e.target.value);\n        },\n        value: max_tokens,\n        valueLabelDisplay: \"off\"\n      }));\n    }\n  }), model_objects.map(function (model_object_) {\n    if (model_object_.name == choosen_chat_model) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_10__[\"default\"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        gutterBottom: true\n      }, \"Max_tokens: \", max_tokens), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n        defaultValue: 1024,\n        step: 1,\n        min: 1,\n        max: model_object_.context_length,\n        onChange: function onChange(e) {\n          return setMaxToken(e.target.value);\n        },\n        value: max_tokens,\n        valueLabelDisplay: \"off\"\n      }));\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Temperature: \", temperature), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    defaultValue: 0.73,\n    step: 0.01,\n    min: 0,\n    max: 1,\n    onChange: function onChange(e) {\n      return setTemperature(e.target.value);\n    },\n    value: temperature,\n    valueLabelDisplay: \"off\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Presence penalty: \", presencepenalty), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    \"aria-label\": \"Small steps\",\n    defaultValue: 0,\n    step: 0.01,\n    min: -2,\n    max: 2,\n    onChange: function onChange(e) {\n      return setPresencePenalty(e.target.value);\n    },\n    value: presencepenalty,\n    valueLabelDisplay: \"off\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Frequency penalty: \", frequencypenalty), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    \"aria-label\": \"Small steps\",\n    defaultValue: 0,\n    step: 0.01,\n    min: -2,\n    max: 2,\n    onChange: function onChange(e) {\n      return setFrequencyPenalty(e.target.value);\n    },\n    value: frequencypenalty,\n    valueLabelDisplay: \"off\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Divider__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Switch__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n      onChange: function onChange(e) {\n        return setBeam(e.target.checked);\n      },\n      value: beam\n    }),\n    label: \"Beam Search \"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_FormControlLabel__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    control: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Switch__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n      onChange: function onChange(e) {\n        return setEarlyStopping(e.target.checked);\n      },\n      value: earlystopping\n    }),\n    label: \"Early Stopping \"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Best_of: \", bestof), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    onChange: function onChange(e) {\n      return setBestof(e.target.value);\n    },\n    value: bestof,\n    defaultValue: 2,\n    step: 1,\n    min: 1,\n    max: 5,\n    valueLabelDisplay: \"off\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    gutterBottom: true\n  }, \"Length penalty: \", lengthpenalty), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mui_material_Slider__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n    onChange: function onChange(e) {\n      return setLengthPenalty(e.target.value);\n    },\n    value: lengthpenalty,\n    defaultValue: 0,\n    step: 0.01,\n    min: -2,\n    max: 2,\n    valueLabelDisplay: \"off\"\n  }));\n};\n\n//# sourceURL=webpack://inference_portal/./frontend/component/chatroom_parameters.js?");

/***/ })

}]);