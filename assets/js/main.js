/**
* Template Name: Passion
* Template URL: https://bootstrapmade.com/passion-bootstrap-template/
* Updated: Jul 21 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Hero Video Handler with Smooth Crossfade Loop
   */
  function initHeroVideo() {
    const video1 = document.querySelector('#video1');
    const video2 = document.querySelector('#video2');
    const fallbackImg = document.querySelector('.hero-background img[style*="display: none"]');
    const videoContainer = document.querySelector('.hero-video-container');
    
    if (video1 && video2 && fallbackImg) {
      // Check if device is mobile or has slow connection
      const isMobile = window.innerWidth <= 768;
      const isSlowConnection = navigator.connection && navigator.connection.effectiveType && 
                              (navigator.connection.effectiveType === 'slow-2g' || 
                               navigator.connection.effectiveType === '2g');
      
      // Show fallback image on very small screens
      if (window.innerWidth <= 480) {
        videoContainer.style.display = 'none';
        fallbackImg.style.display = 'block';
        return;
      }
      
      // Reduce video quality on mobile or slow connections
      if (isMobile || isSlowConnection) {
        video1.style.transform = 'scale(1.1)';
        video1.style.filter = 'blur(1px)';
        video2.style.transform = 'scale(1.1)';
        video2.style.filter = 'blur(1px)';
      }
      
      // Handle video load errors
      video1.addEventListener('error', showFallback);
      video2.addEventListener('error', showFallback);
      
      function showFallback() {
        videoContainer.style.display = 'none';
        fallbackImg.style.display = 'block';
      }
      
      // Smooth crossfade loop system
      let currentVideo = video1;
      let nextVideo = video2;
      let transitionInProgress = false;
      const crossfadeDuration = 1000; // 1 second crossfade
      
      // Initialize videos
      video1.classList.add('active');
      video2.classList.remove('active');
      
      // Preload both videos
      video1.load();
      video2.load();
      
      // Start playing the first video
      video1.play().catch(console.error);
      
      function switchVideos() {
        // Swap current and next video references
        const temp = currentVideo;
        currentVideo = nextVideo;
        nextVideo = temp;
      }
      
      function startCrossfade() {
        if (transitionInProgress) return;
        
        transitionInProgress = true;
        
        // Start the next video
        nextVideo.currentTime = 0;
        nextVideo.play().catch(console.error);
        
        // Begin crossfade by showing next video
        nextVideo.classList.add('active');
        
        // After crossfade duration, hide the previous video
        setTimeout(() => {
          currentVideo.classList.remove('active');
          currentVideo.pause();
          currentVideo.currentTime = 0; // Reset for next cycle
          
          switchVideos();
          transitionInProgress = false;
        }, crossfadeDuration);
      }
      
      // Monitor current video for loop timing
      function handleTimeUpdate() {
        if (transitionInProgress) return;
        
        const duration = currentVideo.duration;
        const currentTime = currentVideo.currentTime;
        
        // Start crossfade 1.5 seconds before video ends
        if (duration > 0 && currentTime >= duration - 1.5) {
          startCrossfade();
        }
      }
      
      // Add time update listeners
      video1.addEventListener('timeupdate', handleTimeUpdate);
      video2.addEventListener('timeupdate', handleTimeUpdate);
      
      // Fallback for ended event
      video1.addEventListener('ended', () => {
        if (!transitionInProgress) {
          startCrossfade();
        }
      });
      
      video2.addEventListener('ended', () => {
        if (!transitionInProgress) {
          startCrossfade();
        }
      });
      
      // Pause videos when not in viewport to save battery
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Reset video to beginning when scrolling back to hero
            currentVideo.currentTime = 0;
            nextVideo.currentTime = 0;
            nextVideo.pause();
            nextVideo.classList.remove('active');
            
            // Ensure current video is active and reset transition state
            currentVideo.classList.add('active');
            transitionInProgress = false;
            
            // Start playing from the beginning
            currentVideo.play().catch(console.error);
          } else {
            currentVideo.pause();
            nextVideo.pause();
          }
        });
      });
      
      observer.observe(videoContainer);
    }
  }

  // Initialize hero video when DOM is loaded
  document.addEventListener('DOMContentLoaded', initHeroVideo);

})();