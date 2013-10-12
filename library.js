var	async = require('async'),
	nconf = module.parent.require('nconf'),
	fs = require('fs'),
	path = require('path'),
	templates = module.parent.require('../public/src/templates.js');
	
var constants = Object.freeze({
	'route': '/about',
	'name': "About NodeBB"
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
				custom_routes.routes.push({
					"route": constants.route,
					"method": "get",
					"options": function(req, res, callback) {
						callback({
							req: req,
							res: res,
							route: constants.route,
							name: constants.name,
							content: template
						});
					}
				});

				callback(null, custom_routes);
			});
		}
	};

module.exports = StaticPage;
