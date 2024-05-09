import CardTag from '../utils/CardTag.js';
import { deleteSelectedTag } from '../utils/animations.js';
import { filtersTagsCallBack, checkInput } from '../utils/sortRecipesBySearching.js';
import FiltersLabelPattern from './pattern/FiltersLabelPattern.js';

let selectedArray = [];

export default class FiltersTags {

	constructor() {
		this.lastTextContent = '';
		this.tagsData = [];
		this.ingredientsList = [];
		this.ustensilesList = [];
		this.appareilsList = [];
	}

	filterTags = (data) => {

		const ingredientsList = new FiltersLabelPattern().filteredListTags(data, 'ingredients');
		const appareilsList = new FiltersLabelPattern().filteredListTags(data, 'appareils');
		const ustensilesList = new FiltersLabelPattern().filteredListTags(data, 'ustensiles');
		const tags = document.querySelectorAll('.tags-list');
		this.ingredientsList = ingredientsList;
		this.appareilsList = appareilsList;
		this.ustensilesList = ustensilesList;
		
		this.tagsData = data;

		tags.forEach(tag => {
			const tagsTitleText = tag.querySelector('.category p').textContent;

			if (tagsTitleText === 'Ingrédients') {
				this.createFilterTags(this.ingredientsList, 'ingredients');
			} else if (tagsTitleText === 'Appareils') {
				this.createFilterTags(this.appareilsList, 'appareils');
			}
			else if (tagsTitleText === 'Ustensiles') {
				this.createFilterTags(this.ustensilesList, 'ustensiles');
			}
		});

		this.searchFilters(ingredientsList, 'ingredients');
		this.searchFilters(appareilsList, 'appareils');
		this.searchFilters(ustensilesList, 'ustensiles');
	};

	selectFilterTag = (labelType) => {
		const list = document.querySelector(`.${labelType} .filters-tags-list`).children;
		const listArray = Array.from(list);
	
		listArray.forEach(element => {
			element.addEventListener('click', (event) => {
				let tagContent = element.textContent;
				if (selectedArray.includes(tagContent)) {
					return;
				} else {
					selectedArray.push(tagContent);
					this.updateSelectedTags(labelType);
					this.updateSaveTags(tagContent, labelType);
					this.deleteSelectedTag(labelType);
					this.deleteSavedTag(labelType);
				}
				
				event.stopPropagation();
			});

			element.removeEventListener('click', () => {});
		});
	};
	

	updateSelectedTags = (labelType) => {
		const selectedTags = document.querySelector(`.${labelType} .label-selected`);
		const listSelectedTags = Array.from(selectedTags.children);

		const existingTags = listSelectedTags.map(tag => tag.textContent);

		selectedArray.forEach(tag => {
			if (!existingTags.includes(tag)) {
				const newSelectedTag = document.createElement('li');
				newSelectedTag.textContent = tag;
				selectedTags.appendChild(newSelectedTag);
				newSelectedTag.classList.add('label-selected-tags');
				deleteSelectedTag();
			}
		});

		if (selectedArray.length > 0) {
			selectedTags.classList.remove('hide');
		} else {
			selectedTags.classList.add('hide');
		}
	};


	updateSaveTags = (data) => {

		this.lastTextContent = data;

		const savedTags = document.querySelectorAll('.saved-tag span');
		let tagExists = false;
		
		savedTags.forEach(tag => {
			if (tag.textContent === this.lastTextContent) {
				tagExists = true;
				return; 
			}
		});
		
		if (!tagExists) {
			new CardTag().createCardTag(this.lastTextContent);
			this.lastTextContent = '';
			filtersTagsCallBack();
		}
	};

	deleteSelectedTag = (labelType) => {
		const deleteSelectedTagBtn = document.querySelectorAll(`.${labelType} .label-selected-tags`);
		deleteSelectedTagBtn.forEach(tag => {
			tag.addEventListener('click', (event) => {
				this.deleteSelectedTagAndSavedTag(event.target.textContent, labelType);
				tag.remove();
				this.updateSelectedTags(labelType);
				filtersTagsCallBack();
			});
			tag.removeEventListener('click', () => {});
		});
	};
	
	deleteSavedTag = (labelType) => {
		const deleteSavedTagBtn = document.querySelectorAll('.delete-tag');
		deleteSavedTagBtn.forEach(tag => {
			tag.addEventListener('click', (event) => {
				this.deleteSavedTagAndSelectedTag(labelType, event.target.previousElementSibling.textContent);
				event.target.parentElement.remove();
				this.updateSelectedTags(labelType);
				filtersTagsCallBack();
			});
			tag.removeEventListener('click', () => {});
		});
	};
	
	deleteSelectedTagAndSavedTag = (tagText) => {
		const deleteSavedTagBtn = document.querySelectorAll('.delete-tag');
		deleteSavedTagBtn.forEach(savedTag => {
			if (savedTag.previousElementSibling.textContent === tagText) {
				selectedArray = selectedArray.filter(item => item !== tagText);
				savedTag.parentElement.remove();
			}
		});
	};
	
	deleteSavedTagAndSelectedTag = (labelType, tagText) => {
		const deleteSelectedTagBtn = document.querySelectorAll(`.${labelType} .label-selected-tags`);
		deleteSelectedTagBtn.forEach(selectedTag => {
			if (selectedTag.textContent === tagText) {
				selectedArray = selectedArray.filter(item => item !== tagText);
				selectedTag.remove();
			}
		});
	};
	
	searchFilters = (data, labelType) => {
		const input = document.querySelector(`#${labelType}-input`);
		const clearInput = document.querySelector(`#clear-${labelType}-search-label-icon`);

		input.value = '';

		if (data.length > 0) {
			input.addEventListener('input', (event) => {
				const searchValue = checkInput(event.target.value.toLowerCase());
				if (searchValue.length > 0) {

					const tagsFiltered = data.filter(tag => tag.toLowerCase().includes(searchValue));

					this.checkAndClearTagsDom(true, labelType);
					this.createFilterTags(tagsFiltered, labelType);
	
				} else {
					this.checkAndClearTagsDom(false, labelType);
					this.createFilterTags(data, labelType);
				}
			});

			clearInput.addEventListener('click', (event) => {
				this.checkAndClearTagsDom(true, labelType);
				this.createFilterTags(data, labelType);
				input.value = '';
				event.stopPropagation();
			});

		}

	};

	checkAndClearTagsDom = (searchingTag, labelType) => {
		const allfiltersList = document.querySelectorAll('.label-tags');
		const filtersList = document.querySelectorAll(`.${labelType} .filters-tags-list .label-tags`);
		const mainSearch = document.querySelector('#search').value;

		
		if (allfiltersList.length > 0 && !searchingTag) {
			allfiltersList.forEach(element => {
				element.remove();
			});
		}
		else if (mainSearch.length > 0 && searchingTag) {
			filtersList.forEach(element => {
				element.remove();
			});
		}
		else if (searchingTag && filtersList.length > 0) {
			filtersList.forEach(element => {
				element.remove();
			});
		}
	};

	createFilterTags = (tags, labelType) => {
		const list = document.querySelector(`.${labelType} .filters-tags-list`);
		list.innerHTML = '';

		tags.forEach(tag => {

	
			const li = document.createElement('li');
			const span = document.createElement('span');
			const tagElement = `${tag}`;

			span.innerHTML = tagElement;
			li.classList.add('label-tags');
			span.classList.add('label-tag-span');
			li.appendChild(span);
			list.appendChild(li);
		});
		
		this.selectFilterTag(labelType);

	};


}
