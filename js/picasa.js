function Picture(id, title, description, image, thumbs) {
	this.id = id;
	this.title = (title === "[UNSET]") ? "" : title;
	this.description = description;
	this.image = image;
	this.resize = function(height) {
		this.height = height;
		this.width = Math.round(height / this.image.height * this.image.width)
	}
	this.getThumb = function() {
		var url = this.image.url;
		url = url.substring(0, url.lastIndexOf('/'));
		url = url.substring(0, url.lastIndexOf('/'));
		url += '/s'
				+ (this.width / this.height > 1 ? (this.width + 1)
						: (this.height + 1)) + '/';
		// console.log('/s' + (this.width / this.height > 1 ? this.width :
		// this.height) + '/');
		// console.log(this.width + " / " + this.height);
		return url;
	}
}

function Row(width, height) {
	this.width = $(config.container).width();
	this.height = Math
			.round(($(config.container).height() - ((config.rows) * config.spacing))
					/ config.rows);
	this.pictures = [];
	this.getWidth = function() {
		var w = 0;
		$.each(this.pictures, function(index, picture) {
			w += picture.width;
		});
		w += 2 * config.spacing * this.pictures.length
		return w;
	}
	this.isFull = function() {
		return this.getWidth() >= this.width;
	}
	this.add = function(picture) {
		picture.resize(this.height);
		this.pictures.push(picture);
	}
	this.overhang = function() {
		var overhang = this.getWidth() - this.width;
		return overhang > 0 ? overhang : 0;
	}
}

function fetch(callback) {
	var pictures = [];
	$.get(config.url, function(result) {
		$.each(result.data.items, function(index, item) {
			pictures[pictures.length] = new Picture(item.id, item.title,
					item.description, item.media.image, []);
		});
		callback(pictures);
	});
}

function prepare(pictures) {
	// prepare rows - amend picture width to align them
	var notfull = true, index = 0, rows = [];

	rows[rows.length] = new Row()
	while (rows.length <= config.rows) {
		if (rows[rows.length - 1].isFull()) {
			if (rows.length == config.rows) {
				break;
			}
			rows.push(new Row());
		}
		if (pictures[index]) {
			rows[rows.length - 1].add(pictures[index++]);
		} else {
			break;
		}
	}
	return rows;
}

function display(rows) {
	$.each(rows, function(index, row) {
		var r = $("<div/>").attr('class', 'line');
		config.container.append(r);
		var overhang = row.overhang();
		var piece = Math.round(overhang / row.pictures.length);
		$.each(row.pictures, function(i, picture) {
			if (i == (row.pictures.length - 1)) {
				piece = overhang;
			} else {
				overhang = overhang - piece;
			}
			
			$("<div/>").hide().attr('class', 'picture').css({
				'margin' : config.spacing + 'px',
				'width' : picture.width - piece,
				'height' : picture.height,
				'background' : '#fff url("' + picture.getThumb() + '") no-repeat center center'
			}).appendTo(r).fadeIn('slow');
		});
	});
}

var process = function(pictures) {
	var rows = prepare(pictures);
	display(rows);
}

var config = {
	url : 'https://picasaweb.google.com/data/feed/api/user/www.glassart.cz/albumid/5910040221333787729?&kind=photo&access=public&max-results=50&imgmax=1200&alt=jsonc',
	container : $('.gallery'),
	rows : 3,
	spacing : 1,
	padding : 0
}

$(window).resize(_.debounce(function() {
	//$("body").css("padding-top", $(".navbar").height() + "px");
	if ($(config.container).is(":visible")) {
		$(config.container).css({
			"height" : ($(window).height() - ($('.navbar').height() + 5)) + "px",
			"padding" : config.padding + "px"
		});
		$(".picture", config.container).fadeOut(400);
		fetch(process);
	}
}, 500));

function carouselImage(url, heading, caption) {
	return $("<div class='item active'/>").append(
		$("<img/>").attr("src", url)
	).append(
		$("<div class='carousel-caption'/>").text(caption)
	).append(
		$("<p/>").text(heading)
	);
}

function addCarouselItem(carousel, active, url, heading, caption) {
	var indicator = $("<li/>").attr({
		'data-target' : '#' + carousel.attr('id'),
		'data-slide-to' : $('.carousel-indicators li', carousel).length,
		'class' : (active ? 'active' : '')
	});
	var item = $("<div/>").attr({
		'class' : 'item' + (active ? ' active' : '')
	}).append(
		$("<img/>").attr("src", url)
	).append(
		$('<div class="container"/>').append(
			$("<div class='carousel-caption'/>").append(
				$("<h1/>").text(heading)
			).append(
				$("<p/>").text(caption)
			)
		)
	).append(
		
	);
	$('.carousel-indicators', carousel).append(indicator);
	$('.carousel-inner', carousel).append(item);
}

function carousel() {
	addCarouselItem(
		$(".carousel"),
		true,
		'https://lh6.googleusercontent.com/-27yX_laYm0s/UgSu6cHwGzI/AAAAAAAAAEM/S2T7SP21500/s640/',
		'heading',
		'some caption'
	);
	addCarouselItem(
		$(".carousel"),
		false,
		'https://lh4.googleusercontent.com/-fyk1SVVwX_0/UgSuxYnKghI/AAAAAAAAADM/4A1baS4f9Ac/s640/',
		'different heading',
		'and different caption'
	);
	addCarouselItem(
		$(".carousel"),
		false,
		'https://lh3.googleusercontent.com/-PehMuii_-Ag/UgSuzU7NH8I/AAAAAAAAADc/lHYbtiAwtxs/s640/',
		'different heading',
		'and different caption'
	);
	addCarouselItem(
		$(".carousel"),
		false,
		'https://lh6.googleusercontent.com/-iR-fTBiPjA0/UgSuZp3nZII/AAAAAAAAABE/O40bY7K8IA8/s559/',
		'different heading',
		'and different caption'
	);
	addCarouselItem(
		$(".carousel"),
		false,
		'https://lh5.googleusercontent.com/-3sIPErquL7s/UgSuhrHGsqI/AAAAAAAAAB8/qTNIU2ufoag/s514/',
		'different heading',
		'and different caption'
	);
	
			
	$('.carousel').carousel();
}

carousel();
//$(window).resize();
