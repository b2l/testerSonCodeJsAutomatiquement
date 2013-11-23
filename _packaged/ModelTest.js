;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Model() {
    this.elements = [];
}

Model.prototype.findAll = function() {
    return this.elements;
};

Model.prototype.addElement = function(element) {
    this.elements.push(element);
};

module.exports = Model;
},{}],2:[function(require,module,exports){
var expect = chai.expect;
var Model = require('../../src/js/Model');

describe('Model', function() {

    it('doit être permettre d\'ajouter puis récupérer un élément', function() {
        // Given
        var model = new Model();

        // When
        model.addElement("nouvel élément");
        var allElements = model.findAll();

        // Then
        expect(allElements.length).to.equal(1);
        expect(allElements[0]).to.equal("nouvel élément");
    });

});
},{"../../src/js/Model":1}]},{},[2])
;