export default class FiltersLabelPattern {
    
	filteredListTags = (data, option) => {
		let datas = data;
		let tagsList = [];
		let tagsFiltered = [];
    
		switch(option) {
		case 'appareils':
			datas.forEach(element => {
				if (!tagsList.includes(element.appliance)) {
					tagsList.push(element.appliance);
				}
			});
			tagsList.sort();
			tagsFiltered = tagsList;
			break;
		case 'ingredients':
			datas.forEach(element => {
				element.ingredients.forEach(el => {
					if (!tagsList.includes(el.ingredient)) {
						tagsList.push(el.ingredient);
					}
				});
			});
			tagsList.sort();
			tagsFiltered = tagsList;
			break;
		case 'ustensiles':
			datas.forEach(element => {
				element.ustensils.forEach(el => {
					if (!tagsList.includes(el)) {

						tagsList.push(el);
					}
				});
			});
			tagsList.sort();
			tagsFiltered = tagsList;
			break;
		}
        
		return tagsFiltered;
	};
}
