
/*
 * GET home page.
 */

var sites = require("../sites");


function showSite(siteID, res){
	var site = sites.sitesByID[siteID];
	if(site){
		var url = site.url;
		console.log(new Date().getTime() + " " + site.shortcuts[0]);
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
			var siteID = hostMatches[1];
			if(showSite(siteID, res)){
				return;
			}
		}

		res.render('index', { title: 'Dev Centers', sites: sites.sitesList });
	});

	app.get("/:site_id", function(req, res){
		var siteID = req.params.site_id;
		if(!showSite(siteID, res)){
			res.redirect('/');
		}
	});
};
