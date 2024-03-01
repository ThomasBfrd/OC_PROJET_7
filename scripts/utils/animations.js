
const animationTag = () => {

	const tags = document.querySelectorAll('.saved-tag');
	
	tags.forEach(element => {
		element.addEventListener('mouseenter', () => {
			const icon = document.querySelector('.delete-tag');
	
	
			setTimeout(() => {
				
				icon.classList.remove('fa-xmark');
				icon.classList.add('fa-circle-xmark');
			}, 200);
			icon.classList.add('close-circle');
	
		});
	
		element.addEventListener('mouseleave', () => {
			const icon = document.querySelector('.delete-tag');
		
	
			icon.classList.remove('close-circle');
			icon.classList.remove('fa-circle-xmark');
			icon.classList.add('fa-xmark');
	
		});
	});
};

animationTag();