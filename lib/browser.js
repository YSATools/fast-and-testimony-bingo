(function () {
  "use strict";

  var pagitator = require('./pagitator')
    , $ = require('jQuery')
    , tpl
    ;

  function createPages(n) {
    function squaritator(str, i) {
      var square = $('<div class="js-square square"><p>' + str + '</p></div>')
        ;
      
      page.find('.js-square-container').append(square);

      if (4 === i % 5) {
        page.find('.js-square-container').append('<div style="clear: both;"></div>');
      }
    }

    var page
      , i
      ;

    for (i = 0; i < n; i += 1) {
      page = $(tpl);
      pagitator.addPage(squaritator);
      $('.js-pages').append(page);
    }
  }

  $(function () {
    $('.js-square-container').html('');
    tpl = $('.js-pages').html();
    $('.js-pages').html('');

    $('body').on('change', '.js-number-pages', function (ev) {
      ev.preventDefault();
      ev.stopPropagation();

      var numPages = $('.js-number-pages').val()
        , pages = $('.js-page')
        , diff = Number(numPages) - pages.length
        ;

      console.info('numPages', numPages);
      console.info('diff', diff);

      if (diff >= 0) {
        createPages(diff);
        return;
      }

      [].slice.call(pages, pages.length + diff, pages.length).forEach(function (el) {
        $(el).remove();
      });
    });

    createPages(Number($('.js-number-pages').val()));
  });
}());
