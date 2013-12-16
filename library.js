var	fs = require('fs'),
	path = require('path'),
	templates = module.parent.require('../public/src/templates.js');
	
var constants = Object.freeze({
	'route': '/about',
	'name': "About NodeBB",
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
		addNavigation: function(custom_header, callback) {
			custom_header.navigation.push({
				"class": "",
				"route": constants.route,
				"text": constants.name
			});

			return custom_header;
		},
		addRoute: function(custom_routes, callback) {
			fs.readFile(path.resolve(__dirname, './static/about.tpl'), function (err, template) {
				var content = templates.prepare(template.toString()).parse({
					gallery: constants.gallery
				});

				custom_routes.routes.push({
					"route": constants.route,
					"method": "get",
					"options": function(req, res, callback) {
						callback({
							req: req,
							res: res,
							route: constants.route,
							name: constants.name,
							content: content
						});
					}
				});

				callback(null, custom_routes);
			});
		}
	};

module.exports = StaticPage;
