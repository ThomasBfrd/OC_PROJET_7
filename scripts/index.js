import API from './api/Api.js';
import RecetteCardBuilder from './pages/RecetteCardBuilder.js';
import { triRecettes } from './utils/sortRecipesBySearching.js';

const homepage = () => {
	new API().getData().then(data => {
		new RecetteCardBuilder().displayRecettes(data.recipes);
		triRecettes(data.recipes);
	}).catch(err => {
		console.error(err);
	});
};

homepage();