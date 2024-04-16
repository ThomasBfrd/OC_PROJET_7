import API from './api/Api.js';
import RecetteCardBuilder from './pages/RecetteCardBuilder.js';
import FiltersTags from './pages/FiltersTags.js';
// import FiltersTags from './pages/FiltersTagsAlternative.js';
import { triRecettes } from './utils/sortRecipesBySearching.js';
// import { triRecettes } from './utils/sortRecipesBySearchingAlternative.js';

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