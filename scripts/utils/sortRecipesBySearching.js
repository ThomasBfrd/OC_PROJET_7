import RecetteCardBuilder from '../pages/RecetteCardBuilder.js';
import { changeCoverPosition } from './changeCoverPosition.js';

export const triRecettes = (data) => {
	const datas = data;
	let dataFiltered = [];
	// let debounceTimeOut;

	const dataSearch = datas.reduce((resultats, recette) => {
		resultats.push(recette);
		return resultats;
	}, []);

	document.querySelector('#search').addEventListener('input', (event) => {
		if (event.target.value !== null) {

			const searchValue = checkInput(event.target.value);
			if (searchValue.length >=  3) {
				console.log(searchValue);
				dataFiltered = dataSearch.filter(recette => {
					searchValue.toLowerCase();
					const titre = recette.name.toLowerCase().split(' ');
					const ingredients = recette.ingredients.flatMap(ingredient => ingredient.ingredient.toLowerCase().split(' '));
					const description = recette.description.toLowerCase().split(' ');
    
					return titre.some(el => el.includes(searchValue)) ||
                        ingredients.some(el => el.includes(searchValue)) ||
                        description.some(el => el.includes(searchValue));
				});
				if (dataFiltered.length > 0) {
					updateRecipesList(dataFiltered);
				} else {
					const recettesCount = document.querySelector('#nb-edit-recettes');
					recettesCount.innerHTML = '0';
					const recettesList = document.querySelector('.recettes-list');
					recettesList.innerHTML = '';
					const emptyList = document.createElement('p');
					emptyList.classList.add('empty-list');
					const searchValue = event.target.value.length > 10 ? event.target.value.substring(0,10) + '...' : event.target.value;
					emptyList.innerHTML = `Aucune recette ne contient ${searchValue} dans ses ingrédients.`;
                        
					recettesList.appendChild(emptyList);
				}
			} else if (event.target.value.length === 0) {
				updateRecipesList(data);
			}
		}
	});
};

const updateRecipesList = (recipes) => {
	const recettesList = document.querySelector('.recettes-list');
	recettesList.innerHTML = '';
	new RecetteCardBuilder().displayRecettes(recipes);
	changeCoverPosition();
};

function checkInput(unsafe) {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}