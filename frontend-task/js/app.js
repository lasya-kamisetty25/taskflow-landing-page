/**
 * app.js — Main JavaScript File
 * O2H Mock Front-End Developer Assessment
 * Author: Front-End Developer
 * Description: ES6 Vanilla JS — Navigation interactivity for Step 1.
 *              Additional features (dark mode, scroll animations,
 *              form validation, API) will be added in later steps.
 */

'use strict';

/* ============================================================
   UTILITY HELPERS
   ============================================================ */

/**
 * Shorthand for querySelector
 * @param {string} selector — CSS selector
 * @param {Element|Document} [scope=document]
 * @returns {Element|null}
 */
const $ = (selector, scope = document) => scope.querySelector(selector);

/**
 * Shorthand for querySelectorAll (returns Array)
 * @param {string} selector — CSS selector
 * @param {Element|Document} [scope=document]
 * @returns {Element[]}
 */
const $$ = (selector, scope = document) =>
  Array.from(scope.querySelectorAll(selector));

/* ============================================================
   MODULE: NAVIGATION
   ============================================================ */
const Navigation = (() => {
  // Element references
  const navbar      = $('#navbar');
  const hamburger   = $('#hamburger');
  const mobileNav   = $('#mobile-nav');
  const navLinks    = $$('.nav__link');
  const mobileLinks = $$('.mobile-nav__link');

  // State
  let isMenuOpen  = false;
  let scrollTimer = null;

  /**
   * Toggle mobile navigation menu
   */
  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;

    hamburger.classList.toggle('is-active', isMenuOpen);
    mobileNav.classList.toggle('is-open', isMenuOpen);

    // Accessibility
    hamburger.setAttribute('aria-expanded', String(isMenuOpen));
    mobileNav.setAttribute('aria-hidden',   String(!isMenuOpen));

    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  };

  /**
   * Close mobile navigation menu
   */
  const closeMenu = () => {
    if (!isMenuOpen) return;
    isMenuOpen = false;

    hamburger.classList.remove('is-active');
    mobileNav.classList.remove('is-open');

    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden',   'true');

    document.body.style.overflow = '';
  };

  /**
   * Add "scrolled" class to navbar when user scrolls down
   */
  const handleScroll = () => {
    if (scrollTimer) return; // Throttle

    scrollTimer = requestAnimationFrame(() => {
      const scrolled = window.scrollY > 20;
      navbar.classList.toggle('scrolled', scrolled);
      scrollTimer = null;
    });
  };

  /**
   * Update active nav link based on current scroll section
   */
  const updateActiveLink = () => {
    const sections = $$('section[id]');
    const scrollPos = window.scrollY + 120; // offset for fixed nav

    let currentSection = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollPos >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    // Update desktop links
    navLinks.forEach((link) => {
      const href = link.getAttribute('href')?.replace('#', '') ?? '';
      link.classList.toggle('active', href === currentSection);
    });

    // Update mobile links
    mobileLinks.forEach((link) => {
      const href = link.getAttribute('href')?.replace('#', '') ?? '';
      link.classList.toggle('active', href === currentSection);
    });
  };

  /**
   * Close menu when clicking outside of it
   * @param {MouseEvent} e
   */
  const handleOutsideClick = (e) => {
    if (!isMenuOpen) return;
    const clickedInside =
      mobileNav.contains(e.target) || hamburger.contains(e.target);
    if (!clickedInside) closeMenu();
  };

  /**
   * Handle keyboard navigation (Escape closes menu)
   * @param {KeyboardEvent} e
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu();
      hamburger.focus();
    }
  };

  /**
   * Smooth scroll to target section when a nav link is clicked
   * @param {MouseEvent} e
   * @param {boolean} [isMobile=false]
   */
  const handleNavLinkClick = (e, isMobile = false) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    e.preventDefault();
    const target = $(href);
    if (!target) return;

    if (isMobile) closeMenu();

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /**
   * Initialise navigation module
   */
  const init = () => {
    if (!navbar || !hamburger || !mobileNav) return;

    // Hamburger toggle
    hamburger.addEventListener('click', toggleMenu);

    // Nav link clicks (desktop)
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => handleNavLinkClick(e, false));
    });

    // Nav link clicks (mobile)
    mobileLinks.forEach((link) => {
      link.addEventListener('click', (e) => handleNavLinkClick(e, true));
    });

    // Scroll events — throttled
    window.addEventListener('scroll', handleScroll,        { passive: true });
    window.addEventListener('scroll', updateActiveLink,    { passive: true });

    // Outside click to close
    document.addEventListener('click', handleOutsideClick);

    // Keyboard: Escape key
    document.addEventListener('keydown', handleKeyDown);

    // Run once on load
    handleScroll();
    updateActiveLink();
  };

  return { init, closeMenu };
})();

/* ============================================================
   MODULE PLACEHOLDERS
   (Will be fully implemented in subsequent steps)
   ============================================================ */

/* ============================================================
   MODULE: HERO SECTION — Step 2
   ============================================================ */

/**
 * HeroSection module
 * Simplifies hero interactions for clean student-project design.
 */
const HeroSection = (() => {
  const init = () => {
    // No parallax or floating card animations required
  };

  return { init };
})();


const DarkMode = (() => {
  const themeToggleBtn = $('#theme-toggle');

  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const init = () => {
    if (!themeToggleBtn) return;

    // Apply preferred theme on startup
    const initialTheme = getPreferredTheme();
    setTheme(initialTheme);

    // Event listener for toggle button click
    themeToggleBtn.addEventListener('click', toggleTheme);
  };

  return { init };
})();

/**
 * ScrollAnimations module — Step 5
 * Placeholder for Intersection Observer–based reveal animations.
 */
const ScrollAnimations = (() => {
  const init = () => {
    // TODO: Implement in Step 5
    // - Use IntersectionObserver to add .in-view class
    // - Trigger fade-in / slide-up animations
  };
  return { init };
})();

/**
 * FormValidation module — Step 5
 * Placeholder for contact form validation.
 */
const FormValidation = (() => {
  const init = () => {
    // TODO: Implement in Step 5
    // - Real-time field validation
    // - Custom error messages
    // - Submit handling with visual feedback
  };
  return { init };
})();

/**
 * PricingToggle module — Step 3
 * Placeholder for monthly/annual billing toggle.
 */
const PricingToggle = (() => {
  const init = () => {
    // TODO: Implement in Step 3
    // - Toggle between monthly and annual pricing
    // - Animate price change
  };
  return { init };
})();

/* ============================================================
   APP INIT — DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Step 1
  Navigation.init();

  // Step 2
  HeroSection.init();

  // Placeholders — initialise when features are built
  DarkMode.init();
  ScrollAnimations.init();
  FormValidation.init();
  PricingToggle.init();
});
