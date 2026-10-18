// Blog section: loads posts live from the "blogs" repository on GitHub.
(function () {
  var OWNER = 'famirapt';
  var REPO = 'blogs';
  var BRANCH = 'main';
  var RAW = 'https://raw.githubusercontent.com/' + OWNER + '/' + REPO + '/' + BRANCH + '/';
  var REPO_URL = 'https://github.com/' + OWNER + '/' + REPO;

  var list = document.getElementById('blog-list');
  var dialog = document.getElementById('post-dialog');
  var postMeta = document.getElementById('post-meta');
  var postTitle = document.getElementById('post-title');
  var postBody = document.getElementById('post-body');
  var closeBtn = document.getElementById('post-close');

  function showListError() {
    list.textContent = '';
    var p = document.createElement('p');
    p.className = 'muted';
    p.append('Posts could not be loaded right now. You can read them on ');
    var a = document.createElement('a');
    a.href = REPO_URL;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'GitHub';
    p.append(a, '.');
    list.appendChild(p);
  }

  function renderPosts(posts) {
    list.textContent = '';
    posts.forEach(function (post) {
      var card = document.createElement('article');
      card.className = 'card';

      var meta = document.createElement('p');
      meta.className = 'tags';
      meta.textContent = [post.date, post.readTime].filter(Boolean).join(' · ');

      var title = document.createElement('h3');
      title.textContent = post.title || 'Untitled post';

      var excerpt = document.createElement('p');
      excerpt.textContent = post.excerpt || '';

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'card-link';
      button.textContent = 'Read article →';
      button.addEventListener('click', function () { openPost(post); });

      card.append(meta, title, excerpt, button);
      list.appendChild(card);
    });
  }

  function loadPosts() {
    fetch(RAW + 'blogs.json')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (posts) {
        if (!Array.isArray(posts) || posts.length === 0) throw new Error('no posts');
        renderPosts(posts);
      })
      .catch(showListError);
  }

  function openPost(post) {
    postMeta.textContent = [post.date, post.readTime].filter(Boolean).join(' · ');
    postTitle.textContent = post.title || 'Untitled post';
    postBody.textContent = 'Loading…';
    dialog.showModal();

    var path = (post.contentPath || '').split('/').map(encodeURIComponent).join('/');
    fetch(RAW + path)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (markdown) {
        postBody.innerHTML = window.marked.parse(markdown);
        // Make relative image paths load from the blogs repository.
        postBody.querySelectorAll('img').forEach(function (img) {
          var src = img.getAttribute('src') || '';
          if (src && !/^(https?:|data:)/.test(src)) {
            img.src = RAW + src.split('/').map(encodeURIComponent).join('/');
          }
        });
      })
      .catch(function () {
        postBody.textContent = 'This article could not be loaded. Try again later.';
      });
  }

  closeBtn.addEventListener('click', function () { dialog.close(); });
  // Close when clicking the backdrop (outside the dialog content).
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });

  loadPosts();
})();
