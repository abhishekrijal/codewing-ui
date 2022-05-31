import { animated } from "@react-spring/web";
import { __ } from "@wordpress/i18n";
import classnames from "classnames";
import GenericOptionType from "../GenericOptionType";
import Slider from '../options/ab-slider';

const FontOptions = ({ option, value, sizeRef, onChange, props }) => {
	return (
		<animated.ul
			style={props}
			className="ct-typography-options"
			key="options"
		>
			<li key="size">
				<GenericOptionType
					renderComponent={Slider}
					value={value.size}
					values={value}
					id="size"
					option={{
						id: "size",
						label: __("Font Size", "magblocks"),
						type: "ab-slider",
						value: option.value.size,
						ref: sizeRef,
						responsive: option.typography_responsive || true,
						units: [
							{
								unit: "px",
								min: 0,
								max: 200,
							},

							{
								unit: "em",
								min: 0,
								max: 50,
							},

							{
								unit: "rem",
								min: 0,
								max: 50,
							},

							{
								unit: "pt",
								min: 0,
								max: 50,
							},

							{
								unit: "vw",
								min: 0,
								max: 100,
							},
						],
					}}
					hasRevertButton={false}
					onChange={(newValue) =>
						onChange({
							...value,
							size: newValue,
						})
					}
				/>
			</li>

			<li key="line-height">
				<GenericOptionType
					renderComponent={Slider}
					value={value["line-height"]}
					values={value}
					id="line-height"
					option={{
						id: "line-height",
						label: __("Line Height", "magblocks"),
						type: "ab-slider",
						value: option.value["line-height"],
						responsive: option.typography_responsive || true,
						units: [
							{
								unit: "",
								min: 0,
								max: 10,
								decimals: 1,
							},

							{
								unit: "px",
								min: 0,
								max: 50,
							},

							{
								unit: "em",
								min: 0,
								max: 50,
							},

							{
								unit: "pt",
								min: 0,
								max: 50,
							},

							{
								unit: "%",
								min: 0,
								max: 100,
							},
						],
					}}
					hasRevertButton={false}
					onChange={(newValue) =>
						onChange({
							...value,
							"line-height": newValue,
						})
					}
				/>
			</li>

			<li key="letter-spacing">
				<GenericOptionType
					renderComponent={Slider}
					value={value["letter-spacing"]}
					values={value}
					id="letter-spacing"
					option={{
						id: "letter-spacing",
						label: __("Letter Spacing", "magblocks"),
						type: "ab-slider",
						value: option.value["letter-spacing"],
						responsive: option.typography_responsive || true,
						defaultPosition: "center",
						units: [
							{
								unit: "em",
								min: -5,
								max: 5,
								decimals: 1,
							},

							{
								unit: "px",
								min: -20,
								max: 20,
								decimals: 1,
							},

							{
								unit: "rem",
								min: -5,
								max: 5,
								decimals: 1,
							},
						],
					}}
					hasRevertButton={false}
					onChange={(newValue) =>
						onChange({
							...value,
							"letter-spacing": newValue,
						})
					}
				/>
			</li>

			<li key="variant" className="ct-typography-variant">
				<ul className={classnames("ct-text-transform")}>
					{["capitalize", "uppercase"].map((variant) => (
						<li
							key={variant}
							onClick={() =>
								onChange({
									...value,
									"text-transform":
										value["text-transform"] === variant
											? "none"
											: variant,
								})
							}
							className={classnames({
								active: variant === value["text-transform"],
							})}
							data-variant={variant}
						>
							<i className="affiliate-blocks-tooltip-top">
								{
									{
										capitalize: __(
											"Capitalize",
											"magblocks"
										),
										uppercase: __(
											"Uppercase",
											"magblocks"
										),
									}[variant]
								}
							</i>
						</li>
					))}
				</ul>

				<ul className={classnames("ct-text-decoration")}>
					{["line-through", "underline"].map((variant) => (
						<li
							key={variant}
							onClick={() =>
								onChange({
									...value,
									"text-decoration":
										value["text-decoration"] === variant
											? "none"
											: variant,
								})
							}
							className={classnames({
								active: variant === value["text-decoration"],
							})}
							data-variant={variant}
						>
							<i className="affiliate-blocks-tooltip-top">
								{
									{
										"line-through": __(
											"Line Through",
											"magblocks"
										),
										underline: __(
											"Underline",
											"magblocks"
										),
									}[variant]
								}
							</i>
						</li>
					))}
				</ul>
			</li>
		</animated.ul>
	);
};

export default FontOptions;
