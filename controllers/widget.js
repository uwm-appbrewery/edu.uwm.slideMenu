var args = arguments[0] || {},
	dispatcher = require('dispatcher'),
	isOpen = false,
	prevSelectedNode = 0;

/**
 * @method init
 *
 * Creates rows for and initializes the menu items.
 */
$.init = function(_options) {
	// Create array to hold menu items
	var menuItems = [];

	// For each wanted menu item, add a TableViewRow dictionary for it
	// to the array
	for(var i=0; i < _options.items.length; i++){
		$.nodes.appendRow(
			Widget.createController('menuRow', {
				id: _options.items[i].id,
				title: _options.items[i].title,
				image: _options.items[i].image,
				controller: _options.items[i].controller,
			}).getView()
		);
	}
}

/**
 * @method toggleMenu
 *
 * Toggles the state of the slide menu.
 */
$.toggleMenu = function() {
	// Make sure the menu is on top of all the other UI layers and
	// account for android matrix translation weirdness.
	if(!isOpen){ $.menuWrapper.setZIndex(1000); }
	var deviceWidth = Alloy.Globals.device.width * ((OS_IOS) ? 1 : (Alloy.Globals.device.dpi/160.0)); // Android bug/weirdness

	// Create the matrix and translate it depending on whether we 
	// want to open or close the menu (slide to the left if the menu
	// is already open, slide to the right if the menu isn't open).
	var matrix = Ti.UI.create2DMatrix();
	matrix = (isOpen ? matrix.translate(-deviceWidth, 0) : matrix.translate(deviceWidth, 0));

	// Set a variable for what the opacity of the blank space to the right
	// of the menu should be.
	var sideOpacity = (isOpen ? 0.0 : 0.2);

	// Create the animation from our translated matrix
	var animation = Ti.UI.createAnimation({
		transform: matrix,
		duration: 400
	});

	// Animate the wrapper that hold the menu and blank space to the right
	$.menuWrapper.animate(animation);

	// If the menu is already open, we want to quickly remove the opacity of
	// the blank space on the right so it looks like that piece isn't attached
	// to the menu. Also, after the animation is almost complete, we want to 
	// lower the z-index of the menu so it's behind our content and not blocking
	// clicks.
	//
	// If the menu isn't open, we want to dim the opacity of the blank space
	// on the right of the menu while the menu is opening, again to give it
	// the effect of not being attached to the menu 
	if(isOpen){
		$.menuFillRight.animate({
			opacity: sideOpacity,
			duration: 10
		});
		setTimeout(function(){ $.menuWrapper.setZIndex(0); }, 300);
	} else {
		setTimeout(function(){
			$.menuFillRight.animate({
				opacity: sideOpacity,
				duration: 400
			});
		}, 300);
	}

	// Set the menu variable to it's current state
	isOpen = !isOpen;
}

/**
 * @method setActive
 * @param {Object} _index The index of the item to show as active
 *
 * Sets the indexed item as active
 */
$.setActive = function(_index) {
	$.nodes.selectRow(_index);
	if(OS_ANDROID && prevSelectedNode != _index){
		console.log(_index);
		// $.nodes.data[_index].backgroundColor = "#DDD";
		// $.nodes.data[prevSelectedNode].backgroundColor = "#FFF";

		// prevSelectedNode = _index;
	}
};

/**
 * @event menuFillRight click
 *
 * Closes the menu if the blank space to the right is clicked.
 */
$.menuFillRight.addEventListener('click', $.toggleMenu);
