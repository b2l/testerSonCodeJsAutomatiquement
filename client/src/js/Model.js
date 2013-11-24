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