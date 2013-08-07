var sites = require("./sites");
var async = require("async");
var request = require("request");

var allURLs = [];
var allSiteIDs = [];

var failedSites = [];

var testedCount = 0;

async.forEach(sites.sitesList, function(site, cb){
	var iterationIndex = (++testedCount)

	var failed = false;
	if(allURLs.indexOf(site.url) != -1){
		console.log("URL '" + site.url + "' for site '" + site.name + "'' exists");
		failedSites.push(site);
		failed = true;
	}else{
		allURLs.push(site.url);
		for(var shortcutIdx = 0; shortcutIdx < site.shortcuts.length; shortcutIdx++){
			var shortcut = site.shortcuts[shortcutIdx];
			if(allSiteIDs.indexOf(shortcut) != -1){
				console.log("Shortcut '" + shortcut + "' for site '" + site.name + "'' exists");
				failedSites.push(site);
				failed = true;
				break;
			}else{
				allSiteIDs.push(shortcut);
			}
		}
	}

	if(!failed){
		var loaded = false;
		// console.log("Testing " + iterationIndex + " of " + sites.sitesList.length + ": " + site.name + " " + site.url);
		request.get(site.url, {rejectUnauthorized: false}, function(err, meta, body){
			meta = meta || {};
			if(err || meta.statusCode > 399){
				console.log("Site '" + site.name + "' could not be loaded from " + site.url + ": ", meta.statusCode + " " + err);
				failedSites.push(site);
				failed = true;
			}

			if(!loaded){
				loaded = true;

				if(!failed){
					// console.log(iterationIndex + "/" + sites.sitesList.length + " Site '" + site.name + "' succeeded");
				}

				cb(true);
			}
		});
	}else{
		cb(true);
	}
}, function(){
	// console.log("Sites done. Failed: ", failedSites.length);
});