const animationTag = () => {

	const tags = document.querySelectorAll('.saved-tag');
	
	tags.forEach(element => {
		element.addEventListener('mouseenter', () => {
			const icon = document.querySelector('.delete-tag');
	
	
			setTimeout(() => {
				
				icon.classList.remove('fa-xmark');
				icon.classList.add('fa-circle-xmark');
			}, 200);
			icon.classList.add('close-circle');
	
		});
	
		element.addEventListener('mouseleave', () => {
			const icon = document.querySelector('.delete-tag');
		
	
			icon.classList.remove('close-circle');
			icon.classList.remove('fa-circle-xmark');
			icon.classList.add('fa-xmark');
	
		});
	});
};

export const deleteSelectedTag = () => {
	const labelSelected = document.querySelectorAll('.label-selected-tags');

	labelSelected.forEach(element => {
		element.addEventListener('mouseenter', () => {
			element.classList.add('delete-tag-selected');
	
		});
	
		element.addEventListener('mouseleave', () => {
			element.classList.remove('delete-tag-selected');
	
		});
	});
};

const filtersAnimation = () => {
	const filtersLists = document.querySelectorAll('.category');
	
	filtersLists.forEach(filter => {
		let isOpened = false;
		const list = filter.nextElementSibling;
		const chevron = filter.querySelector('.fa-chevron-down');

		filter.addEventListener('click', (event) => {
			if (!isOpened) {
				isOpened = true;
				list.style.height = '180px';
				list.style.overflowY = 'scroll';
				chevron.classList.add('chevron');
			} else {
				isOpened = false;
				list.style.height = '0px';
				list.style.overflowY = 'hidden';
				chevron.classList.remove('chevron');
			}

			event.stopPropagation();
		});
	});
};

// Seulement pour smartphones
export const onRevealRecipes = () => {
	const recipes = document.querySelectorAll('.recette');
	let isOpened = false;

	recipes.forEach((recipe) => {
		recipe.addEventListener('click', (event) => {
			const showMore = recipe.querySelector('.recette-show-more');
			const arrow = recipe.querySelector('.fa-arrow-down');
			if (!isOpened) {
				recipe.classList.add('animate-reveal');
				showMore.classList.add('reduce-arrow-reveal');
				arrow.classList.add('reduce-arrow-reveal');
				recipe.classList.remove('close-animate-reveal');
				showMore.classList.remove('show-arrow-reveal');
				arrow.classList.remove('show-arrow-reveal');
				isOpened = true;
			} else {
				recipe.classList.add('close-animate-reveal');
				showMore.classList.add('show-arrow-reveal');
				arrow.classList.add('show-arrow-reveal');
				recipe.classList.remove('animate-reveal');
				showMore.classList.remove('reduce-arrow-reveal');
				arrow.classList.remove('reduce-arrow-reveal');
				isOpened = false;
			}

			event.stopPropagation();
		});
	});
};


filtersAnimation();
animationTag();
filtersAnimation();