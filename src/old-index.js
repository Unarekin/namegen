'use strict'
/**
 * Name generator module
 * @module namegen
 */

var fs = require('fs');
var path = require('path');


module.exports = namegen;


 /**
  * Constructor
  * @constructor
  */
function namegen() {
	if (!this instanceof namegen)
		return new namegen();

	this.loadFiles();
}

/**
 * Reads in name specification files and stores them locally.
 */
namegen.prototype.loadFiles = function() {
	var files = fs.readdirSync(path.resolve("./names")).filter(function(elem) { return path.extname(elem) === '.js'; });

	var fileHash = {};

	files.forEach(function(elem) {
		var file = require(path.join(path.resolve("./names"), elem));
		fileHash[path.basename(elem, path.extname(elem)).toLowerCase()] = file;
		fileHash[file.name.toLowerCase()] = file;
	});
	this._files = fileHash;
}

/**
 * Returns true if the given template (and optional subset) is present.
 * @param {string} name - The name of the template
 * @param {string} subset - Optional, the subset (male, female, surnames, etc) to be checked for
 */
namegen.prototype.hasTemplate = function(name, subset) {
	if (subset) {
		if (this._files[name.toLowerCase()] && this._files[name.toLowerCase()].subsets[subset.toLowerCase()])
			return true;
		else
			return false;
	} else {
		return this._files.hasOwnProperty(name.toLowerCase());
	}
}



/**
 * Retrieves the content of a particular subset.
 * @param {string} template - The template to load
 * @param {string} subset - The subset to load
 */
namegen.prototype.getSubset = function(template, subset) {
	if (this.hasTemplate(template, subset)) {
		return this._files[template.toLowerCase()].subsets[subset.toLowerCase()];
	} else {
		throw new Error("Unknown template and/or subset: " + template + "/" + subset);
	}
}



/**
 * Generates a name in the given style.
 * @param {string} template - The template to utilize (Modern Greek, Spanish, etc)
 * @param {string} subset - The subset to use (female, male, surnames)
 * @returns {strinmg} Generated name
 */
namegen.prototype.generateName = function(template, subset) {
	var name = "";
	var names = this.getSubset(template, subset);

	name = randomElement(names).trim().substr(0,2);

	var keepGoing = true;

	var flatNames = names.join(" ").replace("  ", " ");

	do {

		let diphthong = name.substr(-2);
		let reg = new RegExp(diphthong + "(.)", "gi");
		let matches = flatNames.match(reg);
		let next = randomElement(matches);
		var nextChar = next.substr(-1);
		if (nextChar === " ")
			keepGoing = false;
		else
			name += nextChar;

	} while (keepGoing);
	return name;
}

function randomElement(list) {
	return list[Math.floor(Math.random() * list.length)];
}