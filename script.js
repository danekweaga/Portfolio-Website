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
  
  // Typing effect for main title (optional enhancement)
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.opacity = '1';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }
  
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