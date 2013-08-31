$(function() {
	function scroll(element) {
	    $('html, body').animate({
	        scrollTop: $('[name="' + $(element).attr('href').substr(1) + '"]').offset().top-40
	    }, 500, 'easeInOutExpo');
	}

	$('a.scroll').click(function(){
		$(config.container).slideUp();
		scroll($(this));
		return false;
	});

	$('.navbar-brand').click(function() {
	    $('.gallery-detail-close').click();
		$('.nav li').removeClass('active');
	});

	$('.nav li a').click(function() {
	    $('.gallery-detail-close').click();
		$(this).parent().addClass('active').siblings().removeClass('active');
	});

	$("a").click(function() {
		$(this).blur();
	});
	
	$(config.container).on('mouseenter', '.picture', function(event) {
		if ($(".hover", this).length == 0) {
			$(this).append(
				$("<div class=\"hover\">").append(
					$("<a class=\"disabled btn btn-default\">").append(
						$("<i class=\"glyphicon glyphicon-fullscreen\"></i>")
					)
				)
			)
		}
	});

	$(config.container).on('mouseleave', '.picture', function(event) {
		$(".hover", this).remove();
	});

	$(config.container).on('click', '.picture', function(event) {
		var self = this;
		var detail = $("#detail");
		$(detail).css({
			'height' : config.container.height(),
			'width' : config.container.width(),
			'left' : config.container.offset().left,
			'top' : config.container.offset().top
		});
		
		var carousel = new Carousel("#detail .carousel", false);
		$(".gallery-navbar").fadeIn(function() {
			var self = this;
			$(".gallery-detail-close", this).click(function() {
				$(self).fadeOut();
				carousel.destroy();
			});
		});
		
		$(detail).fadeIn(function() {
			var clickedIndex = $(self).attr("rel");
			$.each($(".picture", config.container), function(index, picture) {
				//if (index == 0) {
				carousel.add(new CarouselItem(
						(index == clickedIndex ? true : false),
						pictures[index].getFull(config.container.height() - 40)
						//pictures[index].title,
						//pictures[index].description
				));//}
			});
			
			/*$("#detail .carousel .item").css({
				"height" : config.container.height(),
				"width" : config.container.width()
			});*/
			carousel.show();
		});
	});
	
	$("a.gallery").click(function() {
		var self = this;
		$(config.container).show();
		scroll($(self));
		$(window).resize();
		return false;
	});

	function carousel() {
		var carousel = new Carousel(".landing .carousel", false);
		carousel.add(new CarouselItem(
			true,
			'https://lh6.googleusercontent.com/-27yX_laYm0s/UgSu6cHwGzI/AAAAAAAAAEM/S2T7SP21500/s640/',
			'heading',
			'some caption'
		));
		carousel.add(new CarouselItem(
			false,
			'https://lh4.googleusercontent.com/-fyk1SVVwX_0/UgSuxYnKghI/AAAAAAAAADM/4A1baS4f9Ac/s640/',
			'different heading',
			'and different caption'
		));
		carousel.add(new CarouselItem(
			false,
			'https://lh3.googleusercontent.com/-PehMuii_-Ag/UgSuzU7NH8I/AAAAAAAAADc/lHYbtiAwtxs/s640/',
			'different heading',
			'and different caption'
		));
		carousel.add(new CarouselItem(
			false,
			'https://lh6.googleusercontent.com/-iR-fTBiPjA0/UgSuZp3nZII/AAAAAAAAABE/O40bY7K8IA8/s559/',
			'different heading',
			'and different caption'
		));
		carousel.add(new CarouselItem(
			false,
			'https://lh5.googleusercontent.com/-3sIPErquL7s/UgSuhrHGsqI/AAAAAAAAAB8/qTNIU2ufoag/s514/',
			'different heading',
			'and different caption'
		));
		carousel.show();
	}

	resize();
	carousel();
});

