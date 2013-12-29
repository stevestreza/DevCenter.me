var mocha = require("mocha");
var assert = require("assert");
var fs = require("fs");

describe('Sites', function () {
	var sitesFilenames = fs.readdirSync("sites");
	var sites = [];
	sitesFilenames.forEach(function (filename) {
		if(filename.substr(-5) === ".json"){
			var data = fs.readFileSync("sites/" + filename);
			sites.push({"name": filename.replace(".json", ""), "data" : data});
		}
	});

	describe('JSON', function () {
		sites.forEach(function (site) {
			it(site.name + ' should be valid', function () {
				var data;
				try {
					data = JSON.parse(site.data);
				} catch (e) {
					data = false;
				}

				assert.equal(typeof data, "object", "parsed as valid JSON");
			});
		});
	});

	sites.forEach(function (site, index) {
		var data;
		try {
			data = JSON.parse(site.data);
			site.object = data;
			sites[index] = site;
		} catch (e) {}
	});

	describe('Fields', function () {

		function checkField (site, field, type){
			it(site.name + ' should have ' + field, function () {
				assert(field in site.object, "object has field");
			});

			it(site.name + '[' + field + '] should be the correct type' , function () {
				assert.equal(typeof site.object[field], type, "field has correct type");
			});
		}

		sites.forEach(function (currentSite) {
			checkField(currentSite, "id", "string");
			checkField(currentSite, "name", "string");
			checkField(currentSite, "url", "string");
			
			it(currentSite.name + '[url] should be a url' , function () {
				// modified slightly from node-validator - https://github.com/chriso/node-validator
				var isUrl = currentSite.object.url.length < 2083 && currentSite.object.url.match(/^(?!(mailto|tel):)(?:(?:https?):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))))(?::\d{2,5})?(?:\/[^\s]*)?$/i);

				assert(isUrl, "is a url");
			});

			checkField(currentSite, "shortcuts", "object");
		});
	});

	describe('Uniqueness', function () {
		var ids = [];
		var shortcuts = [];
		var urls = [];

		sites.forEach(function (site) {
			if(site.object){
				ids.push(site.object.id);
				shortcuts = shortcuts.concat(site.object.shortcuts);
				urls.push(site.object.url);
			}else{
				console.log(site.name);
			}
		});

		describe('id should be unique', function () {
			sites.forEach(function (site) {
				it(site.name + ' should be have a unique id (' + site.object.id + ')', function () {
					var matches = ids.filter(function (id) {
						return (id === site.object.id);
					});

					assert.equal(matches.length, 1, "only one object with the id");
				});
			});
		});

		describe('shortcuts should be unique', function () {
			sites.forEach(function (site) {
				site.object.shortcuts.forEach(function (shortcut) {
					it(site.name + ' should be have unique shortcuts (' + shortcut + ')', function () {
						var matches = shortcuts.filter(function (potentialShortcut) {
							return (potentialShortcut === shortcut);
						});

						assert.equal(matches.length, 1, "only one object with the shortcut");
					});
				});
			});
		});

		describe('url should be unique', function () {
			sites.forEach(function (site) {
				it(site.name + ' should be have a unique url (' + site.object.url + ')', function () {
					var matches = urls.filter(function (url) {
						return (url === site.object.url);
					});

					assert.equal(matches.length, 1, "only one object with the url");
				});
			});
		});
	});
});