// Adapted from code by Matt Walters https://www.mattwalters.net/posts/2018-03-28-hugo-and-lunr/
// Modified to use a Web Worker to prevent UI blocking during index generation

(function ($) {
  'use strict';

  $(document).ready(function () {
    const $searchInput = $('.td-search input');

    $searchInput.on('change', (event) => {
      render($(event.target));
      $(event.target).blur();
    });

    $searchInput.closest('form').on('submit', () => {
      return false;
    });

    let searchResults = []; 
    let resultDetails = new Map();
    let indexReady = false;
    let pendingSearchInput = null;

    // Find the loaded lunr script to pass to the worker
    const lunrSrc = $('script[src*="lunr"]').attr('src');
    if (!lunrSrc) {
      console.error("Lunr source not found!");
      return;
    }
    const lunrUrl = new URL(lunrSrc, document.baseURI).href;
    const indexSrc = $searchInput.first().data('offline-search-index-json-src');
    
    // Create the Web Worker using a Blob URL
    const workerCode = `
      // Load lunr dynamically into the worker
      importScripts('${lunrUrl}');
      let idx = null;
      let resultDetails = new Map();
      
      onmessage = function(e) {
        if (e.data.type === 'init') {
          fetch(e.data.indexSrc)
            .then(response => response.json())
            .then(data => {
              idx = lunr(function () {
                this.ref('ref');
                // Weights and fields match the default Docsy configuration
                this.field('title', { boost: 5 });
                this.field('categories', { boost: 3 });
                this.field('tags', { boost: 3 });
                this.field('description', { boost: 2 });
                this.field('body');

                data.forEach((doc) => {
                  this.add(doc);
                  resultDetails.set(doc.ref, {
                    title: doc.title,
                    excerpt: doc.excerpt,
                  });
                });
              });
              
              postMessage({ type: 'ready', resultDetails: Array.from(resultDetails.entries()) });
            })
            .catch(err => console.error("Search index failed to build:", err));
        } else if (e.data.type === 'search') {
          if (!idx) return;
          const searchQuery = e.data.query;
          const maxResults = e.data.maxResults;
          
          const results = idx.query((q) => {
            const tokens = lunr.tokenizer(searchQuery.toLowerCase());
            tokens.forEach((token) => {
              const queryString = token.toString();
              q.term(queryString, { boost: 100 });
              q.term(queryString, { wildcard: lunr.Query.wildcard.LEADING | lunr.Query.wildcard.TRAILING, boost: 10 });
              q.term(queryString, { editDistance: 2 });
            });
          }).slice(0, maxResults);
          
          postMessage({ type: 'results', results: results });
        }
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    let currentActiveInput = null;

    worker.onmessage = function(e) {
      if (e.data.type === 'ready') {
        resultDetails = new Map(e.data.resultDetails);
        indexReady = true;
        if (pendingSearchInput) {
          triggerSearch(pendingSearchInput);
          pendingSearchInput = null;
        }
      } else if (e.data.type === 'results') {
        searchResults = e.data.results;
        if (currentActiveInput) {
          renderActual(currentActiveInput, searchResults);
        }
      }
    };

    // Initialize the background worker with the JSON index path
    worker.postMessage({
      type: 'init',
      indexSrc: new URL(indexSrc, document.baseURI).href
    });

    const triggerSearch = ($targetSearchInput) => {
      const searchQuery = $targetSearchInput.val();
      if (searchQuery === '') return;
      
      currentActiveInput = $targetSearchInput;
      worker.postMessage({
        type: 'search',
        query: searchQuery,
        maxResults: $targetSearchInput.data('offline-search-max-results')
      });
    };

    const render = ($targetSearchInput) => {
      if (!indexReady) {
        pendingSearchInput = $targetSearchInput; 
        return;
      }
      triggerSearch($targetSearchInput);
    };

    const renderActual = ($targetSearchInput, results) => {
      let popover = bootstrap.Popover.getInstance($targetSearchInput[0]);
      if (popover !== null) {
        popover.dispose();
      }

      const searchQuery = $targetSearchInput.val();
      if (searchQuery === '') {
        return;
      }

      const $html = $('<div>');
      $html.append(
        $('<div>')
          .css({ display: 'flex', justifyContent: 'space-between', marginBottom: '1em' })
          .append($('<span>').text('Search results').css({ fontWeight: 'bold' }))
          .append($('<span>').addClass('td-offline-search-results__close-button'))
      );

      const $searchResultBody = $('<div>').css({
        maxHeight: `calc(100vh - ${$targetSearchInput.offset().top - $(window).scrollTop() + 180}px)`,
        overflowY: 'auto',
      });
      $html.append($searchResultBody);

      if (results.length === 0) {
        $searchResultBody.append($('<p>').text(`No results found for query "${searchQuery}"`));
      } else {
        results.forEach((r) => {
          const doc = resultDetails.get(r.ref);
          const href = $targetSearchInput.data('offline-search-base-href') + r.ref.replace(/^\//, '');
          const $entry = $('<div>').addClass('mt-4');

          $entry.append($('<small>').addClass('d-block text-body-secondary').text(r.ref));
          $entry.append($('<a>').addClass('d-block').css({ fontSize: '1.2rem' }).attr('href', href).text(doc.title));
          $entry.append($('<p>').text(doc.excerpt));

          $searchResultBody.append($entry);
        });
      }

      $targetSearchInput.one('shown.bs.popover', () => {
        $('.td-offline-search-results__close-button').on('click', () => {
          $targetSearchInput.val('');
          $targetSearchInput.trigger('change');
        });
      });

      const popoverObj = new bootstrap.Popover($targetSearchInput[0], {
        content: $html[0],
        html: true,
        customClass: 'td-offline-search-results',
        placement: 'bottom',
      });
      popoverObj.show();
    };
  });
})(jQuery);
