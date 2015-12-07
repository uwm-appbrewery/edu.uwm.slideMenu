var args = arguments[0] || {};

/**
 * @method anonymous init
 *
 * Sets the properties of the table row from the arguments.
 */
(function() {
	// Set style properties
	$.rowImage.image = args.image;
	$.rowLabel.text = args.title;

	// Set custom properties
	$.row.id = args.id;
	$.row.controller = args.controller;
})();
