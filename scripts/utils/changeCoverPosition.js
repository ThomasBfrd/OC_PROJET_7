export const changeCoverPosition = () => {
	document.querySelectorAll('.recette-cover img').forEach(imgElement => {
		let imgSrc = imgElement.src;
		let img = new Image();
		img.onload = function() {
			let orientation = '';
			if (this.width > this.height) {
				orientation = 'landscape';
				adjustImagePosition(imgElement, orientation);
			} else if (this.height > this.width) {
				orientation = 'portrait';
				adjustImagePosition(imgElement, orientation);
			} else if (this.width == this.height) {
				orientation = 'square';
				adjustImagePosition(imgElement, orientation);
			}
		};
		img.src = imgSrc;
	});
};

export const adjustImagePosition = (imgElement, orientation) => {
	if (orientation === 'landscape') {
		imgElement.style.objectPosition = '0% -15px';
	} else if (orientation === 'portrait') {
		imgElement.style.objectPosition = '0% -180px';
	} else if (orientation === 'square') {
		imgElement.style.objectPosition = '0% -70px';
	}
};