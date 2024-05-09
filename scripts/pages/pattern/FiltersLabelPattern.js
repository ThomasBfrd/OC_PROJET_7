export default class FiltersLabelPattern {
    
	filteredListTags = (data, option) => {
		let datas = data;
		let tagsList = [];
		let tagsFiltered = [];
    
		switch(option) {

		case 'appareils':

			for (let i = 0; i < datas.length; i++) {
				if (!tagsList.includes(datas[i].appliance)) {
					tagsList.push(datas[i].appliance);
				}
			}
			tagsList.sort();
			tagsFiltered = tagsList;
			break;

		case 'ingredients':

			for (let j = 0; j < datas.length; j++) {
				for (let k = 0; k < datas[j].ingredients.length; k++) {
					if (!tagsList.includes(datas[j].ingredients[k].ingredient)) {
						tagsList.push(datas[j].ingredients[k].ingredient);
					}
				}
			}
			tagsList.sort();
			tagsFiltered = tagsList;
			break;
		case 'ustensiles':

			for (let l = 0; l < datas.length; l++) {
				for (let m = 0; m < datas[l].ustensils.length; m++) {
					if (!tagsList.includes(datas[l].ustensils[m])) {

						tagsList.push(datas[l].ustensils[m]);
					}
				}
			}
			tagsList.sort();
			tagsFiltered = tagsList;
			break;
		}
        
		return tagsFiltered;
	};
}
