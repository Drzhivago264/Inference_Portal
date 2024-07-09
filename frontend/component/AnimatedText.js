import React, { useState, useEffect, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';

export const TypeWriterText = ({
	sequence,
    wrapper,
    cursor,
    repeat,
    speed,
    deletionSpeed,
	onFinish,
    style,
	className = '',
}) => {
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
	return (
		animationFlag ? 
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
			: null
	);
};