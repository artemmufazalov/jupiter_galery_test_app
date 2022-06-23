import React from 'react';
import { useMediaQuery } from 'react-responsive';

import './App.css';
import Header from './components/Header';
import Filter from './components/Filter';
import Image from './components/Image';

import { getImages } from './images.js';

const categories = ['Show all', 'Design', 'Branding', 'Illustration', 'Motion'];

function App() {
	const isDesktop = useMediaQuery({ query: '(min-width: 1040px)' });

	const [selectedImageId, setSelectedImageId] = React.useState();
	const [selectedCategoryIndex, selectCategory] = React.useState(0);
	const [imagesArr, setImagesArr] = React.useState();

	// Раскрывающийся список с категориями в мобильной версии
	const [isPopupActive, setIsPopupActive] = React.useState(false);

	// Список для картинок, которые удалили
	const [blackList, setBlackList] = React.useState([]);

	// Количество картинок на странице page * 9 - количество в черном списке
	const [page, setPage] = React.useState(1);

	const popupRef = React.useRef();

	// Подгружает новые картинки при изменении категории или страницы, а также фильтрует их
	React.useEffect(() => {
		let arr = getImages(selectedCategoryIndex, categories, page);
		arr = arr.filter((obj) => !blackList.includes(obj.id));
		setImagesArr(arr);
	}, [blackList, selectedCategoryIndex, page]);

	const onLoadMore = () => {
		setPage(page + 1);
	};

	const onSelectImage = (id) => {
		if (selectedImageId === id) {
			setSelectedImageId();
		} else {
			setSelectedImageId(id);
		}
	};

	const onSelectCategory = (id) => {
		if (selectedCategoryIndex !== id) {
			setPage(1);
		}
		setSelectedImageId();
		selectCategory(id);
		if (!isDesktop) {
			setIsPopupActive(false);
		}
	};

	// Для обработки кликов вне поля выбора категории (в мобильной версии)
	// Если клик куда либо вне списка, он закрывается
	React.useEffect(() => {
		const handleClickOutside = (event) => {
			if (!event.path.includes(popupRef.current)) {
				setIsPopupActive(false);
			}
		};
		document.body.addEventListener('click', handleClickOutside);

		return () =>
			document.body.removeEventListener('click', handleClickOutside);
	}, []);

	// Обработка нажатия Del
	React.useEffect(() => {
		const onDelete = (e) => {
			if (e.key !== 'Delete') {
				return;
			}
			setBlackList([...blackList, selectedImageId]);
		};

		window.addEventListener('keydown', onDelete);

		return () => window.removeEventListener('keydown', onDelete);
	}, [isDesktop, blackList, selectedImageId]);

	const imageComponents =
		imagesArr &&
		imagesArr.map((obj, idx) => (
			<Image
				{...obj}
				key={idx}
				id={obj.id}
				title={obj.description}
				category={obj.category}
				categories={categories}
				url={obj.urls.regular}
				isSelected={selectedImageId === obj.id}
				onSelect={(id) => onSelectImage(id)}
				onSelectCategory={(id) => onSelectCategory(id)}
			/>
		));

	return (
		<div className="app">
			<Header />
			<main>
				<Filter
					selectedCategoryIndex={selectedCategoryIndex}
					onSelectCategory={(id) => onSelectCategory(id)}
					isPopupActive={isPopupActive}
					setIsPopupActive={(status) => setIsPopupActive(status)}
					popupRef={popupRef}
					isDesktop={isDesktop}
					categories={categories}
				/>
				<div className="images-wrapper">{imageComponents}</div>
				<button
					className="app__load-more-button"
					onClick={() => onLoadMore()}>
					LOAD MORE
				</button>
			</main>
		</div>
	);
}

export default App;
