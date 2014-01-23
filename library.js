var	fs = require('fs'),
	path = require('path'),
	async = require('async'),
	templates = module.parent.require('../public/src/templates.js');
	
var constants = Object.freeze({
	'gallery': [
		{
			image: "http://designcreateplay.com/portfolio/work/nodebb1.png",
			thumb: "http://designcreateplay.com/portfolio/work/nodebb1_thumb.png"
		},
		{
			image: "http://designcreateplay.com/portfolio/work/nodebb2.png",
			thumb: "http://designcreateplay.com/portfolio/work/nodebb2_thumb.png"
		},
		{
			image: "http://designcreateplay.com/portfolio/work/nodebb3.png",
			thumb: "http://designcreateplay.com/portfolio/work/nodebb3_thumb.png"
		},
		{
			image: "http://designcreateplay.com/portfolio/work/nodebb4.png",
			thumb: "http://designcreateplay.com/portfolio/work/nodebb4_thumb.png"
		},
		{
			image: "http://designcreateplay.com/portfolio/work/nodebb5.png",
			thumb: "http://designcreateplay.com/portfolio/work/nodebb5_thumb.png"
		},
		{
			image: "http://designcreateplay.com/portfolio/work/nodebb6.png",
			thumb: "http://designcreateplay.com/portfolio/work/nodebb6_thumb.png"
		},
		{
			image: "http://designcreateplay.com/portfolio/work/nodebb7.png",
			thumb: "http://designcreateplay.com/portfolio/work/nodebb_thumb7.png"
		}
	]
});


var StaticPage = {
	routes: {},
	templates: {}
};

StaticPage.addNavigation = function(custom_header, callback) {
	custom_header.navigation = custom_header.navigation.concat(
		[
			{
				"class": "",
				"route": '/about',
				"text": "About NodeBB"
			},
			{
				"class": "",
				"route": '/help',
				"text": "Help"
			}
		]
	);

	return custom_header;
};

StaticPage.addRoute = function(custom_routes, callback) {
	var templatesToLoad = ["about.tpl", "help.tpl"];

	function loadTemplate(template, next) {
		fs.readFile(path.resolve(__dirname, './static/templates/' + template), function (err, data) {
			StaticPage.templates[template] = data.toString();
			next(err);
		});
	}

	async.each(templatesToLoad, loadTemplate, function(err) {
		if (err) {
			throw new Error("Error loading templates: "  + err);
		}

		custom_routes.routes = custom_routes.routes.concat(
			[
				{
					"route": '/about',
					"method": "get",
					"options": StaticPage.routes.about
				}
			],
			[
				{
					"route": "/help",
					"method": "get",
					"options": StaticPage.routes.help
				}
			]
		);

		callback(err, custom_routes);
	});
};


StaticPage.routes.about = function(req, res, callback) {
	var content = templates.prepare(StaticPage.templates['about.tpl']).parse({
		gallery: constants.gallery
	});

	callback({
		content: content
	});
};

StaticPage.routes.help = function(req, res, callback) {
	var content = templates.prepare(StaticPage.templates['help.tpl']).parse({
		help_content: "Here's some default help content"
	});

	callback ({
		content: content
	})
};

module.exports = StaticPage;
