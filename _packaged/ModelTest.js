;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Event Emitter : permet d'envoyer et d'ecouter des events sur des ojbets JS
var MicroEE = require('microee');

function Model(store) {
    this.store = store;
    this.elements = [];
}

// On ajoute l'Event Emitter dans notre classe (dans son prototype en fait )
MicroEE.mixin(Model);

Model.prototype.init = function() {
    this.store.findAll(this.onNewElements.bind(this));
};

Model.prototype.addElement = function(element) {
    this.elements.push(element);
    this.store.save(element);
};

Model.prototype.count = function() {
    return this.elements.length;
};

Model.prototype.findAll = function() {
    return this.elements;
};

Model.prototype.onNewElements = function(elements) {
    this.elements = elements;
    this.emit('updated', this.elements);
};

module.exports = Model;
},{"microee":3}],2:[function(require,module,exports){
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
},{"../../src/js/Model":1}],3:[function(require,module,exports){
function M() { this._events = {}; }
M.prototype = {
  on: function(ev, cb) {
    this._events || (this._events = {});
    var e = this._events;
    (e[ev] || (e[ev] = [])).push(cb);
    return this;
  },
  removeListener: function(ev, cb) {
    var e = this._events[ev] || [], i;
    for(i = e.length-1; i >= 0 && e[i]; i--){
      if(e[i] === cb || e[i].cb === cb) { e.splice(i, 1); }
    }
  },
  removeAllListeners: function(ev) {
    if(!ev) { this._events = {}; }
    else { this._events[ev] && (this._events[ev] = []); }
  },
  emit: function(ev) {
    this._events || (this._events = {});
    var args = Array.prototype.slice.call(arguments, 1), i, e = this._events[ev] || [];
    for(i = e.length-1; i >= 0 && e[i]; i--){
      e[i].apply(this, args);
    }
    return this;
  },
  when: function(ev, cb) {
    return this.once(ev, cb, true);
  },
  once: function(ev, cb, when) {
    if(!cb) return this;
    function c() {
      if(!when) this.removeListener(ev, c);
      if(cb.apply(this, arguments) && when) this.removeListener(ev, c);
    }
    c.cb = cb;
    this.on(ev, c);
    return this;
  }
};
M.mixin = function(dest) {
  var o = M.prototype, k;
  for (k in o) {
    o.hasOwnProperty(k) && (dest.prototype[k] = o[k]);
  }
};
module.exports = M;

},{}]},{},[2])
;