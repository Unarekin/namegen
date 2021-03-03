import { assert } from 'chai';
import { NameGenerator } from '../src';
// import namegen from '../src';
// import { namegen } from '../src';

describe("Name Generator", () => {
  const generator = new NameGenerator();

  function generateTemplateTest(template: string, subsets: string[]) {
    it(template, () => {
      for (let i = 0; i < subsets.length; i++) {
        assert.isString(generator.GenerateName(template, subsets[i]), `Unable to generate a ${subsets[i]} name.`);
      }
    });
  }

  describe("Generates Names", () => {
    assert.throws(() => generator.GenerateName("unknown", "template"), "Unknown template: unknown");
    assert.throws(() => generator.GenerateName("ancient greek", "unknown"), "Unknown subset: unknown");
    assert.throws(() => generator.GenerateName({ name: 'Test', subsets: { 'test': [] } }, "unknown"), "Unknown subset: unknown");

    generateTemplateTest("Ancient Greek", ["female", "male"]);
    generateTemplateTest("Arabic", ["female", "male", "surnames"]);
    generateTemplateTest("Basque", ["female", "male"]);
    generateTemplateTest("Celtic", ["female", "male"]);
    generateTemplateTest("English", ["female", "male", "surnames"]);
    generateTemplateTest("Hindi", ["female", "male"]);
    generateTemplateTest("Japanese", ["female", "male"]);
    generateTemplateTest("Latvian", ["female", "male"]);
    generateTemplateTest("Modern Greek", ["female", "male", "surnames"]);
    generateTemplateTest("Spanish", ["female", "male"]);
    generateTemplateTest("Thai", ["female", "male"]);
  })
});

// 'use strict'
// var assert = require('assert');
// var namegen = require('../');

// describe('Name generator', function() {
// 	var generator;

// 	before(function() {
// 		generator = new namegen();
// 	});

// 	it("Has templates loaded", function() {
// 		assert.notEqual(Object.keys(generator).length, 0);
// 	});





// 	it("Can find templates", function() {
// 		//var templates = Object.keys(generator._files).map(function(elem) { return [elem]; });


// 		var templates = [];
// 		Object.keys(generator._files).forEach(function(elem) {
// 			templates.push([elem]);
// 			for (var key in generator._files[elem].subsets)
// 				templates.push([elem, key]);
// 		});	


// 		var templatesFound = 0;
// 		templates.forEach(function(elem) {
// 			if (generator.hasTemplate.apply(generator, elem))
// 				templatesFound++;
// 		});

// 		this.test.title = "Can find templates: " + templatesFound + "/" + templates.length;

// 		assert.equal(templatesFound, templates.length);
// 	});

// 	it("Does not find nonexistent templates", function() {
// 		assert.equal(generator.hasTemplate("poweihfpoiewhf"), false);
// 	});

// 	it("Can load templates", function() {
// 		var loaded = 0;
// 		var count = 0;
// 		Object.keys(generator._files).forEach(function(elem) {
// 			for (var key in generator._files[elem].subsets) {
// 				count++;

// 				var names = generator.getSubset(elem, key);
// 				loaded++;
// 			}
// 		});

// 		this.test.title += ": " + loaded + "/" + count;
// 	});


// 	describe("Generating names", function() {
// 		var generator = new namegen();

// 		for (var i=0;i<5;i++) {
// 			it("generating", function() {
// 				var name = generator.generateName("English", "Male");
// 				this.test.title = name;
// 			});
// 		}

// 	});
// });