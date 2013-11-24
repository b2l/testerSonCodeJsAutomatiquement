var expect = chai.expect;

var server = sinon.fakeServer.create();
server.autoRespond = true;
server.respondWith('GET', '/elements', [200, {
    'Content-Type': 'application/json'
}, '["elem1", "elem2", "elem3"]']);

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

    it('peut afficher la listes des éléments récupérés depuis le serveur', function(done) {
        // Given
        var list = document.getElementById('elements-list');

        setTimeout(function async() {
            expect(list.querySelectorAll('li').length).to.equal(3);
            done();
        }, 10);

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
        expect(list.querySelectorAll('li').length).to.equal(4);
        expect(input.value).to.equal("");
    });
});