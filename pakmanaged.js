var global = Function("return this;")();
/*!
  * Ender: open module JavaScript framework (client-lib)
  * copyright Dustin Diaz & Jacob Thornton 2011 (@ded @fat)
  * http://ender.no.de
  * License MIT
  */
!function (context) {

  // a global object for node.js module compatiblity
  // ============================================

  context['global'] = context

  // Implements simple module system
  // losely based on CommonJS Modules spec v1.1.1
  // ============================================

  var modules = {}
    , old = context.$

  function require (identifier) {
    // modules can be required from ender's build system, or found on the window
    var module = modules[identifier] || window[identifier]
    if (!module) throw new Error("Requested module '" + identifier + "' has not been defined.")
    return module
  }

  function provide (name, what) {
    return (modules[name] = what)
  }

  context['provide'] = provide
  context['require'] = require

  function aug(o, o2) {
    for (var k in o2) k != 'noConflict' && k != '_VERSION' && (o[k] = o2[k])
    return o
  }

  function boosh(s, r, els) {
    // string || node || nodelist || window
    if (typeof s == 'string' || s.nodeName || (s.length && 'item' in s) || s == window) {
      els = ender._select(s, r)
      els.selector = s
    } else els = isFinite(s.length) ? s : [s]
    return aug(els, boosh)
  }

  function ender(s, r) {
    return boosh(s, r)
  }

  aug(ender, {
      _VERSION: '0.3.6'
    , fn: boosh // for easy compat to jQuery plugins
    , ender: function (o, chain) {
        aug(chain ? boosh : ender, o)
      }
    , _select: function (s, r) {
        return (r || document).querySelectorAll(s)
      }
  })

  aug(boosh, {
    forEach: function (fn, scope, i) {
      // opt out of native forEach so we can intentionally call our own scope
      // defaulting to the current item and be able to return self
      for (i = 0, l = this.length; i < l; ++i) i in this && fn.call(scope || this[i], this[i], i, this)
      // return self for chaining
      return this
    },
    $: ender // handy reference to self
  })

  ender.noConflict = function () {
    context.$ = old
    return this
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = ender
  // use subscript notation as extern for Closure compilation
  context['ender'] = context['$'] = context['ender'] || ender

}(this);
// pakmanager:fast-and-testimony-bingo/lib/cliches
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  (function () {
      "use strict";
    
      var playful
        ;
    
      playful = [
          'odd use of "even"'
        , "on my mission..."
        , "experienced a tender mercy"
        , "good joke"
        , "good analogy"
        , "the regular"
        , "the visitor"
        , "first timer"
        , "first time in a long timer"
        , "sports movie metaphor"
        , "I'll go if you go"
        , "mad dash for first"
        , "no one got up for 15 seconds"
        , "accidental 'thy son'"
        , "story about young women's"
        , "story about boyscouts"
        , "Bishopric member dozes off"
        , "meeting goes into overtime (or ends early)"
        , "tear jerker"
        , "grabbed a tissue"
        , "cites a scripture"
        , "cites general conference"
        , "cites children's hymn"
        , "cites a sunbeams lesson"
        , "cites C.S. Lewis"
        , "I'm so grateful that..."
        , "I would be remiss..."
        , "For those who don't know me..."
      ];
    
      // http://emp.byui.edu/marrottr/testimonyBingo.html
      // http://byucreativewriting.blogspot.com/2011/06/testimony-bingo.html
      // https://docs.google.com/file/d/0B2ssnXrMkI_iSmhmOU5IT3hSSVM0YXUzVXhGYjVjQQ/edit
      module.exports = playful;
    }());
    
  provide("fast-and-testimony-bingo/lib/cliches", module.exports);
}(global));

// pakmanager:fast-and-testimony-bingo/lib/fisher-yates
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  (function () {
      "use strict";
    
      function shuffle(array) {
        var m = array.length, t, i;
    
        // While there remain elements to shuffle…
        while (m) {
    
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
    
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
    
        return array;
      }
    
      module.exports = shuffle;
    }());
    
  provide("fast-and-testimony-bingo/lib/fisher-yates", module.exports);
}(global));

// pakmanager:fast-and-testimony-bingo/lib/pagitator
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  (function () {
      "use strict";
    
      var clichés =  require('fast-and-testimony-bingo/lib/cliches')
        , shuffle =  require('fast-and-testimony-bingo/lib/fisher-yates')
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
    
  provide("fast-and-testimony-bingo/lib/pagitator", module.exports);
}(global));

// pakmanager:fast-and-testimony-bingo
(function (context) {
  
  var module = { exports: {} }, exports = module.exports
    , $ = require("ender")
    ;
  
  (function () {
      "use strict";
    
      var pagitator =  require('fast-and-testimony-bingo/lib/pagitator')
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
    
  provide("fast-and-testimony-bingo", module.exports);
}(global));