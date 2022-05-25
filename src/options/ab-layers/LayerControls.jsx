import {
	useContext
} from "react";
import { __ } from "@wordpress/i18n";
import { SortableHandle } from "react-sortable-hoc";
import { LayersContext } from "../ab-layers";

const LayerControls = ({ items, onChange, value }) => {
	const { removeForId, addForId, option, toggleOptionsPanel } = useContext(
		LayersContext
	);

	const cloneNumber = option && option?.settings[value.id]?.cloneNumber || 2;

	return (
		<div className="ct-layer-controls">
			<span>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="8" cy="5" r="1" fill="currentColor" stroke="currentColor" strokeWidth="2" />
					<circle cx="8" cy="12" r="1" fill="currentColor" stroke="currentColor" strokeWidth="2" />
					<circle cx="8" cy="19" r="1" fill="currentColor" stroke="currentColor" strokeWidth="2" />
					<circle cx="16" cy="5" r="1" fill="currentColor" stroke="currentColor" strokeWidth="2" />
					<circle cx="16" cy="12" r="1" fill="currentColor" stroke="currentColor" strokeWidth="2" />
					<circle cx="16" cy="19" r="1" fill="currentColor" stroke="currentColor" strokeWidth="2" />
				</svg>
				{
					(
						option.settings[value.id] || {
							label: value.id,
						}
					).label
				}
			</span>
			{!option.disableHiding && (
				<button
					type="button"
					className="ct-visibility"
					onClick={(e) => {
						e.stopPropagation();
						onChange(
							items.map((l) =>
								l.__id === value.__id
									? {
										...l,
										enabled: !{
											enabled: true,
											...l,
										}.enabled,
									}
									: l
							)
						);
					}}
				>
					<svg width="16" height="16" viewBox="0 0 24 24">
						<path d="M12,4C4.1,4,0,12,0,12s3.1,8,12,8c8.1,0,12-8,12-8S20.1,4,12,4z M12,17c-2.9,0-5-2.2-5-5c0-2.8,2.1-5,5-5s5,2.2,5,5C17,14.8,14.9,17,12,17z M12,9c-1.7,0-3,1.4-3,3c0,1.6,1.3,3,3,3s3-1.4,3-3C15,10.4,13.7,9,12,9z" />
					</svg>
				</button>
			)}
			{option.settings[value.id] &&
				option.settings[value.id].clone &&
				items.filter(({ id }) => id === value.id).length < cloneNumber && (
					<button
						type="button"
						className="ct-clone"
						onClick={() => addForId(value.id, value)}
					>

						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="#566779" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
							<path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="#566779" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
						</svg>

						<i className="ct-tooltip-top">{__("Clone Item", "rishi")}</i>
					</button>
				)}

			{(option.manageable ||
				(option.settings[value.id] &&
					option.settings[value.id].clone &&
					items.filter(({ id }) => id === value.id).length > 1) ||
				!option.settings[value.id]) && (
					<button
						type="button"
						className="ct-remove"
						onClick={() => removeForId(value.__id)}
					/>
				)}

			{option.settings[value.id] && option.settings[value.id].options && (
				<button
					type="button"
					className="ct-toggle"
					onMouseDown={(e) => {
						e.stopPropagation();
					}}
					onClick={(e) => {
						e.stopPropagation();
						toggleOptionsPanel(value.__id);
					}}
				/>
			)}
		</div>
	);
};

export default SortableHandle(LayerControls);
