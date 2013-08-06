var fs = require("fs");

var sites = JSON.parse(fs.readFileSync("sites.json")).sites;
var sitesByID = {};

for(var idx = 0; idx < sites.length; idx++){
	var site = sites[idx];
	var shortcuts = site["shortcuts"];

	site["id"] = shortcuts[0];

	for(var idIdx = 0; idIdx < shortcuts.length; idIdx++){
		sitesByID[shortcuts[idIdx]] = site;
	}
}

sites = sites.sort(function(a, b){
	var aKey = a.sortKey || a.name;
	var bKey = b.sortKey || b.name;
	return aKey > bKey;
});

exports.sitesList = sites;
exports.sitesByID = sitesByID;