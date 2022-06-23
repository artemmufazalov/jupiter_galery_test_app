// Картинки взяты с API Unsplash.
// Можно было бы брать запросом, но у Unsplash не отображаются категории, поэтому используется локальный массив
import imagesData from './data.json';

// Перетряхивает массив (чтобы было ощущение, что фото новые)
const shuffle = (arr) => {
	return arr.sort(() => Math.random());
};

export const getImages = (catIdx, categories, page) => {
	let arr = [...imagesData];

	if (catIdx !== 0) {
		let cat = categories[catIdx];
		arr = arr.filter((item) => item.category === cat);
	}
	let l = arr.length;

	// Если в массиве достаточно фото для отображение, то просто возвращает
	if (page * 9 < l) {
		return arr.slice(0, page * 9);
	} else {
		// Если фото не хватает,
		// то в конец массива добавляются те же фото, но перемешанные и c другими id
		let initialChunksLength = Math.floor(l / 9);
		let initialArr = arr.slice(0, initialChunksLength * 9);
		let remChunks = page - initialChunksLength;
		let finalArr = [...initialArr];
		for (let i = 0; i < remChunks; i++) {
			let newChunk = shuffle(
				arr.map((obj) => {
					obj.id = obj.id + '' + page;
					return obj;
				})
			).slice(0, 8);
			finalArr = [...finalArr, ...newChunk];
		}

		return finalArr;
	}
};
