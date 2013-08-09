var fs = require("fs");

var sitesFilenames = fs.readdirSync("sites");
var sites = [];
for(var idx = 0; idx < sitesFilenames.length; idx++){
	var siteFilename = sitesFilenames[idx];
	var siteData = fs.readFileSync("sites/" + siteFilename);
	var site = JSON.parse(siteData);
	sites.push(site);
}

var sitesJSON = JSON.stringify({sites: sites});
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