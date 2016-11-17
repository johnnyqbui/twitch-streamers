const fetchJsonp = require('fetch-jsonp');
const api = 'https://wind-bow.hyperdev.space/twitch-api/streams/';

// Obtain api
module.exports = {
	getStreamers: function(streamer) {
		const encodeStreamer = encodeURIComponent(streamer.toLowerCase());
	    const requestUrl = `${api}${encodeStreamer}`;
	    return fetchJsonp(requestUrl)
		    .then(response => response.json())
		    .then(json => {
		    	return json;
		    })
	        .catch(function(error) {
	          console.log("Something went wrong! " + error)
	        })
	}
}