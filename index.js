var express = require("express");
var path = require('path');
var _ = require("underscore");
var app = express(); 
var hoganExpress = require('hogan-express');

app.engine('html', hoganExpress);
app.set('views', __dirname + '/src/views');
app.set('view engine', 'html');	

app.use('/_public', express.static(path.join(__dirname, '_public')));

var config = {
	sitetitle: "Your page title",
	defaultPage: "pages/page"
};

var pages = [{
	urlPath: "product",
	templateName: "product",
	title: "Produkt"
}, {
	urlPath: "info",
	templateName: "info",
	title: "Informasjon"
}, {
	urlPath: "",
	templateName: "main"
}];

_.each(pages, function(page) {
	app.use("/" + page.urlPath, function(req, res) {
		res.render(config.defaultPage, {
			title: page.title,
			config: config, 
			partials: {
				partial: "_parts/" + page.templateName
			}
		}); 
	});
});

app.listen(process.env.PORT || 1234, function() {
	console.log("Appen " + config.sitetitle + " kjører!");
});