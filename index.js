var express = require("express");
var path = require('path');
var _ = require("underscore");
var app = express(); 
var hoganExpress = require('hogan-express');

app.engine('html', hoganExpress);
app.set('views', __dirname + '/src/templates');
app.set('view engine', 'html');	

app.use('/_public', express.static(path.join(__dirname, '_public')));

var config = {
	sitetitle: "Silder"
};

var pages = [{
	urlName: "product",
	templateName: "product",
	title: "Produkt"
}, {
	urlName: "info",
	templateName: "info",
	title: "Informasjon"
}];

_.each(pages, function(page) {
	app.use("/" + page.urlName, function(req, res) {
		res.render("page", {
			title: page.title,
			config: config, 
			partials: {
				partial: "_pages/" + page.templateName
			}
		}); 
	});
});

app.use("/", function(req, res) {
	res.render("page", {
		title: null,
		config: config, 
		partials: {
			partial: "_pages/index"
		}
	});
});

app.listen(process.env.PORT || 1234, function() {
	console.log("Appen " + config.sitetitle + " kjører!");
});