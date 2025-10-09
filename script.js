// ============================================
// VEYIL SOLUTIONS - CUSTOM JAVASCRIPT
// ============================================

// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    });
});

// ============================================
// 2. SMOOTH SCROLLING
// ============================================

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Helper function to scroll to a section by ID
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Helper function to scroll to contact section
function scrollToContact() {
    scrollToSection('contact');
}

// ============================================
// 3. NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// 4. CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('https://formspree.io/f/xanpdzgr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showToast("Message sent successfully! We'll get back to you soon.", "success");
                contactForm.reset();
            } else {
                showToast("Failed to send message. Please try again later.", "error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            showToast("An error occurred. Please try again later.", "error");
        }
    });
}


// ============================================
// 5. TOAST NOTIFICATION
// ============================================

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    
    // Set message
    toast.textContent = message;
    
    // Set background color based on type
    if (type === 'success') {
        toast.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        toast.style.backgroundColor = '#ef4444';
    } else {
        toast.style.backgroundColor = '#0D1B2A';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// 6. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ============================================

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate
const animatedElements = document.querySelectorAll('.service-card, .feature-card, .portfolio-item, .stat');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeInObserver.observe(el);
});

// ============================================
// 7. PORTFOLIO HOVER EFFECTS
// ============================================

// Add click handlers for portfolio items (mobile)
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        // In a real application, this would open a modal or navigate to project details
        console.log('Portfolio item clicked');
    });
});

// ============================================
// 8. LAZY LOADING IMAGES
// ============================================

// Lazy load images for better performance
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
} else {
    // Fallback for browsers that don't support native lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img');
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 9. ACTIVE NAVIGATION LINK
// ============================================

// Highlight active section in navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ============================================
// 10. FORM VALIDATION
// ============================================

// Real-time form validation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    // Add validation on blur
    input.addEventListener('blur', () => {
        validateInput(input);
    });
    
    // Remove error on input
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            input.classList.remove('error');
        }
    });
});

function validateInput(input) {
    const value = input.value.trim();
    
    // Check if empty
    if (input.hasAttribute('required') && value === '') {
        input.classList.add('error');
        return false;
    }
    
    // Validate email
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            input.classList.add('error');
            return false;
        }
    }
    
    input.classList.remove('error');
    return true;
}

// Add error styles dynamically
const style = document.createElement('style');
style.textContent = `
    .contact-form input.error,
    .contact-form textarea.error {
        border-color: #ef4444;
    }
`;
document.head.appendChild(style);

// ============================================
// 11. BUTTON RIPPLE EFFECT
// ============================================

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 600ms ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// 12. INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Veyil Solutions website loaded successfully!');
    
    // Initialize Lucide icons if not already initialized
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Set initial active nav link
    setActiveNavLink();
    
    // Add smooth entrance animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ============================================
// 13. UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Use throttled scroll for better performance
window.addEventListener('scroll', throttle(() => {
    // Scroll event handlers
}, 100));

// ============================================
// 14. ACCESSIBILITY IMPROVEMENTS
// ============================================

// Keyboard navigation for mobile menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            mobileMenuBtn.click();
        }
    });
}

// Escape key to close mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
});

// Focus management for modals and menus
document.addEventListener('focusin', (e) => {
    if (mobileMenu.classList.contains('active')) {
        const focusableElements = mobileMenu.querySelectorAll('a, button, input, select, textarea');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Trap focus within mobile menu
        if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
            firstElement.focus();
        }
    }
});

// ============================================
// 15. PERFORMANCE MONITORING (OPTIONAL)
// ============================================

// Log page load performance
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});

// ============================================
// 16. EXTERNAL INTEGRATIONS PLACEHOLDER
// ============================================

// Google Analytics integration (add your tracking ID)
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR-GA-TRACKING-ID');
*/

// Facebook Pixel integration
/*
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR-PIXEL-ID');
fbq('track', 'PageView');
*/

// ============================================
// END OF SCRIPT
// ============================================
