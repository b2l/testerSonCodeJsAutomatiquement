# Tester son code JS dans tous les navigateurs... automatiquement !#


> [Nicolas MEDDA](http://github.com/b2l) et [Christophe PROMÉ](http://github.com/chprome)

*Slides disponibles [ici](http://b2l.github.io/confJs)*

## Prérequis ##

**Outils à installer**

 * [node.js & npm](http://nodejs.org)
 * [DalekJS](http://dalekjs.com)
 * [PhantomJS](http://phantomjs.org)
 * [SlimerJS](http://slimerjs.org/)
 * [Karma](http://karma-runner.github.io)
 * [CasperJS](http://casperjs.org)

**Récupérer le projet et installer les dépendences**

```
git clone git@github.com:chprome/conf-tester-son-js.git
cd conf-tester-son-js
npm install
```

## Exécuter les tests ##

### unitaires ###

Testem : ```testem -f test/unit/testem.json```

Karma : ```karma start test/unit/karma.conf.js```

### d'intégration ###

TODO

### d'interface ###

Dalek : ```dalek -b chrome test/UI/dalek.js ```

CasperJS + PhantomJS : ```casperjs test test/UI/casper.js --engine=phantomjs```

CasperJS + SlimerJS : ```casperjs test test/UI/casper.js --engine=slimerjs```

