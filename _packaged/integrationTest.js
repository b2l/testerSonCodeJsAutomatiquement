;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Lancement de l'appli

var View = require('./View');
var Model = require('./Model');
var Controller = require('./Controller');

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        if (!document.getElementById('wrapper')) {
            var wrapper = document.createElement('div');
            wrapper.setAttribute('id', 'wrapper');
            document.body.appendChild(wrapper);
        }
        new Controller().init();
    }
};


},{"./Controller":2,"./Model":3,"./View":4}],2:[function(require,module,exports){
var MicroEE = require('microee');
var View = require('./View');
var Model = require('./Model');


function Controller() {
    this.model = new Model();
    this.view = new View();
}

MicroEE.mixin(Controller);

Controller.prototype.init = function() {
    this.view.init(this);
    this.model.init();
    this.view.renderElements(this.model.findAll());

    this.view.on('newElement', this.newElement.bind(this));
    this.model.on('updated', this.modelUpdated.bind(this));
};

Controller.prototype.modelUpdated = function(elements) {
    this.view.renderElements(elements);
};

Controller.prototype.newElement = function(value) {
    
    var valueToAdd = value.trim();
    if(valueToAdd.length > 0) {
        this.model.addElement(valueToAdd);
        this.view.renderElements(this.model.findAll());
    }
};

module.exports = Controller;
},{"./Model":3,"./View":4,"microee":6}],3:[function(require,module,exports){
function Model() {
    this.elements = [];
}

Model.prototype.init = function() {};

Model.prototype.findAll = function() {
    return this.elements;
};

Model.prototype.addElement = function(element) {
    this.elements.push(element);
};

module.exports = Model;
},{}],4:[function(require,module,exports){
var MicroEE = require('microee');

function View() {}

MicroEE.mixin(View);

View.prototype.init = function() {

    this.container = document.getElementById('wrapper');

    // Crée l'input
    this.input = document.createElement('input');
    this.input.setAttribute('id', 'ajouter-element-input');
    this.input.setAttribute('type', 'text');
    this.input.setAttribute('placeholder', 'Nouvel élément');
    this.input.setAttribute('id', 'ajouter-element-input');
    this.container.appendChild(this.input);

    // Crée le bouton
    this.button = document.createElement('button');
    this.button.innerHTML = "Ajouter";
    this.button.setAttribute('id', 'ajouter-element-button');
    this.container.appendChild(this.button);

    // Crée la liste
    this.list = document.createElement('ul');
    this.list.setAttribute('id', 'elements-list');
    this.container.appendChild(this.list);


    // Gestions des events
    this.button.addEventListener('click', this.onSubmit.bind(this));
};

View.prototype.renderElements = function(elements) {
    this.list.innerHTML = "";

    elements.forEach(function(element) {
        var li = document.createElement('li');
        li.innerHTML = element;
        this.list.appendChild(li);
    }, this);
};

View.prototype.onSubmit = function(e) {
    e.preventDefault();
    this.emit('newElement', this.input.value);
    this.input.value = "";
};

module.exports = View;
},{"microee":6}],5:[function(require,module,exports){
var expect = chai.expect;
require('../../src/js/App.js');

describe('Notre projet', function() {

    before(function(done) {
        setTimeout(function checkIfAppIsRunning() {
            if (!document.getElementById('wrapper')) {
                setTimeout(checkIfAppIsRunning, 1);
            } else {
                done();
            }
        }, 1);
    });

    it('peut ajouter un élément dans la liste', function() {
        // Given
        var button = document.getElementById('ajouter-element-button');
        var input = document.getElementById('ajouter-element-input');
        input.value = "mon nouvel élément";

        // When
        button.click();

        // Then
        var list = document.getElementById('elements-list');
        expect(list.querySelectorAll('li').length).to.equal(1);
        expect(input.value).to.equal("");
    });
});
},{"../../src/js/App.js":1}],6:[function(require,module,exports){
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

},{}]},{},[5])
;