module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Card = Nodal.require('app/models/card.js');
  const Snippet = Nodal.require('app/models/snippet.js');

  class V1CardsController extends Nodal.Controller {

    index() {

      var tag = 'agular';
      console.log('--> this is the query', this.params.query);
      Card.query()
        .join('snippets')
        .join('cardTags__tag')
        // .where({ cardTags__tag__name: 'react', cardTags__tag__name: 'angular' })
        // .where(this.params.query)
        .end((err, cards) => {

          // cards[0].joined('snippets')

          // cards[0].joined('cardTags')
          this.respond( err || cards, ['id', 'url', {snippets: ['content']}, {cardTags: [{tag: ['name']}]}]);
          // this.respond( err || cards, ['id', 'url', {snippets: ['id', 'content']}, {cardTags: ['id', {tag: 'name'}]} ]);

          // this.respond( err || cards, ['url', {cardTags: ['tag']}] );
          // this.respond( err || cards, ['id', 'url', {cardTags: [{ tag: ['id','name']}]}] );

        });

    }

    show() {

      Card.find(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

    create() {

      Card.create(this.params.body.card, (err, card) => {

        if (err) this.respond(err);

        let card_id = card._data.id;
        let reqBody = this.params.body;
        let snippets = reqBody.snippets;
        let snippetRecords = [];


        snippets.forEach((snippet) => {

          let snippetBody = {card_id: card_id, content: snippet.content};
          Snippet.create(snippetBody, (err, snippet) => {
            if (err) this.respond(err);
            snippetRecords.push(snippet);
          });

        });

        this.respond([ card, snippetRecords ]);

      });
    }

    update() {

      Card.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      Card.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1CardsController;

})();
