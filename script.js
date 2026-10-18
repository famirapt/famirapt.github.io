// Blog strip: loads posts live from the "blogs" repository on GitHub.
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
    p.append('Posts could not be loaded right now. Read them on ');
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
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'post-pill';
      button.title = post.excerpt || post.title || '';

      var title = document.createElement('span');
      title.className = 'pill-title';
      title.textContent = post.title || 'Untitled post';

      var date = document.createElement('span');
      date.className = 'pill-date';
      date.textContent = post.date || '';

      button.append(title, date);
      button.addEventListener('click', function () { openPost(post); });
      list.appendChild(button);
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
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });

  loadPosts();
})();

// Light / dark mode switch: toggles the .dark-mode class on <body>.
(function () {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function isDark() { return document.body.classList.contains('dark-mode'); }

  function sync() {
    toggle.setAttribute('aria-checked', isDark() ? 'true' : 'false');
  }

  toggle.addEventListener('click', function () {
    var dark = !isDark();
    document.body.classList.toggle('dark-mode', dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    sync();
  });

  sync();
})();

