
/*
 * GET home page.
 */

var sites = require("../sites");
var winston = require("winston");
var util = require("util");

var siteLogger = new winston.Logger({
	transports: [
		new winston.transports.File({filename: "shortcuts.log", json: false})
	]
});

function showSite(siteID, req, res){
	var site = sites.sitesByID[siteID];
	if(site){
		var url = site.url;
		siteLogger.info(site.shortcuts[0] + " " + (req.connection.remoteAddress || req.headers["x-real-ip"]));
		res.redirect(url);
		return true;
	}else{
		return false;
	}
}

exports.setup = function(app) {
	app.get("/", function(req, res){
		var host = req.headers.host;
		var hostMatches = host.match(/(.*)\.devcenter.(dev|me)/);
		if(hostMatches && hostMatches.length > 1){
			var siteID = hostMatches[1].toLowerCase();
			if(showSite(siteID, req, res)){
				return;
			}
		}

		res.render('index', { title: 'Dev Centers', sites: sites.sitesList });
	});

	app.get("/:site_id", function(req, res){
		var siteID = req.params.site_id.toLowerCase();
		if(!showSite(siteID, req, res)){
			res.redirect('/');
		}
	});
};
