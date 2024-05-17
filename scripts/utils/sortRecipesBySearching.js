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
					let ingredientFound = '';

					for (let i = 0; i < dataSearchFiltered[0].ingredients.length; i++) {
						if (dataSearchFiltered[0].ingredients[i].ingredient.toLowerCase().indexOf(searchValueFormated) !== -1) {
							ingredientFound = dataSearchFiltered[0].ingredients[i];
							i = dataSearchFiltered[0].ingredients.length - 1;
						}
					}

					if (ingredientFound) {
						createTag(ingredientFound.ingredient, dataSearchFiltered);
					}
				} else {
					const recettesCount = document.querySelector('#nb-edit-recettes');
					recettesCount.textContent = '0 recettes';
					const recettesList = document.querySelector('.recettes-list');
					recettesList.innerHTML = '';
					const emptyList = document.createElement('p');
					emptyList.classList.add('empty-list');
					const searchValue = event.target.value.length > 10 ? event.target.value.substring(0,10) + '...' : event.target.value;
					emptyRecipes(`Aucune recette ne contient ${searchValue} dans ses ingrédients.`);
                        
					recettesList.appendChild(emptyList);
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

		for(let i = 0; i < tags.length; i++) {
			filteredRecipes = findInArray(filteredRecipes, tags[i]);
		}

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
	const result = [];
	for (let i = 0; i < array.length; i++) {
		const recette = array[i];
		const name = recette.name.toLowerCase();
		const description = recette.description.toLowerCase();
		let foundInIngredients = false;
		let foundInUstensils = false;

		// On vérifie les ingrédients
		for (let j = 0; j < recette.ingredients.length; j++) {
			const ingredient = recette.ingredients[j].ingredient.toLowerCase();
			if (ingredient.indexOf(element) !== -1) {
				foundInIngredients = true;
				j = recette.ingredients.length - 1;
			}
			
		}

		// Vérification des ustensiles
		for (let k = 0; k < recette.ustensils.length; k++) {
			const ustensil = recette.ustensils[k].toLowerCase();
			if (ustensil.indexOf(element) !== -1) {
				foundInUstensils = true;
				k = recette.ustensils.length - 1;
			}
			
		}

		// Ajout de la recette au résultat si l'élément est trouvé dans les ingrédients ou les ustensiles
		if (foundInIngredients || foundInUstensils || name.indexOf(element) !== -1 || description.indexOf(element) !== -1) {
			result.push(recette);
		}
	}
	return result;
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

	for(let i = 0; i < savedTags.length; i++) {
		if (savedTags[i].textContent === lastTextContent) {
			tagExists = true;
			return;
		}
	}
    
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
		for(let i = 0; i < deleteTags.length; i++) {
			deleteTags[i].addEventListener('click', event => {
				event.target.parentElement.remove();
				filtersTagsCallBack();
			});
		}
	}
};

export const checkTags = () => {

	const tagsArray = [];
	const tags = document.querySelectorAll('.tag-text');

	for(let i = 0; i < tags.length; i++) {
		tagsArray.push(tags[i].textContent.toLowerCase());
	}


	return tagsArray;
};

const emptyRecipes = (message) => {
	const recettesCount = document.querySelector('#nb-edit-recettes');
	recettesCount.textContent = '0 recettes';
	const recettesList = document.querySelector('.recettes-list');
	recettesList.innerHTML = '';
	const emptyList = document.createElement('p');
	emptyList.classList.add('empty-list');
	emptyList.innerHTML = message;
	recettesList.appendChild(emptyList);
};