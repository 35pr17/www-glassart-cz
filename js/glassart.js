$(function() {
	var userId = "www.glassart.cz";

	var welcome = $(".gallery");
	welcome.picasa('init', {
		'imagesize' : 400,
		'thumbsize': 200,
		'overrideLayout' : true
	}).picasa('gallery', userId, '5910040221333787729', function (photos) {
		$.each(photos, function (index, photo) {
			welcome.append("<img src='" + photo.thumbs[0] + "'>")
			//console.log();
			//$(target).append(imageDiv);
		});

		//var div = $(document.createElement('div')).addClass('picasa-album');
		//$(".picasa-image a[rel^='picasa-album[" + album + "]']", this);
	});
});
