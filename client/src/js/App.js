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

