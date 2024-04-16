

export default class CardTag {

	createCardTag(element) {
		const tagsSection = document.querySelector('.saved-tags');
		const tag = document.createElement('div');

		const tagCard = `
            <span class="tag-text">${element}</span>
            <i class="fa-solid fa-xmark delete-tag"></i>
        `;

		tag.innerHTML = tagCard;
		tag.classList.add('saved-tag');
		tagsSection.appendChild(tag);

	}


}