import React from 'react';

import expandFilter from '../assets/expandFilter.svg';

const Category = ({ name, id, isSeleted, onSelect }) => (
	<span
		className={`filter__category${
			isSeleted ? ' filter__category--selected' : ''
		}`}
		onClick={() => onSelect(id)}>
		{name}
	</span>
);

function Filter({
	selectedCategoryIndex,
	onSelectCategory,
	isPopupActive,
	setIsPopupActive,
	isDesktop,
	popupRef,
	categories,
}) {
	const categoriesComponents = categories.map((item, i) => (
		<Category
			key={i}
			name={item}
			isSeleted={i === selectedCategoryIndex}
			id={i}
			onSelect={(id) => {
				onSelectCategory(id);
			}}
		/>
	));

	if (!isDesktop) {
		return (
			<div className="filter--mobile" ref={popupRef}>
				<div
					className="filter__block"
					onClick={() => {
						setIsPopupActive(!isPopupActive);
					}}>
					<div className="filter__category--mobile">
						{categories[selectedCategoryIndex]}
					</div>
					<img src={expandFilter} alt="Раскрыть поиск" />
				</div>
				{isPopupActive ? (
					<div className="filter__popup">{categoriesComponents}</div>
				) : (
					''
				)}
			</div>
		);
	}

	return <div className="filter">{categoriesComponents}</div>;
}

export default Filter;
