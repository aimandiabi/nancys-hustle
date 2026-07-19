/**
 * Nancy's Hustle v2 — Main Animation Controller
 * GSAP 3.12 + ScrollTrigger + Lenis Smooth Scroll
 * ------------------------------------------------
 * All selectors match the HTML class structure exactly.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
   * 1. GSAP + SCROLLTRIGGER REGISTRATION
   * ========================================= */
  gsap.registerPlugin(ScrollTrigger);

  /* =========================================
   * 2. LENIS SMOOTH SCROLL
   * ========================================= */
  const lenis = new Lenis({
    lerp: 0.12,
    wheelMultiplier: 1.0,
    orientation: 'vertical',
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* =========================================
   * 2.5. NAVIGATION INTERACTIONS
   * ========================================= */
  const header = document.querySelector('.main-header');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a, .footer-col a, .btn-primary, .hero-scroll-indicator');

  // Shrink header on scroll
  lenis.on('scroll', (e) => {
    if (e.scroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars-staggered');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars-staggered');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Smooth scroll to anchor links using Lenis
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target, {
            offset: -100, // Offset for navbar
            duration: 1.5,
            immediate: false
          });
        }
      }
    });
  });

  /* =========================================
   * 3. REDUCED MOTION CHECK
   * ========================================= */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  /* =========================================
   * 4. HERO — Page Load Intro + Pinned Scrub
   * ========================================= */
  const heroSection = document.querySelector('#hero');
  const heroBg = document.querySelector('.hero-bg');
  const heroContent = document.querySelector('.hero-content');
  const heroOverlay = document.querySelector('.hero-overlay');
  const heroTitleLines = document.querySelectorAll('.hero-title .line');
  const heroEyebrow = document.querySelector('.eyebrow');
  const heroTagline = document.querySelector('.hero-tagline');
  const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');

  // Page-load intro timeline
  const introTl = gsap.timeline({ delay: 0.3 });

  if (heroTitleLines.length) {
    gsap.set(heroTitleLines, { y: 80, opacity: 0 });
    introTl.to(heroTitleLines, {
      y: 0,
      opacity: 1,
      duration: 1.4,
      stagger: 0.15,
      ease: 'expo.out'
    });
  }

  if (heroEyebrow) {
    gsap.set(heroEyebrow, { opacity: 0, y: 20 });
    introTl.to(heroEyebrow, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.8');
  }

  if (heroTagline) {
    gsap.set(heroTagline, { opacity: 0, y: 20 });
    introTl.to(heroTagline, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
  }

  if (heroScrollIndicator) {
    gsap.set(heroScrollIndicator, { opacity: 0 });
    introTl.to(heroScrollIndicator, { opacity: 1, duration: 0.6 }, '-=0.3');
  }

  // Hero pinned scrub — zoom bg, fade content
  if (heroSection) {
    const heroScrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: '+=50%',
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    });

    if (heroBg) heroScrollTl.to(heroBg, { scale: 1.15, ease: 'none' }, 0);
    if (heroContent) heroScrollTl.to(heroContent, { opacity: 0, y: -80, ease: 'none' }, 0);
    if (heroOverlay) heroScrollTl.to(heroOverlay, { opacity: 1, ease: 'none' }, 0);
    if (heroScrollIndicator) heroScrollTl.to(heroScrollIndicator, { opacity: 0, ease: 'none' }, 0);
  }

  /* =========================================
   * 5. PHILOSOPHY — Reveal on Scroll
   * ========================================= */
  const philosophySection = document.querySelector('#philosophy');
  if (philosophySection) {
    const phTl = gsap.timeline({
      scrollTrigger: {
        trigger: philosophySection,
        start: 'top 80%',
        once: true
      }
    });

    const phSubtitle = philosophySection.querySelector('.subtitle');
    const phRule = philosophySection.querySelector('.brass-rule');
    const phHeading = philosophySection.querySelector('.heading');
    const phDesc = philosophySection.querySelector('.description');
    const phImg = philosophySection.querySelector('.philosophy-image img');

    if (phSubtitle) {
      gsap.set(phSubtitle, { y: 30, opacity: 0 });
      phTl.to(phSubtitle, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0);
    }

    if (phRule) {
      gsap.set(phRule, { scaleX: 0, transformOrigin: 'left' });
      phTl.to(phRule, { scaleX: 1, duration: 1, ease: 'power3.inOut' }, 0.2);
    }

    if (phHeading) {
      gsap.set(phHeading, { y: 40, opacity: 0 });
      phTl.to(phHeading, { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.4);
    }

    if (phDesc) {
      gsap.set(phDesc, { opacity: 0 });
      phTl.to(phDesc, { opacity: 1, duration: 1 }, 0.8);
    }

    if (phImg) {
      gsap.set(phImg, { clipPath: 'inset(100% 0 0 0)', scale: 1.05 });
      phTl.to(phImg, {
        clipPath: 'inset(0% 0 0 0)',
        scale: 1,
        duration: 1.4,
        ease: 'power3.out'
      }, 0.4);
    }
  }

  /* =========================================
   * 6. MENU — Interactive Board Filtering
   * ========================================= */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuGroups = document.querySelectorAll('.menu-group');
  const menuColumns = document.querySelectorAll('.menu-column');

  if (filterButtons.length && menuGroups.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle active button class
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const activeFilter = button.dataset.filter;

        // Get currently visible groups and columns
        const visibleGroups = Array.from(menuGroups).filter(g => g.style.display !== 'none' && g.style.display !== '');
        const visibleCols = Array.from(menuColumns).filter(c => c.style.display !== 'none' && c.style.display !== '');

        // Kill active tweens to prevent clashes
        gsap.killTweensOf(menuGroups);
        gsap.killTweensOf(menuColumns);
        gsap.killTweensOf('.menu-item-row');

        const fadeOutAndSwap = () => {
          // Keep track of visible groups per column for the new state
          const visibleGroupsPerColumn = {};
          menuColumns.forEach(col => {
            visibleGroupsPerColumn[col.id] = 0;
          });

          // Set up display states for the new filter
          menuGroups.forEach(group => {
            const groupCategory = group.dataset.category;
            const parentColumn = group.closest('.menu-column');

            if (activeFilter === 'all' || groupCategory === activeFilter) {
              if (parentColumn) {
                visibleGroupsPerColumn[parentColumn.id]++;
              }
              gsap.set(group, { display: 'block', opacity: 0, y: 15 });
            } else {
              gsap.set(group, { display: 'none' });
            }
          });

          // Toggle columns display states
          menuColumns.forEach(col => {
            if (activeFilter !== 'all' && visibleGroupsPerColumn[col.id] === 0) {
              gsap.set(col, { display: 'none' });
            } else {
              gsap.set(col, { display: 'flex', opacity: 0, y: 20 });
            }
          });

          // Animate the new visible elements in
          const activeCols = Array.from(menuColumns).filter(c => c.style.display !== 'none');
          const activeGroups = Array.from(menuGroups).filter(g => g.style.display !== 'none');

          const inTl = gsap.timeline({
            onComplete: () => {
              gsap.set([activeCols, activeGroups], { clearProps: 'all' });
              ScrollTrigger.refresh();
            }
          });

          if (activeCols.length) {
            inTl.to(activeCols, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0);
          }

          if (activeGroups.length) {
            inTl.to(activeGroups, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.08);
            
            // Stagger reveal the item rows inside the active groups
            activeGroups.forEach(group => {
              const rows = group.querySelectorAll('.menu-item-row');
              if (rows.length) {
                gsap.fromTo(rows,
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 0.5, stagger: 0.03, ease: 'power2.out' }
                );
              }
            });
          }
        };

        if (visibleGroups.length || visibleCols.length) {
          // Animate out currently visible elements
          const outTl = gsap.timeline({ onComplete: fadeOutAndSwap });
          
          if (visibleGroups.length) {
            outTl.to(visibleGroups, { opacity: 0, y: -10, duration: 0.22, ease: 'power2.in' }, 0);
          }
          if (visibleCols.length) {
            outTl.to(visibleCols, { opacity: 0, y: -10, duration: 0.22, ease: 'power2.in' }, 0);
          }
        } else {
          fadeOutAndSwap();
        }

        // Trigger ScrollTrigger refresh since height changes when filtering items
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 600);
      });
    });
  }

  // Menu header reveal
  const menuHeader = document.querySelector('.menu-header');
  if (menuHeader) {
    const mhSubtitle = menuHeader.querySelector('.subtitle');
    const mhHeading = menuHeader.querySelector('.heading');

    const mhTl = gsap.timeline({
      scrollTrigger: { trigger: menuHeader, start: 'top 80%', once: true }
    });

    if (mhSubtitle) {
      gsap.set(mhSubtitle, { y: 20, opacity: 0 });
      mhTl.to(mhSubtitle, { y: 0, opacity: 1, duration: 0.8 }, 0);
    }
    if (mhHeading) {
      gsap.set(mhHeading, { y: 30, opacity: 0 });
      mhTl.to(mhHeading, { y: 0, opacity: 1, duration: 1 }, 0.2);
    }
  }

  /* =========================================
   * 7. GALLERY — Horizontal Scroll
   * ========================================= */
  const gallerySection = document.querySelector('#gallery');
  const galleryContainer = document.querySelector('.gallery-container');
  const galleryCount = document.querySelector('.gallery-count');

  if (gallerySection && galleryContainer) {
    const getScrollAmount = () => -(galleryContainer.scrollWidth - window.innerWidth);

    const galleryTween = gsap.to(galleryContainer, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: gallerySection,
        start: 'top top',
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        scrub: 0.3,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Update gallery counter
          if (galleryCount) {
            const totalItems = document.querySelectorAll('.gallery-item').length;
            const currentIndex = Math.min(
              totalItems,
              Math.floor(self.progress * totalItems) + 1
            );
            galleryCount.textContent = `${String(currentIndex).padStart(2, '0')}/${String(totalItems).padStart(2, '0')}`;
          }
        }
      }
    });

  }

  /* =========================================
   * 8. ACCOLADES — Counter Reveal + Stagger
   * ========================================= */
  const accoladesSection = document.querySelector('#accolades');
  if (accoladesSection) {
    const accTl = gsap.timeline({
      scrollTrigger: {
        trigger: accoladesSection,
        start: 'top 70%',
        once: true
      }
    });

    // Animate stat numbers
    const statNumbers = gsap.utils.toArray('.stat-number');
    statNumbers.forEach((stat, i) => {
      const target = parseFloat(stat.dataset.target) || 0;
      const isDecimal = String(stat.dataset.target).includes('.');
      const obj = { value: 0 };

      accTl.to(obj, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          stat.textContent = isDecimal ? obj.value.toFixed(1) : Math.round(obj.value);
        }
      }, i * 0.15);
    });

    // Fade in labels
    const statLabels = accoladesSection.querySelectorAll('.stat-label');
    if (statLabels.length) {
      gsap.set(statLabels, { opacity: 0, y: 10 });
      accTl.to(statLabels, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.5);
    }

    // Fade in suffixes
    const statSuffixes = accoladesSection.querySelectorAll('.stat-suffix');
    if (statSuffixes.length) {
      gsap.set(statSuffixes, { opacity: 0 });
      accTl.to(statSuffixes, { opacity: 1, duration: 0.6, stagger: 0.1 }, 0.3);
    }

    // Reveal quotes
    const quotes = accoladesSection.querySelectorAll('.quote');
    if (quotes.length) {
      gsap.set(quotes, { y: 40, opacity: 0 });
      accTl.to(quotes, { y: 0, opacity: 1, duration: 1, stagger: 0.3, ease: 'power2.out' }, 1);
    }
  }

  /* =========================================
   * 9. RESERVATIONS — Parallax Fade
   * ========================================= */
  const reservationsSection = document.querySelector('#reservations');
  if (reservationsSection) {
    const resBg = reservationsSection.querySelector('.reservations-bg');
    const resBox = reservationsSection.querySelector('.reservations-box');
    const infoBlocks = reservationsSection.querySelectorAll('.info-block');
    const btnPrimary = reservationsSection.querySelector('.btn-primary');

    // Background parallax
    if (resBg) {
      gsap.to(resBg, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: reservationsSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    // Content reveal
    const resTl = gsap.timeline({
      scrollTrigger: {
        trigger: reservationsSection,
        start: 'top 70%',
        once: true
      }
    });

    if (resBox) {
      gsap.set(resBox, { y: 60, opacity: 0 });
      resTl.to(resBox, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 0);
    }

    if (infoBlocks.length) {
      gsap.set(infoBlocks, { y: 20, opacity: 0 });
      resTl.to(infoBlocks, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }, 0.4);
    }

    // CTA button pulse after reveal
    if (btnPrimary) {
      gsap.set(btnPrimary, { opacity: 0, scale: 0.9 });
      resTl.to(btnPrimary, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.5)',
        onComplete: () => {
          gsap.to(btnPrimary, {
            boxShadow: '0 0 25px rgba(201,168,92,0.35)',
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: 'sine.inOut'
          });
        }
      }, 0.8);
    }
  }

  /* =========================================
   * 10. FOOTER — Simple Stagger
   * ========================================= */
  const footer = document.querySelector('#footer');
  if (footer) {
    const wordmark = footer.querySelector('.footer-wordmark');
    const footerCols = footer.querySelectorAll('.footer-col');
    const brassRule = footer.querySelector('.brass-rule.thin');
    const footerBottom = footer.querySelector('.footer-bottom p');

    const footerTl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        once: true
      }
    });

    if (wordmark) {
      gsap.set(wordmark, { scale: 0.9, opacity: 0 });
      footerTl.to(wordmark, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.2)' }, 0);
    }

    if (footerCols.length) {
      gsap.set(footerCols, { y: 30, opacity: 0 });
      footerTl.to(footerCols, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }, 0.3);
    }

    if (brassRule) {
      gsap.set(brassRule, { scaleX: 0, transformOrigin: 'left' });
      footerTl.to(brassRule, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, 0.5);
    }

    if (footerBottom) {
      gsap.set(footerBottom, { opacity: 0 });
      footerTl.to(footerBottom, { opacity: 1, duration: 0.6 }, 0.8);
    }
  }

  /* =========================================
   * 11. GLOBAL REVEALS — Scroll-triggered
   * ========================================= */
  // Add reveal animation to any element with data-reveal attribute
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.from(el, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

});
