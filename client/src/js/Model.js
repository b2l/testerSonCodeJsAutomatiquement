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