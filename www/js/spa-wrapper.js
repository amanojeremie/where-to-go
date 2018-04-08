//Single Page Application Wrapper
var navstack = [];
var currentUrl = '';
window.navigate = function(url) {
	navstack.push(currentUrl);
	currentUrl = url;
	$('#main-content').fadeOut(100, function() {
		$(this).load(url).hide().fadeIn(200);
	})
}

window.navigateNoStack = function(url) {
	currentUrl = url;
	$('#main-content').fadeOut(100, function() {
		$(this).load(url).hide().fadeIn(200);
	})
}

window.navigatePop = function() {
	if(navstack.length > 0) {
		currentUrl = navstack.pop()
		$('#main-content').fadeOut(100, function() {
			$(this).load(currentUrl).hide().fadeIn(200);
		})
	}
}

window.getParameters = function() {
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	var parameters = {};
	for(var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		parameters[pair[0]] = pair[1];
	}
	return parameters;
}

$(document).ready(function() {
	navigateNoStack('start.html');
});