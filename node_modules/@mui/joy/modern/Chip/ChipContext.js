import * as React from 'react';
const ChipColorContext = /*#__PURE__*/React.createContext({
  disabled: undefined,
  variant: undefined,
  color: undefined
});
if (process.env.NODE_ENV !== 'production') {
  ChipColorContext.displayName = 'ChipColorContext';
}
export default ChipColorContext;