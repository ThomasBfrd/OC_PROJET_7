import { changeCoverPosition } from '../utils/changeCoverPosition.js';

export default class RecetteCardBuilder {
	displayRecettes(data) {
		const recettes = data;
		let nbRecettes = [];
		recettes.map(element => {
			nbRecettes.push(element);
			const recettesCount = document.querySelector('#nb-edit-recettes');
			recettesCount.textContent = `${nbRecettes.length} recette${nbRecettes.length > 1 ? 's' : ''}`;
			const recettesSection = document.querySelector('.recettes-list');
			const article = document.createElement('article');
			const ingredients = element.ingredients;
			const recetteCard = `
                <div class="recette-cover">
                    <div class="timing-recette">${element.time}min</div>
                    <img src="./assets/RecipesPhotos/Recette${element.id < 10 ? '0'+element.id : element.id}.jpg" alt=${element.name}>
                    </div>
                    <div class="content-recette">
                    <h2 class="recette-titre">${element.name}</h2>
                    <h3 class="recette-label">RECETTE</h3>
                    <div class="recette-container-description">
                        <p class="recette-description">${element.description}</p>
                    </div>
                    <h3 class="recette-label">INGRÉDIENTS</h3>
                    <ul class="recette-ingredients">
                    ${ingredients.map(ingredient => `
                        <li>
                            <h4>${ingredient.ingredient}</h4>
                            <p class="ingredient-quantity">${ingredient.quantity ? ingredient.quantity : '-'} ${ingredient.unit ? ingredient.unit : ''}</p>
                        </li>`).join('')}
                    </ul>
                    <div class="recette-show-more"><i class="fa-solid fa-arrow-down"></i></div>
                </div>
                `;
        
			recettesSection.appendChild(article);
			article.innerHTML = recetteCard;
			article.classList.add('recette');
			changeCoverPosition();
		});
	}
}