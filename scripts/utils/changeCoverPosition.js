// setTimeout(() => {
// 	changeCoverPosition();
// },  500);

export const changeCoverPosition = () => {
	document.querySelectorAll('.recette-cover img').forEach(imgElement => {
		let imgSrc = imgElement.src;
		let img = new Image();
		img.onload = function() {
			let orientation = (this.width > this.height) ? 'landscape' : 'portrait';
			adjustImagePosition(imgElement, orientation);
		};
		img.src = imgSrc;
	});
};

export const adjustImagePosition = (imgElement, orientation) => {
	if (orientation === 'landscape') {
		imgElement.style.objectPosition = '0% -50px';
	} else {
		imgElement.style.objectPosition = '0% -130px';
	}
};