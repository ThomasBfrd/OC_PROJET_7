import API from './api/Api.js';
import RecetteCardBuilder from './pages/RecetteCardBuilder.js';
import FiltersTags from './pages/FiltersTags.js';
import { triRecettes } from './utils/sortRecipesBySearching.js';

const homepage = () => {
	new API().getData().then(data => {
		new RecetteCardBuilder().displayRecettes(data.recipes);
		new FiltersTags().filterTags(data.recipes);
		triRecettes(data.recipes);
	}).catch(err => {
		console.error(err);
	});
};

homepage();