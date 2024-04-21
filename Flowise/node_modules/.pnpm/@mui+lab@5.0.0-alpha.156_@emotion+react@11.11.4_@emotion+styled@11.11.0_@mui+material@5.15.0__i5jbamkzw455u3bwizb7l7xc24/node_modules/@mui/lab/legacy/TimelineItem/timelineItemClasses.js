import generateUtilityClass from '@mui/material/generateUtilityClass';
import generateUtilityClasses from '@mui/material/generateUtilityClasses';
export function getTimelineItemUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineItem', slot);
}
var timelineItemClasses = generateUtilityClasses('MuiTimelineItem', ['root', 'positionLeft', 'positionRight', 'positionAlternate', 'positionAlternateReverse', 'missingOppositeContent']);
export default timelineItemClasses;