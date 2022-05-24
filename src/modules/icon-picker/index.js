import { useEffect, useState } from "react";

export default ({ value, label, icons, enableSearch, onChange }) => {

	const [filterText, setFilterText] = useState('');
	const [iconsData, setIconsData] = useState(icons || []);

	useEffect(() => {
		if (enableSearch && filterText.length >= 2) {
			const filteredData = icons.filter(item =>
				item.name.toLowerCase().search(filterText.toLowerCase()) !== -1
			)
			setIconsData(filteredData);
		} else {
			setIconsData(icons)
		}
	}, [filterText])

	return (
		<div className="magblocks-field magblocks-field-icon-list magblocks-field-icon-list-selector">

			{label && <label>{label}</label>}

			<div className="magblocks-icon-list-wrapper">

				{enableSearch && <input type="text" value={filterText} placeholder="Search..." onChange={e => setFilterText(e.target.value)} autoComplete="off" />}

				<div className="magblocks-icon-list-icons">
					{iconsData.map(item => {
						return (
							<span className={value == item ? 'magblocks-active' : ''} onClick={() => onChange(item)}>
								<span className={item.value} />
							</span>
						)
					})}
				</div>
			</div>
		</div>
	)
}
