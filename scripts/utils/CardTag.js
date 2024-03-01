

export default class CardTag {

	createCardTag(ingredient) {
		const tagsSection = document.querySelector('.saved-tags');
		const tag = document.createElement('div');

		const tagCard = `
        <div class="saved-tag">
            <span class="tag-text">${ingredient}</span>
            <i class="fa-solid fa-xmark delete-tag"></i>
        </div>
        `;

		tag.innerHTML = tagCard;
		tagsSection.appendChild(tag);

	}


}