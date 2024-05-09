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

		for (let i = 0; i < tags.length; i++) {
			const tagsTitleText = tags[i].querySelector('.category p').textContent;

			if (tagsTitleText === 'Ingrédients') {
				this.createFilterTags(this.ingredientsList, 'ingredients');
			} else if (tagsTitleText === 'Appareils') {
				this.createFilterTags(this.appareilsList, 'appareils');
			}
			else if (tagsTitleText === 'Ustensiles') {
				this.createFilterTags(this.ustensilesList, 'ustensiles');
			}
		}

		this.searchFilters(ingredientsList, 'ingredients');
		this.searchFilters(appareilsList, 'appareils');
		this.searchFilters(ustensilesList, 'ustensiles');
	};

	selectFilterTag = (labelType) => {
		const list = document.querySelector(`.${labelType} .filters-tags-list`).children;
		const listArray = Array.from(list);

		for (let i = 0; i < listArray.length; i++) {

			listArray[i].addEventListener('click', () => {});

			listArray[i].addEventListener('click', (event) => {
				const tagContent = listArray[i].textContent;

				if (selectedArray.length > 0 && selectedArray.indexOf(tagContent) !== -1) {
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

			listArray[i].addEventListener('click', () => {});
		}
	};

	updateSelectedTags = (labelType) => {
		const list = document.querySelector(`.${labelType} .filters-tags-list`).children;
		const listArray = Array.from(list);
		const selectedTags = document.querySelector(`.${labelType} .label-selected`);
		const listSelectedTags = Array.from(selectedTags.children);
		const existingTags = listSelectedTags.map(tag => tag.textContent);
  
		for (let i = 0; i < selectedArray.length; i++) {
			const tag = selectedArray[i];
			if (existingTags.indexOf(tag) == -1) {
				for (let j = 0; j < listArray.length; j++) {
					const tagFromList = listArray[j];
					if (tagFromList.textContent === tag) {
						const newSelectedTag = document.createElement('li');
						newSelectedTag.textContent = tag;
						selectedTags.appendChild(newSelectedTag);
						newSelectedTag.classList.add('label-selected-tags');
						deleteSelectedTag();
					}
				}
			}
		}
	
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

		for (let i = 0; i < savedTags.length; i++) {
			if (savedTags[i].textContent === this.lastTextContent) {
				tagExists = true;
				return; 
			}
		}
		
		if (!tagExists) {
			new CardTag().createCardTag(this.lastTextContent);
			this.lastTextContent = '';
			filtersTagsCallBack();
		}
	};

	deleteSelectedTag = (labelType) => {
		const deleteSelectedTagBtn = document.querySelectorAll(`.${labelType} .label-selected-tags`);

		for (let i = 0; i < deleteSelectedTagBtn.length; i++) {
			deleteSelectedTagBtn[i].addEventListener('click', (event) => {
				this.deleteSelectedTagAndSavedTag(event.target.textContent, labelType);
				deleteSelectedTagBtn[i].remove();
				this.updateSelectedTags(labelType);
				filtersTagsCallBack();
			});
			deleteSelectedTagBtn[i].removeEventListener('click', () => {});
		}
	};
	
	deleteSavedTag = (labelType) => {
		const deleteSavedTagBtn = document.querySelectorAll('.delete-tag');
		
		for (let i = 0; i < deleteSavedTagBtn.length; i++) {
			deleteSavedTagBtn[i].addEventListener('click', (event) => {
				this.deleteSavedTagAndSelectedTag(labelType, event.target.previousElementSibling.textContent);
				event.target.parentElement.remove();
				this.updateSelectedTags(labelType);
				filtersTagsCallBack();
			});
			deleteSavedTagBtn[i].removeEventListener('click', () => {});
		}
	};
	
	deleteSelectedTagAndSavedTag = (tagText) => {
		const deleteSavedTagBtn = document.querySelectorAll('.delete-tag');

		for (let i = 0; i < deleteSavedTagBtn.length; i++) {
			if (deleteSavedTagBtn[i].previousElementSibling.textContent === tagText) {
				selectedArray = selectedArray.filter(item => item !== tagText);
				deleteSavedTagBtn[i].parentElement.remove();
			}
		}
	};
	
	deleteSavedTagAndSelectedTag = (labelType, tagText) => {
		const deleteSelectedTagBtn = document.querySelectorAll(`.${labelType} .label-selected-tags`);

		for (let i = 0; i < selectedArray.length; i++) {
			if (deleteSelectedTagBtn[i].textContent === tagText) {
				selectedArray = selectedArray.filter(item => item !== tagText);
				deleteSelectedTagBtn[i].remove();
			}
		}
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
				input.value = '';
				this.checkAndClearTagsDom(true, labelType);
				this.createFilterTags(data, labelType);
				event.stopPropagation();
			});

		}

	};

	checkAndClearTagsDom = (searchingTag, labelType) => {
		const allfiltersList = document.querySelectorAll('.label-tags');
		const filtersList = document.querySelectorAll(`.${labelType} .filters-tags-list .label-tags`);
		const mainSearch = document.querySelector('#search').value;

		
		if (allfiltersList.length > 0 && !searchingTag) {

			for (let i = 0; i < allfiltersList.length; i++) {
				allfiltersList[i].remove();
			}
		}
		else if (mainSearch.length > 0 && searchingTag) {

			for (let j = 0; j < filtersList.length; j++) {
				allfiltersList[j].remove();
			}
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

		for (let i = 0; i < tags.length; i++) {
			const li = document.createElement('li');
			const span = document.createElement('span');
			const tagElement = `${tags[i]}`;

			span.innerHTML = tagElement;
			li.classList.add('label-tags');
			span.classList.add('label-tag-span');
			li.appendChild(span);
			list.appendChild(li);
		}
		
		this.selectFilterTag(labelType);

	};


}
