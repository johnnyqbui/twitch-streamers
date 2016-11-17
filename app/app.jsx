const React = require('react');
const ReactDOM = require('react-dom');
const Twitch = require('Twitch');

// Load Foundation and font awesome
require('style!css!foundation-sites/dist/foundation.min.css');
require('style!css!font-awesome/css/font-awesome.min.css');

// Foundation uses jQuery, jQuery setup in webpack.config
$(document).foundation();

//App.css
require('style!css!sass!applicationStyles');

ReactDOM.render(
	<Twitch />, document.getElementById('app')
);
