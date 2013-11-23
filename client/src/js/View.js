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