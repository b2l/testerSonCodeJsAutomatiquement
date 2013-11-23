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