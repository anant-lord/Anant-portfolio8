// script.js
// ANANT - TGDA Portfolio JavaScript

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupAnimations();
        this.setupEventListeners();
        this.animateSkillBars();
        console.log('🔥 ANANT Portfolio Loaded!');
    }

    // Smooth scrolling for navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Animation setup
    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate skill bars when about section is visible
                    if (entry.target.id === 'about') {
                        this.animateSkillBars();
                    }
                }
            });
        }, observerOptions);

        // Observe sections for animation
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }

    // Skill bars animation
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.progress-bar');
        skillBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, index * 200);
        });
    }

    // Event listeners setup
    setupEventListeners() {
        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
        }

        // Project card interactions
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Physical stats hover effects
        const physicalStats = document.querySelectorAll('.physical-stat');
        physicalStats.forEach(stat => {
            stat.addEventListener('mouseenter', () => {
                stat.style.transform = 'translateY(-5px)';
            });
            
            stat.addEventListener('mouseleave', () => {
                stat.style.transform = 'translateY(0)';
            });
        });
    }

    // Handle contact form submission
    handleFormSubmission() {
        const form = document.getElementById('contactForm');
        const formData = new FormData(form);
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('🎉 Message sent successfully! I\'ll get back to you soon.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

// CV Download function
function downloadCV() {
    alert('📄 CV download starting...\n(In real implementation, this would download your CV file)');
    
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'ANANT_CV.pdf';
    link.click();
    
    // Analytics or tracking can be added here
    console.log('CV download initiated');
}

// View Projects function
function viewProjects() {
    const projectsSection = document.getElementById('projects');
    projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Typewriter effect for hero section (optional enhancement)
function initTypewriter() {
    const texts = [
        "CODE & COMBAT SPECIALIST",
        "FULL-STACK DEVELOPER",
        "PROBLEM SOLVER",
        "TGDA WARRIOR"
    ];
    
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    
    function type() {
        if (count === texts.length) {
            count = 0;
        }
        
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        document.querySelector('.title-main').textContent = letter;
        
        if (letter.length === currentText.length) {
            setTimeout(() => {
                index = 0;
                count++;
                type();
            }, 2000);
        } else {
            setTimeout(type, 100);
        }
    }
    
    // Uncomment to enable typewriter effect
    // type();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Optional: Initialize typewriter effect
    // initTypewriter();
});

// Console welcome message
console.log(`%c
🔥 ANANT PORTFOLIO 🔥
TGDA Warrior - Code & Combat Specialist
Portfolio Successfully Loaded!
Ready to conquer the digital world! 💪
`, 'background: linear-gradient(45deg, #ff6b6b, #4ecdc4); color: white; padding: 20px; font-size: 16px; font-weight: bold; border: 2px solid #ff6b6b;');

// Additional utility functions
const Utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Format phone number
    formatPhone: (phone) => {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Portfolio;
                  }
