// define all UI variable
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.site-navbar ul');
const navLinks = document.querySelectorAll('.site-navbar a');

// load all event listners
//allEventListners();

/*
// functions of all event listners
function allEventListners() {
  // toggler icon click event
  navToggler.addEventListener('click', togglerClick);
  // nav links click event
  navLinks.forEach( elem => elem.addEventListener('click', navLinkClick));
}

// togglerClick function
function togglerClick() {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('open');
}

// navLinkClick function
function navLinkClick() {
  if(navMenu.classList.contains('open')) {
    navToggler.click();
  }
}
*/

// Function carousel
$(".function-carousel").owlCarousel({
  items:1,
  loop:true,
  margin:10,
  autoplay:false,
});

$(".integration-carousel").owlCarousel({
  autoplay: true,
  dots: true,
  loop: true,
  margin: 40,
  responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }
  }
});

// Function pricing

jQuery(document).ready(function($){
	//wrap each one of your filter in a .cd-gallery-container div container
	bouncy_filter($('.cd-gallery-container'));

	function bouncy_filter($container) {
		$container.each(function(){
			var $this = $(this);
			var filter_list_container = $this.children('.cd-filter'),
				filter_values = filter_list_container.find('li:not(.placeholder) a'),
				filter_list_placeholder = filter_list_container.find('.placeholder a'),
				filter_list_placeholder_text = filter_list_placeholder.text(), 
				filter_list_placeholder_default_value = 'Select',
				gallery_item_wrapper = $this.children('.cd-gallery').find('.cd-item-wrapper');

			//store gallery items
			var gallery_elements = {};
			filter_values.each(function(){
				var filter_type = $(this).data('type');
				gallery_elements[filter_type] = gallery_item_wrapper.find('li[data-type="'+filter_type+'"]');
			});

			//detect click event
			filter_list_container.on('click', function(event){
				event.preventDefault();
				//detect which filter item was selected
				var selected_filter = $(event.target).data('type');
					
				//check if user has clicked the placeholder item (for mobile version)
				if( $(event.target).is(filter_list_placeholder) || $(event.target).is(filter_list_container) ) {

					(filter_list_placeholder_default_value == filter_list_placeholder.text()) ? filter_list_placeholder.text(filter_list_placeholder_text) : filter_list_placeholder.text(filter_list_placeholder_default_value) ;
					filter_list_container.toggleClass('is-open');

				//check if user has clicked a filter already selected 
				} else if( filter_list_placeholder.data('type') == selected_filter ) {
					
					filter_list_placeholder.text($(event.target).text()) ;
					filter_list_container.removeClass('is-open');	

				} else {
					//close the dropdown (mobile version) and change placeholder text/data-type value
					filter_list_container.removeClass('is-open');
					filter_list_placeholder.text($(event.target).text()).data('type', selected_filter);
					filter_list_placeholder_text = $(event.target).text();
					
					//add class selected to the selected filter item
					filter_values.removeClass('selected');
					$(event.target).addClass('selected');

					//give higher z-index to the gallery items selected by the filter
					show_selected_items(gallery_elements[selected_filter]);

					//rotate each item-wrapper of the gallery
					//at the end of the animation hide the not-selected items in the gallery amd rotate back the item-wrappers
					
					// fallback added for IE9
					var is_explorer_9 = navigator.userAgent.indexOf('MSIE 9') > -1;
					
					if( is_explorer_9 ) {
						hide_not_selected_items(gallery_elements, selected_filter);
						gallery_item_wrapper.removeClass('is-switched');
					} else {
						gallery_item_wrapper.addClass('is-switched').eq(0).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {		
							hide_not_selected_items(gallery_elements, selected_filter);
							gallery_item_wrapper.removeClass('is-switched');
						});
					}
				}
			});
		});
	}
});

function show_selected_items(selected_elements) {
	selected_elements.addClass('is-selected');
}

function hide_not_selected_items(gallery_containers, filter) {
	$.each(gallery_containers, function(key, value){
  		if ( key != filter ) {	
			$(this).removeClass('is-visible is-selected').addClass('is-hidden');

		} else {
			$(this).addClass('is-visible').removeClass('is-hidden is-selected');
		}
	});
}

(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();