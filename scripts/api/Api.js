export default class API {
	async getData() {
		const url = '../../data/recipes.json';

		const response = await fetch(url);
		const data = await response.json();

		return data;
	}
}