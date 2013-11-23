var expect = chai.expect;
var Model = require('../../../src/js/Model');

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