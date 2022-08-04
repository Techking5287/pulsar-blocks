/**
 * useBlockProps is a React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 *
 * RichText is a component that allows developers to render a contenteditable input,
 * providing users with the option to format block content to make it bold, italics,
 * linked, or use other formatting.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/richtext/
 */
import { __ } from "@wordpress/i18n";

import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

import { useState } from "@wordpress/element";

import CarouselControls from "./components/CarouselControls";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

const ALLOWED_BLOCKS = ["pulsar-blocks/carousel-slide"];
const TEMPLATE = [
	["pulsar-blocks/carousel-slide"],
	["pulsar-blocks/carousel-slide"],
	["pulsar-blocks/carousel-slide"],
	["pulsar-blocks/carousel-slide"],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   param0
 * @param {Object}   param0.attributes
 * @param {string}   param0.attributes.message
 * @param {Function} param0.setAttributes
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		autoplay,
		arrows,
		pagination,
		type,
		mobileOptions,
		tabletOptions,
		desktopOptions,
	} = attributes;

	const [splideJSONData, setSplideJSONData] = useState({
		autoplay,
		arrows,
		pagination,
		type,
		//focus: focusType === "number" ? focusPosition : focusType,
	});

	const onChangeAutoplayEnabled = () => {
		setAttributes({ autoplay: !autoplay });
		setSplideJSONData({ ...splideJSONData, autoplay: !autoplay });
	};

	const onChangeArrowsEnabled = () => {
		setAttributes({ arrows: !arrows });
		setSplideJSONData({ ...splideJSONData, arrows: !arrows });
	};

	const onChangePaginationEnabled = () => {
		setAttributes({ pagination: !pagination });
		setSplideJSONData({ ...splideJSONData, pagination: !pagination });
	};

	const onChangeAnimationMode = (mode) => {
		setAttributes({ type: mode });
		setSplideJSONData({ ...splideJSONData, type: mode });
	};

	const onChangeMobileAttributes = (object) => {
		setAttributes({ mobileOptions: object });
	};

	const onChangeTabletAttributes = (object) => {
		setAttributes({ tabletOptions: object });
	};

	const onChangeDesktopAttributes = (object) => {
		setAttributes({ desktopOptions: object });
	};

	/*
	const onChangeSlidesPerPage = (number) => {
		setAttributes({ perPage: number });
		setSplideJSONData({ ...splideJSONData, perPage: number });
	};

	const onChangeSlidesPerMove = (number) => {
		setAttributes({ perMove: number });
		setSplideJSONData({ ...splideJSONData, perMove: number });
	};

	const onChangeSlideGap = (number) => {
		setAttributes({ gap: number });
		setSplideJSONData({ ...splideJSONData, gap: number });
	};

	const onChangeFocusType = (type) => {
		setAttributes({ focusType: type });
		setSplideJSONData({
			...splideJSONData,
			focus: focusType === "number" ? focusPosition : focusType,
		});
	};

	const onChangeFocusPosition = (position) => {
		setAttributes({ focusPosition: position });
		setSplideJSONData({
			...splideJSONData,
			focus: position,
		});
	};

	*/

	const blockProps = useBlockProps({ className: "splide__list" });

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		orientation: "horizontal",
		template: TEMPLATE,
		allowedBlocks: ALLOWED_BLOCKS,
	});

	return (
		<>
			<CarouselControls
				autoplay={autoplay}
				arrows={arrows}
				pagination={pagination}
				type={type}
				mobileOptions={mobileOptions}
				tabletOptions={tabletOptions}
				desktopOptions={desktopOptions}
				onChangeAutoplayEnabled={onChangeAutoplayEnabled}
				onChangeArrowsEnabled={onChangeArrowsEnabled}
				onChangePaginationEnabled={onChangePaginationEnabled}
				onChangeAnimationMode={onChangeAnimationMode}
				onChangeMobileAttributes={onChangeMobileAttributes}
				onChangeTabletAttributes={onChangeTabletAttributes}
				onChangeDesktopAttributes={onChangeDesktopAttributes}
			/>
			<div
				{...useBlockProps({ className: "splide" })}
				aria-label=""
				data-splide={`'${JSON.stringify(splideJSONData)}'`}
			>
				<div className="splide__track">
					<ul {...innerBlocksProps}></ul>
				</div>
			</div>
		</>
	);
}
