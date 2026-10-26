// Loads one article from the "blogs" repository and shows it on its own page.
(function () {
  var RAW = "https://raw.githubusercontent.com/famirapt/blogs/main/";

  var titleEl = document.getElementById('article-title');
  var metaEl = document.getElementById('article-meta');
  var bodyEl = document.getElementById('post-body');

  function fail(message) {
    titleEl.textContent = 'Article not found';
    bodyEl.textContent = message;
  }

  var id = new URLSearchParams(window.location.search).get('id');
  if (!id) {
    fail('No article was selected. Go back to the list of articles.');
    return;
  }

  fetch(RAW + 'blogs.json')
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (posts) {
      var post = posts.find(function (p) { return p.id === id; });
      if (!post) throw new Error('unknown article');

      titleEl.textContent = post.title || 'Untitled article';
      document.title = (post.title || 'Article') + ' | Rahmatu Abdulkarim';
      metaEl.textContent = [post.date, post.readTime].filter(Boolean).join(' · ');

      var path = (post.contentPath || '').split('/').map(encodeURIComponent).join('/');
      return fetch(RAW + path)
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.text();
        })
        .then(function (markdown) {
          bodyEl.innerHTML = window.marked.parse(markdown);

          // The markdown repeats the title as its first heading; the page already shows it.
          var first = bodyEl.firstElementChild;
          if (first && /^H[1-3]$/.test(first.tagName) &&
              first.textContent.trim() === (post.title || '').trim()) {
            first.remove();
          }

          // Make relative image paths load from the blogs repository.
          bodyEl.querySelectorAll('img').forEach(function (img) {
            var src = img.getAttribute('src') || '';
            if (src && !/^(https?:|data:)/.test(src)) {
              img.src = RAW + src.split('/').map(encodeURIComponent).join('/');
            }
          });
        });
    })
    .catch(function () {
      fail('This article could not be loaded. Try again later.');
    });
})();
