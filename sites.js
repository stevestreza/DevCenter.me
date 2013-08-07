var fs = require("fs");

var sitesJSON = fs.readFileSync("sites.json");
var sites = JSON.parse(sitesJSON).sites;
var sitesByID = {};

for(var idx = 0; idx < sites.length; idx++){
	var site = sites[idx];
	var shortcuts = site["shortcuts"];

	site["id"] = shortcuts[0];

	for(var idIdx = 0; idIdx < shortcuts.length; idIdx++){
		sitesByID[shortcuts[idIdx]] = site;
	}
}

 var sortedSites = sites.sort(function(a, b){
	var aKey = (a.sortKey || a.name).toLowerCase();
	var bKey = (b.sortKey || b.name).toLowerCase();
	return aKey > bKey ? 1 : -1;
});

exports.sitesList = sortedSites;
exports.sitesByID = sitesByID;
exports.sitesJSON = sitesJSON;