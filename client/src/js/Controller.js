// Gestion d'Evenement
var MicroEE = require('microee');

// Les dépendance
var View = require('./View');
var Model = require('./Model');
var Store = require('./Store');

// Constructeur
function Controller() {
    this.model = new Model(new Store());
    this.view = new View();
}

// Gestion d'Evenement
MicroEE.mixin(Controller);

Controller.prototype.init = function() {
    this.view.init(this);
    this.model.init();
    this.view.renderElements(this.model.findAll());

    // Liens vue <-> model
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