Slide Menu Widget
-------------------
A slide menu widget for Titanium Alloy.

# Usage Instructions

1. Install the widget into your Alloy project

2. We use a modified version of `app/lib/core.js` from the [ChariTi](https://github.com/mcongrove/ChariTi) project. We call ours `app/lib/navController.js` and a copy of it can be found in [this gist](https://gist.github.com/mgostisha/ac7ac34130bc06b3dabc).

3. The index controller does most of the work, as the apps using `navController.js` are View based as opposed to Window based. Here's an example of our [index.xml](https://gist.github.com/mgostisha/7d62a1b80469113bbf04) and our [index.js](https://gist.github.com/mgostisha/230045370c67e0f2a508) setup.

4. The app depends on correct constants `Alloy.Globals.device.width` and `Alloy.Globals.device.widthNegative` for the menu to display and animate correctly. These can be set in  `app/alloy.js`.
