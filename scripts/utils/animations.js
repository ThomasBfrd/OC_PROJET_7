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
				list.style.borderRight = '1px solid black';
				list.style.borderLeft = '1px solid black';
				list.style.borderBottom = '1px solid black';
				chevron.classList.add('chevron');
			} else {
				isOpened = false;
				list.style.height = '0px';
				list.style.overflowY = 'hidden';
				list.style.borderRight = 'none';
				list.style.borderLeft = 'none';
				list.style.borderBottom = 'none';
				chevron.classList.remove('chevron');
			}

			event.stopPropagation();
		});
	});
};

export const savedTagTooltip = () => {
	const savedTags = document.querySelectorAll('.saved-tag');

	savedTags.forEach(element => {
		const tooltip = element.querySelector('.tag-tooltip');

		if (element.children[0].textContent.length > 10) {
			element.addEventListener('mouseenter', (event) => {
				tooltip.classList.remove('tag-tooltip-down');
				tooltip.classList.add('tag-tooltip-up');
				event.stopPropagation();
			});
	
			element.addEventListener('mouseleave', (event) => {
				tooltip.classList.remove('tag-tooltip-up');
				tooltip.classList.add('tag-tooltip-down');
				event.stopPropagation();
			});
		}
	});
};

filtersAnimation();
animationTag();
filtersAnimation();