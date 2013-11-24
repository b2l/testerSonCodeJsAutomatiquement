var expect = chai.expect;
var Model = require('../../src/js/Model');
var Store = require('../../src/js/Store');
var sinon = require('sinon');

describe('Model', function() {

    it('doit être permettre d\'ajouter puis récupérer un élément', function() {
        // Given
        var store = new Store();
        var model = new Model(store);
        var mock = sinon.mock(store);
        mock.expects('save').once();

        // When
        model.addElement("nouvel élément");
        var allElements = model.findAll();

        // Then
        expect(mock.verify()).to.be.true;
        expect(allElements.length).to.equal(1);
        expect(allElements[0]).to.equal("nouvel élément");
    });

    it('doit être possible de récupérer les éléments déjà existant', function() {
        // Given
        var store = new Store();
        var model = new Model(store);

        var expectedElements = [
            'toto',
            'tata',
            'titi'
        ];

        // On pourrait aussi faire un clone de l'array avec :
        // var response = expectedElements.slice(0);
        var response = [
            'toto',
            'tata',
            'titi'
        ];

        sinon.stub(store,'findAll').yields(response);

        // When
        model.init();
        var allElements = model.findAll();

        // Then
        expect(allElements.length).to.equal(3);
        expect(allElements).to.deep.equal(expectedElements);
    });
});
