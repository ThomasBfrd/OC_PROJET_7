import RecetteCardBuilder from '../pages/RecetteCardBuilder.js';
import { changeCoverPosition } from './changeCoverPosition.js';
import CardTag from './CardTag.js';
import FiltersTags from '../pages/FiltersTags.js';

let dataSearchFiltered = [];
let dataSearchAndLabelFiltered = [];
let recipesData = [];

export const triRecettes = (data) => {
	const datas = data;
	let searchBar = document.querySelector('#search');
	searchBar.value = '';
	const dataSearch = datas;
	recipesData = datas;
	
	searchBar.addEventListener('input', (event) => {
		if (event.target.value !== null) {
			
			const searchValue = checkInput(event.target.value);
			
			if (searchValue.length >=  3) {
				let searchValueFormated = searchValue.toLowerCase();
				
				dataSearchFiltered = findInArray(dataSearch, searchValueFormated);
				
				if (dataSearchFiltered.length > 0) {
					filterRecipes();
					let ingredientFound = dataSearchFiltered[0].ingredients.find(ingredient => 
						ingredient.ingredient.toLowerCase().includes(searchValueFormated)
					);
					
					if (ingredientFound) {
						createTag(ingredientFound.ingredient);
					}
				} else {
					const searchValue = event.target.value.length > 10 ? event.target.value.substring(0,10) + '...' : event.target.value;
					emptyRecipes(`Aucune recette ne contient ${searchValue} dans ses ingrédients.`);
				}

			} else {
				dataSearchFiltered = [];
				filterRecipes();
			}
		}
	});
};

const filterRecipes = () => {
	const tags = checkTags();

	if (tags.length > 0) {
		let filteredRecipes = dataSearchFiltered.length > 0 ? [...dataSearchFiltered] : [...recipesData];

		tags.forEach(tag => {
			filteredRecipes = findInArray(filteredRecipes, tag);
		});

		dataSearchAndLabelFiltered = filteredRecipes;

		if (dataSearchAndLabelFiltered.length > 0) {
			updateRecipesList(dataSearchAndLabelFiltered);
			new FiltersTags().filterTags(dataSearchAndLabelFiltered);
		} else {
			emptyRecipes('Aucune recette trouvée à partir des filtres selectionnés');
		}
	} else {
		if (dataSearchFiltered.length > 0) {
			updateRecipesList(dataSearchFiltered);
			new FiltersTags().filterTags(dataSearchFiltered);
		} else {
			updateRecipesList(recipesData);
			new FiltersTags().filterTags(recipesData);
		}
	}
};


const findInArray = (array, element) => {
	return array.filter(recette => {
		const titre = recette.name.toLowerCase();
		const ingredients = recette.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
		const description = recette.description.toLowerCase();
		const ustensils = recette.ustensils.map(ustensil => ustensil.toLowerCase());
	
		return ingredients.some(ingredient => ingredient.includes(element)) ||
				titre.includes(element) ||
				description.includes(element) || ustensils.includes(element);
	});
};

export const filtersTagsCallBack = () => {
	if (dataSearchAndLabelFiltered.length > 0) {
		return filterRecipes();
	} else if (dataSearchFiltered.length > 0) {
		return filterRecipes();

	} else if (dataSearchAndLabelFiltered.length < 1 && dataSearchFiltered.length < 1) {
		return filterRecipes();
	}
};


let lastTextContent = '';

const createTag = (data) => {
	const searchIcon = document.querySelector('#search-icon');
    
	if (lastTextContent !== data) {
        
		searchIcon.removeEventListener('click', () => handleSearchIconClick(data));
        
		searchIcon.addEventListener('click', () => handleSearchIconClick(data));

		lastTextContent = data;
	}
};

const handleSearchIconClick = (data) => {
	const savedTags = document.querySelectorAll('.saved-tag span');
	let tagExists = false;
    
	savedTags.forEach(tag => {
		if (tag.textContent === lastTextContent) {
			tagExists = true;
			return; 
		}
	});
    
	if (!tagExists) { 
		new CardTag().createCardTag(lastTextContent);
		filterRecipes();
		deleteTag(data);
	}
};


const updateRecipesList = (recipes) => {
	if (recipes.length > 0) {
		const recettesList = document.querySelector('.recettes-list');
		recettesList.innerHTML = '';
		new RecetteCardBuilder().displayRecettes(recipes);
		changeCoverPosition();
	}
};

export const checkInput = (input) => {
	return input
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
};

const deleteTag = () => {
	const deleteTags = document.querySelectorAll('.delete-tag');

	if (deleteTags && deleteTags.length > 0) {
    
		deleteTags.forEach(deleteTag => {
			deleteTag.addEventListener('click', event => {
				event.target.parentElement.remove();
				filtersTagsCallBack();
			});
		});
	}
};

export const checkTags = () => {

	const tagsArray = [];
	const tags = document.querySelectorAll('.tag-text');

	tags.forEach(tag => {
		tagsArray.push(tag.textContent.toLowerCase());
	});


	return tagsArray;
};

const emptyRecipes = (message) => {
	const recettesCount = document.querySelector('#nb-edit-recettes');
	recettesCount.innerHTML = '0 recettes';
	const recettesList = document.querySelector('.recettes-list');
	recettesList.innerHTML = '';
	const emptyList = document.createElement('p');
	emptyList.classList.add('empty-list');
	emptyList.innerHTML = message;
	recettesList.appendChild(emptyList);
};