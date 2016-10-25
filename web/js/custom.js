//get all elements with class and get the biggest box
function get_biggest(elements){
	var biggest_height = 0;
	for ( var i = 0; i < elements.length ; i++ ){
		var element_height = $(elements[i]).height();
		//compare the height, if bigger, assign to variable
		if(element_height > biggest_height ) biggest_height = element_height;
	}
	return biggest_height;
}

function resize() {
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	// STICKY FOOTER
	var headerHeight = $('header').outerHeight();
	var footerHeight = $('footer').outerHeight();
	var footerTop = (footerHeight) * -1
	$('footer').css({marginTop: footerTop});
	$('#main-wrapper').css({paddingBottom: footerHeight});

	$('.banner-wrap').css({'height' : windowHeight + 100});

	// for vertically middle content
	$('.bp-middle').each(function() {
		var bpMiddleHeight = $(this).outerHeight() / 2 * - 1;
		$(this).css({marginTop: bpMiddleHeight});
	});

	// for equalizer
	$('.classname').css({minHeight: 0});
  var ClassName = get_biggest($('.classname'));
  $('.classname').css({minHeight: ClassName});
}

$(window).resize(function() {
	resize();
	doCoverImage();

	if ($(window).width() < 992) {
		$('header').addClass('header-white');
	} else {
		$('header').removeClass('header-white');
	}
});

$(document).ready(function() {
	doCoverImage();
	resize();

	if (Modernizr.touch) {
		$('html').addClass('bp-touch');
	}

	if ($(window).width() < 992)  {
		$('header').addClass('header-white');
	} else {
		$('header').removeClass('header-white');
	}

	$('.header-hamburger').click(function(){
    	var _this = $(this);

        setTimeout(function(){
            _this.toggleClass('active');
        }, 300);
          
    });

    if($(window).width() < 992) {
		$('.hiding').css({'opacity' : 1});
	} else {
		$('.animated').appear(function() {
	        var element = $(this);
	        var animation = element.data('animation');
	        var animationDelay = element.data('delay');
	        if(animationDelay) {
	          setTimeout(function(){
	              element.addClass( animation + " visible" );
	              element.removeClass('hiding');
	          }, animationDelay);
	        } else {
	          element.addClass( animation + " visible" );
	          element.removeClass('hiding');
	        }               
	    }, {accY: -90});
	}

	
});

$(window).load(function() {
	resize();
	doCoverImage();

	if ($(window).width() < 991) {
		$('header').addClass('header-white');
	} else {
		$('header').removeClass('header-white');
	}

	setTimeout(function(){
		$('header').addClass('is-animated');
	}, 300);

	setTimeout(function(){
		$('#main-container').addClass('slide-down').css({'position' : 'relative'});
	}, 800);

	$('.feature-news .flexslider').flexslider({
	    animation: "fade",
	    controlNav: true,
	    directionNav: false,
	    smoothHeight: true

	});

	$('.prh-close').click(function(e){
		//$('#main-container').removeClass('slide-down');
		e.preventDefault();
		if($(this).hasClass('is-active')) {
			setTimeout(function(){
				$('header').toggleClass('adjusted');
			}, 400);
		} else {
			$('header').toggleClass('adjusted');
		}

		$(this).toggleClass('is-active');
		$('.promo-content').stop(true, false).slideToggle(300);
		$('.promo-h-small').toggleClass('is-open');


		
	});
});

// preloader once done
Pace.on('done', function() {
	// totally hide the preloader especially for IE
	setTimeout(function() {
		$('.pace-inactive').hide();
		
	}, 500);
});

$(window).on('scroll load', function(){

    var _cur_top = $(window).scrollTop();

    if($('header').hasClass('adjusted')) {
    	if(  _cur_top >=  306) {
			$('header').addClass('is-fixed');
		} else {
			$('header').removeClass('is-fixed');
		}
    } else {
    	if(  _cur_top >=  40) {
			$('header').addClass('is-fixed');

		} else {
			$('header').removeClass('is-fixed');
		}
    }
	

});


function doCoverImage() {	
	$('.banner-img img').each(function() {
		coverImage( $(this) );
	});
	
}

function coverImage( image ) {

	var imgObj = image;
	var iW = imgObj.attr('width');//width(); //width of image ratio
	var iH = imgObj.attr('height');//.height(); //height of image ratio

	imgObj.width(0).height(0);
	
	var imgContainer = image.parent();
	var cW = imgContainer.width(); //width of container or browser
	var cH = imgContainer.height(); //height of container or browser

	//console.log(iW,iH,cW,cH);

	if ( cH > 1 ) {
		var cP = cW/cH; //ratio of container or browser
		var iP = iW/iH; //ratio of image

		if ( iP > cP ) { //if image ratio is more than container ratio (if image width is more than container width)
			iH = cH; //set image height from container height
			iW = cH * iP; //set image width using container height and image ratio
			imgObj.css({
				'margin-top': 0,
				'margin-left': Math.ceil((cW-iW)/2),
				'width': Math.ceil(iW),
				'height': Math.ceil(iH)
			}); //center the image and set dimensions
		} else { //if image ratio is less than container ratio (if image height is more than container height)
			iW = cW; //set image width from container width
			iH = cW / iP; //set image height from container width and ratio
			imgObj.css({
				'margin-top': Math.ceil((cH-iH)/2),
				'margin-left': 0,
				'width': Math.ceil(iW),
				'height': Math.ceil(iH)
			}); //center the image and set dimensions
		}
	} else {
		imgObj.css({
			'margin-top': 0,
			'margin-left': 0,
			'width': 'auto',
			'height': 'auto'
		});
	}
}
