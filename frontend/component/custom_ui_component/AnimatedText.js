import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";
import {TypeAnimation} from "react-type-animation";

export const TypeWriterText = ({sequence, wrapper, cursor, repeat, speed, deletionSpeed, style, className = ""}) => {
	const animationFlag = useOnChangeSequence(sequence);

	function useOnChangeSequence(sequence) {
		const [animationFlag, setAnimationFlag] = useState(false);

		useEffect(() => setAnimationFlag(false), [sequence]);

		useEffect(() => {
			if (animationFlag) return; // Avoid infinite loop
			setAnimationFlag(true); // raise flag to trigger animation
		}, [animationFlag]);

		return animationFlag;
	}
	return animationFlag ? (
		<TypeAnimation
			cursor={cursor}
			sequence={sequence}
			wrapper={wrapper}
			repeat={repeat}
			speed={speed}
			deletionSpeed={deletionSpeed}
			className={className}
			style={style}
		/>
	) : null;
};

TypeWriterText.propTypes = {
	cursor: PropTypes.bool,
	sequence: PropTypes.array,
	repeat: PropTypes.number,
	speed: PropTypes.number,
	className: PropTypes.string,
	deletionSpeed: PropTypes.number,
	wrapper: PropTypes.string,
	style: PropTypes.object,
};
