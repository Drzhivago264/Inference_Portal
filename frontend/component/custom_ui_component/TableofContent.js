import "../css/TableofContent.css";

import React, {useContext, useEffect, useRef, useState} from "react";

import {ColorModeContext} from "../../App";
import PropTypes from "prop-types";

const useHeadingsData = (mdfile) => {
	const [nestedHeadings, setNestedHeadings] = useState([]);
	useEffect(() => {
		const headingElements = Array.from(document.querySelectorAll("h2, h3"));
		const newNestedHeadings = getNestedHeadings(headingElements);
		setNestedHeadings(newNestedHeadings);
	}, [mdfile]);
	return {nestedHeadings};
};

const useIntersectionObserver = (setActiveId, mdfile, mode) => {
	const headingElementsRef = useRef({});
	useEffect(() => {
		const callback = (headings) => {
			headingElementsRef.current = headings.reduce((map, headingElement) => {
				map[headingElement.target.id] = headingElement;
				return map;
			}, headingElementsRef.current);

			const visibleHeadings = [];
			Object.keys(headingElementsRef.current).forEach((key) => {
				const headingElement = headingElementsRef.current[key];
				if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
			});

			const getIndexFromId = (id) => headingElements.findIndex((heading) => heading.id === id);

			if (visibleHeadings.length === 1) {
				setActiveId(visibleHeadings[0].target.id);
			} else if (visibleHeadings.length > 1) {
				const sortedVisibleHeadings = visibleHeadings.sort((a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id));
				setActiveId(sortedVisibleHeadings[0].target.id);
			}
		};
		const observer = new IntersectionObserver(callback, {
			rootMargin: "0px 0px -40% 0px",
		});
		const headingElements = Array.from(document.querySelectorAll("h2, h3"));
		headingElements.forEach((element) => observer.observe(element));
		return () => observer.disconnect();
	}, [setActiveId, mdfile, mode]);
};

const getNestedHeadings = (headingElements) => {
	const nestedHeadings = [];
	headingElements.forEach((heading) => {
		const {innerText: title, id} = heading;
		if (heading.nodeName === "H2") {
			nestedHeadings.push({id, title, items: []});
		} else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
			nestedHeadings[nestedHeadings.length - 1].items.push({
				id,
				title,
			});
		}
	});
	return nestedHeadings;
};

const Headings = ({headings, activeId, mode}) => (
	<ul>
		{headings.map((heading) => (
			<li key={heading.id} className={heading.id === activeId ? "active" : ""}>
				{heading.id === activeId && (
					<a style={{color: mode == "dark" ? "white" : "black"}} href={`#${heading.id}`}>
						{heading.title}
					</a>
				)}
				{heading.id !== activeId && (
					<a style={{color: mode == "dark" ? "gray" : "#383838"}} href={`#${heading.id}`}>
						{heading.title}
					</a>
				)}
				{heading.items.length > 0 && (
					<ul>	
						{heading.items.map((child) => (
							<li key={child.id} className={child.id === activeId ? "active" : ""}>
								{child.id === activeId && (
									<a
										style={{
											color: mode == "dark" ? "white" : "black",
										}}
										href={`#${child.id}`}>
										{child.title}
									</a>
								)}
								{child.id !== activeId && (
									<a style={{color: "gray"}} href={`#${child.id}`}>
										{child.title}
									</a>
								)}
							</li>
						))}
					</ul>
				)}
			</li>
		))}
	</ul>
);
Headings.propTypes = {
	headings: PropTypes.array.isRequired,
    activeId: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired
};
const TableOfContents = ({mdfile}) => {
	const {mode} = useContext(ColorModeContext);
	const [activeId, setActiveId] = useState();
	const {nestedHeadings} = useHeadingsData(mdfile);
	useIntersectionObserver(setActiveId, mdfile, mode);
	return (
		<nav aria-label='Table of contents'>
			<Headings headings={nestedHeadings} activeId={activeId} mode={mode} />
		</nav>
	);
};
TableOfContents.propTypes = {
	mdfile: PropTypes.string.isRequired,
};

export default TableOfContents;
