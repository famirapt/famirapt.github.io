/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vanilla JavaScript Custom Actions: Theme Toggle, Active Navigation, Typist Animations, and Scroll reveal.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- Safe LocalStorage Helper to prevent Uncaught SecurityError in sandbox/iframe ---
  const safeStorage = {
    getItem: (key) => {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn("Storage access restricted:", e);
        return null;
      }
    },
    setItem: (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn("Storage write restricted:", e);
      }
    }
  };

  // --- Dark Mode / Light Mode Persisted Toggle ---
  const themeBtn = document.getElementById('theme-btn');
  const root = document.documentElement;

  // Sync preference
  const savedTheme = safeStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Handle Action Click
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      if (root.classList.contains('dark')) {
        root.classList.remove('dark');
        safeStorage.setItem('theme', 'light');
      } else {
        root.classList.add('dark');
        safeStorage.setItem('theme', 'dark');
      }
    });
  }

  // --- Mobile Hamburger Menu toggle ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');

      // Toggle close vector icon
      if (hamburgerIcon) {
        if (mobileMenu.classList.contains('hidden')) {
          hamburgerIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        } else {
          hamburgerIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        }
      }
    });
  }

  // Auto-collapse mobile nav links on selection
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
      }
      if (hamburgerIcon) {
        hamburgerIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
      }
    });
  });


  // --- Typewriter Loop Helper ---
  const words = ["Cybersecurity Specialist & Analyst","Incident Responder","Blue Team Guard","Threat Analyst"];
  const typewriter = document.getElementById('typewriter');
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typewriter || words.length === 0) return;
    const currentWord = words[wordIdx];
    if (!currentWord) return;

    if (isDeleting) {
      charIdx--;
      typingSpeed = 50;
    } else {
      charIdx++;
      typingSpeed = 120;
    }

    typewriter.textContent = currentWord.substring(0, charIdx);

    // Speed limits in key moments
    if (!isDeleting && charIdx === currentWord.length) {
      isDeleting = true;
      typingSpeed = 2000; // Hold full word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typingSpeed = 300; // Hold empty space
    }

    setTimeout(typeEffect, typingSpeed);
  }

  // Launch effect
  if (typewriter && words.length > 0) {
    typeEffect();
  }


  // --- Scroll Header Shifting & Nav Link Tracking ---
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Nav collapse decoration
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('collapsed-header');
      } else {
        navbar.classList.remove('collapsed-header');
      }
    }

    // Nav active section indicator mapping
    let currentSectionId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('nav-link-active');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('nav-link-active');
      }
    });
  });


  // --- Visual Scroll Reveal with Intersection Observer ---
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');

            // Custom actions for progress skill percentages
            const bar = entry.target.querySelector('.percent-bar');
            if (bar) {
              const finalPercent = bar.getAttribute('data-percent') + '%';
              bar.style.width = finalPercent;
            }

            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach(item => {
        revealObserver.observe(item);
      });
    } else {
      // Fallback if IntersectionObserver is not supported
      revealElements.forEach(item => {
        item.classList.add('reveal-active');
        const bar = item.querySelector('.percent-bar');
        if (bar) {
          const finalPercent = bar.getAttribute('data-percent') + '%';
          bar.style.width = finalPercent;
        }
      });
    }
  }


  // --- Mock Contact Form Processing ---
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      // Simulate API shipping lag
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending coordinates...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = 'Delivered!';
        }
        contactForm.reset();

        // Show success modal overlay
        if (formSuccess) {
          formSuccess.classList.remove('hidden');
          formSuccess.classList.add('animate-fade-in');
        }

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
        }, 1500);

        // Retain alert for 6 seconds
        setTimeout(() => {
          if (formSuccess) {
            formSuccess.classList.add('hidden');
          }
        }, 6000);
      }, 1200);
    });
  }

  // --- GitHub Live Blog Feed Fetcher ---
  const blogGrid = document.getElementById('blog-grid');
  if (blogGrid) {
    const owner = blogGrid.getAttribute('data-github-owner');
    const repo = blogGrid.getAttribute('data-github-repo');
    const branch = blogGrid.getAttribute('data-github-branch') || 'main';
    const path = blogGrid.getAttribute('data-github-path') || 'blogs.json';

    if (owner && repo) {
      const url = "https://raw.githubusercontent.com/" + owner + "/" + repo + "/" + branch + "/" + path;
      fetch(url)
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch from GitHub raw content CDN');
          return response.json();
        })
        .then(posts => {
          if (Array.isArray(posts) && posts.length > 0) {
            window.PORTFOLIO_BLOG_POSTS = posts;
            let blogsHTML = '';
            posts.forEach((blog, idx) => {
              const bTitle = blog.title || 'Untitled Post';
              const bExcerpt = blog.excerpt || blog.description || 'No excerpt provided.';
              const bDate = blog.date || 'Date not specified';
              const bReadTime = blog.readTime || '3 min read';

              blogsHTML += '<article data-blog-index="' + idx + '" class="blog-card p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition duration-300 flex flex-col justify-between reveal reveal-active" style="opacity: 1; transform: translateY(0)">' +
                '<div>' +
                  '<div class="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 mb-4">' +
                    '<span>' + bDate + '</span>' +
                    '<span>•</span>' +
                    '<span>' + bReadTime + '</span>' +
                  '</div>' +
                  '<h3 class="font-bold text-xl text-slate-900 dark:text-white mb-3 hover:text-accent duration-200 transition-colors">' +
                    '<a href="#" class="blog-trigger-link">' + bTitle + '</a>' +
                  '</h3>' +
                  '<p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">' + bExcerpt + '</p>' +
                '</div>' +
                '<a href="#" class="blog-trigger-link inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover mt-auto transition duration-200 group">' +
                  'Read article <span class="transform group-hover:translate-x-1 duration-200 transition-transform">&rarr;</span>' +
                '</a>' +
              '</article>';
            });
            blogGrid.innerHTML = blogsHTML;
          }
        })
        .catch(err => {
          console.warn('Live GitHub blog sync bypassed or failed. Retaining pre-compiled cache.', err);
        });
    }
  }

  // --- Vanilla Blog Reader Modal Logic ---
  const blogModal = document.getElementById('blog-modal');
  const blogModalContent = document.getElementById('blog-modal-content');
  const modalDate = document.getElementById('modal-blog-date');
  const modalReadTime = document.getElementById('modal-blog-readtime');
  const modalTitle = document.getElementById('modal-blog-title');
  const modalBody = document.getElementById('modal-blog-body');
  const closeBlogModal = document.getElementById('close-blog-modal');
  const closeBlogModalBtn = document.getElementById('close-blog-modal-btn');

  // Simple Markdown to HTML parser for dynamic client display
  function parseMarkdownToHTML(markdown) {
    if (!markdown) return '';
    const lines = markdown.split('\n');
    let html = '';
    let inCodeBlock = false;
    let codeLines = [];

    lines.forEach(line => {
      const trimmed = line.trim();

      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          html += '<pre class="bg-slate-50 dark:bg-slate-950/80 p-4 rounded-xl border border-slate-150 dark:border-slate-800 font-mono text-2xs overflow-x-auto text-slate-800 dark:text-slate-200 my-4 leading-relaxed whitespace-pre"><code>' + codeLines.join('\n') + '</code></pre>';
          codeLines = [];
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      // Headings
      if (trimmed.startsWith('# ')) {
        html += '<h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4 border-b border-slate-100 dark:border-slate-800/60 pb-2">' + trimmed.slice(2) + '</h1>';
        return;
      }
      if (trimmed.startsWith('## ')) {
        html += '<h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-6 mb-3">' + trimmed.slice(3) + '</h2>';
        return;
      }
      if (trimmed.startsWith('### ')) {
        html += '<h3 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-5 mb-2">' + trimmed.slice(4) + '</h3>';
        return;
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        html += '<blockquote class="border-l-4 border-indigo-500/60 pl-4 py-1.5 my-4 bg-slate-50 dark:bg-slate-900/40 rounded-r-lg italic text-[11px] sm:text-xs text-slate-600 dark:text-slate-350 leading-relaxed">' + trimmed.slice(2) + '</blockquote>';
        return;
      }

      // Horizontal Rules
      if (trimmed === '---') {
        html += '<hr class="my-6 border-slate-150 dark:border-slate-850">';
        return;
      }

      // List Items
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        html += '<li class="ml-5 list-disc text-2xs sm:text-xs text-slate-600 dark:text-slate-350 my-1.5 leading-relaxed">' + trimmed.slice(2) + '</li>';
        return;
      }

      // Table Row formatting
      if (trimmed.startsWith('|') && trimmed.endsWith('|') && !trimmed.includes('---')) {
        const cols = trimmed.split('|').map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
        html += '<div class="flex gap-4 border-b border-slate-100 dark:border-slate-800 py-2 text-2xs sm:text-xs text-slate-650 dark:text-slate-350">';
        cols.forEach(col => {
          html += '<div class="flex-1 font-semibold">' + col + '</div>';
        });
        html += '</div>';
        return;
      }

      // Blank line
      if (trimmed === '') {
        html += '<div class="h-2"></div>';
        return;
      }

      // Normal paragraph with basic bold handling
      const parts = trimmed.split('**');
      let lineHtml = '';
      parts.forEach((part, pIdx) => {
        if (pIdx % 2 === 1) {
          lineHtml += '<strong class="font-bold text-slate-950 dark:text-white">' + part + '</strong>';
        } else {
          lineHtml += part;
        }
      });
      html += '<p class="text-2xs sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed my-3">' + lineHtml + '</p>';
    });

    return html;
  }

  function openModal(blogIndex) {
    if (!window.PORTFOLIO_BLOG_POSTS) return;
    const blog = window.PORTFOLIO_BLOG_POSTS[blogIndex];
    if (!blog) return;

    if (modalDate) modalDate.innerText = blog.date || 'Date not specified';
    if (modalReadTime) modalReadTime.innerText = blog.readTime || '3 min read';
    if (modalTitle) modalTitle.innerText = blog.title || 'Untitled Post';

    if (modalBody) {
      if (blog.content) {
        modalBody.innerHTML = parseMarkdownToHTML(blog.content);
      } else if (blog.contentPath && window.GITHUB_BLOG_OWNER && window.GITHUB_BLOG_REPO) {
        modalBody.innerHTML = '<div class="flex flex-col items-center justify-center py-12 space-y-3">' +
          '<div class="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>' +
          '<p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fetching file from GitHub...</p>' +
          '</div>';

        const owner = window.GITHUB_BLOG_OWNER.trim();
        const repo = window.GITHUB_BLOG_REPO.trim();
        const branch = (window.GITHUB_BLOG_BRANCH || "main").trim();
        const cleanPath = blog.contentPath.trim();
        const url = "https://raw.githubusercontent.com/" + owner + "/" + repo + "/" + branch + "/" + cleanPath;

        fetch(url)
          .then(function(res) {
            if (!res.ok) {
              throw new Error("HTTP Error " + res.status);
            }
            return res.text();
          })
          .then(function(text) {
            // Cache in the global array
            blog.content = text;
            modalBody.innerHTML = parseMarkdownToHTML(text);
          })
          .catch(function(err) {
            modalBody.innerHTML = '<div class="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-150 dark:border-rose-900 rounded-xl text-left">' +
              '<p class="text-2xs font-bold text-rose-600 dark:text-rose-400 mb-1">Could Not Load Article</p>' +
              '<p class="text-[10px] text-slate-500 dark:text-slate-400 mb-3">' + (err.message || "Failed to load blog post from GitHub.") + '</p>' +
              '<div class="text-[9px] text-slate-400 bg-slate-100 dark:bg-slate-900 p-2 rounded">' +
                'Ensure the file <code class="font-mono text-rose-500">' + blog.contentPath + '</code> exists in your repository branch.' +
              '</div>' +
            '</div>';
          });
      } else {
        modalBody.innerHTML = '<p class="text-2xs sm:text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-sans italic">' + (blog.excerpt || '') + '</p>' +
          '<div class="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-150 dark:border-slate-800 text-[10px] text-slate-500 leading-relaxed mt-4">' +
          '💡 This post is synced with live summaries. Add detailed content inside your GitHub \'blogs.json\' file under a <code>"content"</code> key or specify a <code>"contentPath"</code> pointing to an external \'.md\' file!' +
          '</div>';
      }
    }

    // Show modal with animation
    if (blogModal && blogModalContent) {
      blogModal.classList.remove('hidden');
      blogModal.classList.add('flex');
      setTimeout(() => {
        blogModal.classList.remove('opacity-0');
        blogModal.classList.add('opacity-100');
        blogModalContent.classList.remove('scale-95', 'translate-y-4');
        blogModalContent.classList.add('scale-100', 'translate-y-0');
      }, 10);
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (blogModal && blogModalContent) {
      blogModal.classList.remove('opacity-100');
      blogModal.classList.add('opacity-0');
      blogModalContent.classList.remove('scale-100', 'translate-y-0');
      blogModalContent.classList.add('scale-95', 'translate-y-4');

      setTimeout(() => {
        blogModal.classList.remove('flex');
        blogModal.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }
  }

  // Bind click listener on blog grid for delegation
  if (blogGrid) {
    blogGrid.addEventListener('click', (e) => {
      const trigger = e.target.closest('.blog-trigger-link');
      if (trigger) {
        e.preventDefault();
        const article = trigger.closest('article');
        if (article) {
          const idx = article.getAttribute('data-blog-index');
          if (idx !== null) {
            openModal(parseInt(idx, 10));
          }
        }
      }
    });
  }

  if (closeBlogModal) closeBlogModal.addEventListener('click', closeModal);
  if (closeBlogModalBtn) closeBlogModalBtn.addEventListener('click', closeModal);

  // Close when clicking overlay backdrop
  if (blogModal) {
    blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) {
        closeModal();
      }
    });
  }

});
