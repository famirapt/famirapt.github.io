// Shared site script: light/dark switch and the blog list on the home page.
(function () {
  var RAW = "https://raw.githubusercontent.com/famirapt/blogs/main/";
  var REPO_URL = "https://github.com/famirapt/blogs";
  var list = document.getElementById('blog-list');
  if (!list) return;

  function showError() {
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

  fetch(RAW + 'blogs.json')
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (posts) {
      if (!Array.isArray(posts) || posts.length === 0) throw new Error('no posts');
      list.textContent = '';
      posts.forEach(function (post) {
        var a = document.createElement('a');
        a.className = 'post-item';
        a.href = 'post.html?id=' + encodeURIComponent(post.id);

        var title = document.createElement('span');
        title.className = 'pill-title';
        title.textContent = post.title || 'Untitled post';

        var date = document.createElement('span');
        date.className = 'pill-date';
        date.textContent = post.date || '';

        a.append(title, date);
        list.appendChild(a);
      });
    })
    .catch(showError);
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

