

async function getRecipes() {
	const res = await fetch('./recipes.json');
	return await res.json();
}


getRecipes().then(recipes => {
	const allRecipes = recipes;
	console.table(allRecipes);
	return allRecipes;
});

