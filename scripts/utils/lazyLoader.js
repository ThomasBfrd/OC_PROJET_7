window.addEventListener('scroll', function() {
	document.querySelectorAll('.recette .recette-cover img').forEach(function(img) {
		if (img.getBoundingClientRect().top < (window.scrollY + window.innerHeight + 100)) {
			// Si l'image n'a pas encore été chargée (pas de data-src), on la charge
			if (!img.getAttribute('data-src-loaded')) {
				var source = img.getAttribute('src');
				img.src = source;
				img.setAttribute('data-src-loaded', 'true');
				// console.log('image chargée', img);
			}
		}
	});
});