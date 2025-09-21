// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Create intersection observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Add staggered animation for project items
      if (entry.target.classList.contains('project') || 
          entry.target.classList.contains('job') || 
          entry.target.classList.contains('volunteer') || 
          entry.target.classList.contains('leadership')) {
        
        const items = entry.target.parentElement.querySelectorAll('.slide-in');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 150);
        });
      }
    }
  });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Touch-detection: add `.no-fancy-ui` for devices with touch support
  try {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    if (isTouch) document.documentElement.classList.add('no-fancy-ui');
  } catch (e) { /* ignore */ }

  // Update footer with current year
  const currentYear = new Date().getFullYear();
  const footerText = document.querySelector('footer p');
  if (footerText) {
    footerText.textContent = `© ${currentYear} Chukwunonso Daniel Ekweaga`;
  }
  
  // Initial header animations
  setTimeout(() => {
    document.querySelector('header h1').classList.add('loaded');
  }, 500);
  
  setTimeout(() => {
    document.querySelector('header p').classList.add('loaded');
  }, 700);
  
  // Observe all animatable elements
  const animateElements = document.querySelectorAll('.fade-in, .slide-in, .project, .job, .volunteer, .leadership, .links');
  animateElements.forEach(el => observer.observe(el));
  
  // Smooth scroll for navigation
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 50;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Add active state animation
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
          link.style.transform = '';
        }, 150);
      }
    });
  });
  
  // Enhanced scroll effects
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Parallax effect on header
    if (scrollTop < window.innerHeight) {
      const translateY = scrollTop * 0.5;
      header.style.transform = `translateY(${translateY}px)`;
      header.style.opacity = 1 - (scrollTop / window.innerHeight) * 0.8;
    }
    
    // Text animation on scroll
    animateTextElements();
    
    lastScrollTop = scrollTop;
  });
  
  // Text reveal animation
  function animateTextElements() {
    const textElements = document.querySelectorAll('section p, section h3');
    textElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Mouse movement parallax effect
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const projects = document.querySelectorAll('.project, .job, .volunteer, .leadership');
    projects.forEach((project, index) => {
      const speed = (index % 2 === 0) ? 0.5 : -0.5;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      
      if (project.classList.contains('visible')) {
        project.style.transform = `translateX(${x}px) translateY(${y}px)`;
      }
    });
  });
  
  // Enhanced hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('nav a, .links a, .project, .job, .volunteer, .leadership');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
      element.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
  
  // Progressive enhancement for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable complex animations for users who prefer reduced motion
    document.querySelectorAll('*').forEach(el => {
      el.style.animationDuration = '0.01ms';
      el.style.animationIterationCount = '1';
      el.style.transitionDuration = '0.01ms';
      el.style.scrollBehavior = 'auto';
    });
  }
  
  // Keyboard navigation enhancement
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });

  // Clock: update element with local time every second
  const clockEl = document.querySelector('.clock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Rotating greetings for the topbar
  const greetings = [
    'Hello', 'Hola', 'Bonjour', 'こんにちは', '안녕하세요', 'שלום', 'مرحبا', 'नमस्ते', 'Olá', 'Ciao'
  ];
  const greetingEl = document.querySelector('.greeting');
  let greetIndex = 0;
  function rotateGreeting() {
    if (!greetingEl) return;
    greetIndex = (greetIndex + 1) % greetings.length;
    greetingEl.textContent = greetings[greetIndex];
    greetingEl.classList.add('flash');
    setTimeout(() => greetingEl.classList.remove('flash'), 900);
  }
  // rotate every 3 seconds
  setInterval(rotateGreeting, 3000);

  // Expand/collapse project details when short description clicked or activated
  function toggleProjectDetails(el) {
    const details = el.parentElement.querySelector('.project-details');
    const short = el;
    if (!details) return;
    const isOpen = details.classList.toggle('open');
    details.setAttribute('aria-hidden', String(!isOpen));
    short.setAttribute('aria-expanded', String(isOpen));
  }

  document.querySelectorAll('.project-short').forEach(short => {
    short.addEventListener('click', () => toggleProjectDetails(short));
    short.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleProjectDetails(short);
      }
    });
  });

  // Hook up project-download links: if data-file attr set, update href
  document.querySelectorAll('.project-download').forEach(link => {
    const file = link.dataset.file;
    if (file) link.href = file;
  });

  // Skills visual: staggered entrance animation
  const skillsGrid = document.querySelector('.skills-visual-grid');
  if (skillsGrid) {
    const bubbles = Array.from(skillsGrid.querySelectorAll('.skill-bubble'));
    bubbles.forEach((b, i) => {
      b.style.setProperty('--i', i);
      b.dataset.index = i;
    });
    // small timeout to allow CSS transition
    setTimeout(() => skillsGrid.classList.add('loaded'), 120);
  }

  // Reveal skillicons image with shimmer and small parallax effect
  const skillsWrap = document.querySelector('.skillsicons-wrap');
  const skillsImg = document.querySelector('.skillsicons-img');
  if (skillsWrap && skillsImg) {
    const reveal = () => {
      skillsWrap.classList.add('revealed');
      // remove only the image observer after reveal so we don't stop the global observer
      try { if (imgObserver) imgObserver.disconnect(); } catch (e) { /* ignore if not defined */ }
    };

    // reveal on intersection
    const imgObserver = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) reveal(); });
    }, { threshold: 0.2 });
    imgObserver.observe(skillsWrap);

    // mouse parallax
    skillsWrap.addEventListener('mousemove', (e) => {
      const rect = skillsWrap.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const dy = (e.clientY - rect.top) / rect.height - 0.5;
      skillsImg.style.transform = `translate3d(${dx * 8}px, ${dy * 6}px, 0) scale(1.02)`;
    });
    skillsWrap.addEventListener('mouseleave', () => {
      skillsImg.style.transform = '';
    });
  }

  // Resume download fallback: if resume file missing, disable link gracefully
  const resumeLink = document.getElementById('download-resume');
  if (resumeLink) {
    resumeLink.addEventListener('click', (e) => {
      // Let browser attempt download; if file missing server returns 404.
      // Optionally we could check via fetch and warn, but keeping it simple.
    });
  }

  // Video modal open/close handlers
  const videoModal = document.getElementById('video-modal');
  const videoIframe = document.getElementById('video-iframe');
  const openVideoBtns = document.querySelectorAll('.open-video-btn');

  function openVideo(url) {
    if (!videoModal || !videoIframe) return;
    // set src lazily to avoid loading before user interaction
    videoIframe.src = url;
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Move focus into modal for accessibility
    const closeBtn = videoModal.querySelector('.video-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeVideo() {
    if (!videoModal || !videoIframe) return;
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    // remove src to stop playback and free resources
    videoIframe.src = '';
    document.body.style.overflow = '';
  }

  openVideoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const url = btn.getAttribute('data-video-src');
      if (url) openVideo(url);
    });
  });

  // close on elements with [data-close] (backdrop and close button)
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target && e.target.hasAttribute && e.target.hasAttribute('data-close')) {
        closeVideo();
      }
    });
  }

  // close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('open')) {
      closeVideo();
    }
  });

});
// Performance optimization: debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Additional scroll-based animations can be added here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Preload animations for better performance
document.addEventListener('DOMContentLoaded', () => {
  // Force layout recalculation for smoother animations
  document.body.offsetHeight;
  
  // Add loaded class to body for any additional styling
  document.body.classList.add('loaded');
});