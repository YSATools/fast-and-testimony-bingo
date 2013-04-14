(function () {
  "use strict";

  var clichés = require('./cliches')
    , shuffle = require('./fisher-yates')
    , free = "I know the Gospel is true (FREE)"
    , max = 25
    ;

  function addPage(addSquare) {
    var i = 0
      ;

    clichés = shuffle(clichés);

    for (i; i < max; i += 1) {
      if (12 === i) {
        addSquare(free);
        continue;
      }
      addSquare(clichés[i], i);
    }
  }

  module.exports.addPage = addPage;
}());
