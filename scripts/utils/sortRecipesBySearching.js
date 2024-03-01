import RecetteCardBuilder from '../pages/RecetteCardBuilder.js';
import { changeCoverPosition } from './changeCoverPosition.js';
import CardTag from './CardTag.js';

export const triRecettes = (data) => {
	const datas = data;
	let dataFiltered = [];

	const dataSearch = datas;

	document.querySelector('#search').addEventListener('input', (event) => {
		if (event.target.value !== null) {

			const searchValue = checkInput(event.target.value);

			if (searchValue.length >=  3) {
				let searchValueFormated = searchValue.toLowerCase().split(' ');

				searchValueFormated.forEach(element => {
                    
					dataFiltered = dataSearch.filter(recette => {
						const titre = recette.name.toLowerCase().split(' ');
						const ingredients = recette.ingredients.flatMap(ingredient => ingredient.ingredient.toLowerCase().split(' '));
						const description = recette.description.toLowerCase().split(' ');
        
						return ingredients.some(el => el.includes(element)) ||
                            titre.some(el => el.includes(element)) ||
                            description.some(el => el.includes(element));
					});

				});

				if (dataFiltered.length > 0) {
					updateRecipesList(dataFiltered);
					createTag(dataFiltered[0].ingredients[0].ingredient, dataFiltered);
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

			} else if (event.target.value.length < 3) {
				updateRecipesList(data);
			}
		}
	});
};

const createTag = (data, dataFiltered) => {
	const searchIcon = document.querySelector('#search-icon');
	
	// Vérifiez si l'écouteur d'événement a déjà été ajouté
	if (!searchIcon.hasListener) {
		searchIcon.addEventListener('click', () => {
			new CardTag().createCardTag(data);
			deleteTag(dataFiltered);
		});
		
		// Marquez que l'écouteur d'événement a été ajouté
		searchIcon.hasListener = true;
	}
};


const updateRecipesList = (recipes) => {
	const recettesList = document.querySelector('.recettes-list');
	recettesList.innerHTML = '';
	new RecetteCardBuilder().displayRecettes(recipes);
	changeCoverPosition();
};

function checkInput(input) {
	return input
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

const deleteTag = () => {
	const deleteTags = document.querySelectorAll('.delete-tag');

	if (deleteTags && deleteTags.length > 0) {
		console.log('deleted-tag existe !');
    
		deleteTags.forEach(deleteTag => {
			deleteTag.addEventListener('click', event => {
				event.target.parentElement.remove();
				console.log('ok');
			});
		});
	}
};
