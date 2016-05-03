module.exports = (function() {

  "use strict";

  const Nodal = require('nodal');

  class CreateCards extends Nodal.Migration {

    constructor(db) {
      super(db);
      this.id = 2016050203230180;
    }

    up() {

      return [
        this.createTable("cards", [
          {"name":"user_id","type":"int"},
          {"name":"icon", "type":"string"},
          {"name":"url", "type":"string"},
          {"name":"highlight", "type":"string"},
        ])
      ];

    }

    down() {

      return [
        this.dropTable("cards")
      ];

    }

  }

  return CreateCards;

})();
