import React from 'react';

function Image({
	category,
	url,
	title,
	id,
	isSelected,
	onSelect,
	categories,
	onSelectCategory,
}) {
	return (
		<div
			className={`images-wrapper__image ${
				isSelected ? 'image--selected' : ''
			}`}>
			<div>
				<img
					onClick={() => {
						onSelect(id);
					}}
					src={url}
					alt={title}
				/>
				<div className="images-wrapper__image__content">
					<button
						onClick={() =>
							onSelectCategory(categories.indexOf(category, 0))
						}>
						{category}
					</button>
					<div className="images-wrapper__image__title">{title}</div>
				</div>
			</div>
		</div>
	);
}

export default Image;
