var expect = chai.expect;

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
        expect(list.querySelectorAll('li').length).to.equal(4);
        expect(input.value).to.equal("");
    });
});