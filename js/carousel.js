function CarouselItem(active, url, heading, caption) {
	this.active = active;
	this.url = url;
	this.heading = heading;
	this.caption = caption;
}

function Carousel(container, indicator) {
	this.container = $(container);
	this.indicators = indicator ? $(".carousel-indicators", this.container) : null;
	
	this.show = function() {
		this.container.carousel();
	}

	this.destroy = function() {
		$(this.container).parent().fadeOut(function() {
			$(".carousel-inner", this).empty();
			
		});
	}

	this.add = function(item) {
		this.addItem(item);
		this.addIndicator(item);
	}
	
	this.addItem = function(item) {
		$('.carousel-inner', this.container).append($("<div/>").attr({
			'class' : 'item' + (item.active ? ' active' : '')
		}).append(
			$("<img/>").attr("src", item.url)
		).append(
			$('<div class="container"/>').append(
				function() {
					var caption = $("<div class='carousel-caption'/>");
					if ((item.heading) || (item.caption)) {
						if (item.heading) {
							$(caption).append($("<h1/>").text(item.heading));
						}
						if (item.caption) {
							$(caption).append($("<p/>").text(item.caption));
						}
					}
					return caption;
				}
			)
		));
	}
	
	this.addIndicator = function(item) {
		if (!this.indicators) {
			return false;
		}
		
		$(this.indicators).append($("<li/>").attr({
			'data-target' : '#' + this.container.attr('id'),
			'data-slide-to' : $('.carousel-indicators li', this.container).length,
			'class' : (item.active ? 'active' : '')
		}));
	}
}