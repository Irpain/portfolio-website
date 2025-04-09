// Function to toggle the mobile menu
function toggleMenu() {
  const menu = document.querySelector('.menu-links');
  const icon = document.querySelector('.hamburger-icon');
  menu.classList.toggle('open');
  icon.classList.toggle('open');

  // Toggle menu visibility with animation
  if (menu.classList.contains('open')) {
      menu.style.display = 'block';
      setTimeout(() => {
          menu.style.opacity = '1';
          menu.style.transform = 'translateY(0)';
      }, 10);
  } else {
      menu.style.opacity = '0';
      menu.style.transform = 'translateY(-10px)';
      setTimeout(() => {
          menu.style.display = 'none';
      }, 300);
  }
}

// Debounce utility function to improve performance on scroll events
function debounce(func, wait = 15, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
          });
      }
  });
});

// Intersection Observer to add animations when sections enter the viewport
const observerOptions = {
  threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('visible');
      }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Add scroll-based header styling with debounce for performance
window.addEventListener('scroll', debounce(() => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
      header.classList.add('scrolled');
  } else {
      header.classList.remove('scrolled');
  }
}));

// Dark mode is enabled by default
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('dark-theme');

  // Create scroll-to-top button
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollToTopBtn);
  
  // Show/hide scroll-to-top button on scroll
  window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
          scrollToTopBtn.classList.add('visible');
      } else {
          scrollToTopBtn.classList.remove('visible');
      }
  });
  
  // Scroll to top when the button is clicked
  scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});