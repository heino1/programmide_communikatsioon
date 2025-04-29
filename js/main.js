// Main JavaScript file for Business Information Systems website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active state in sidebar
                if (this.closest('.sidebar')) {
                    document.querySelectorAll('.sidebar a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Expandable definitions
    const definitionTerms = document.querySelectorAll('.definition-term');
    
    if (definitionTerms) {
        definitionTerms.forEach(term => {
            term.addEventListener('click', function() {
                this.classList.toggle('active');
                const definition = this.nextElementSibling;
                if (definition.style.maxHeight) {
                    definition.style.maxHeight = null;
                } else {
                    definition.style.maxHeight = definition.scrollHeight + "px";
                }
            });
        });
    }
    
    // Image gallery
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (galleryImages && lightbox && lightboxImg) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                lightboxImg.src = this.src;
                lightbox.classList.add('active');
            });
        });
        
        if (lightboxClose) {
            lightboxClose.addEventListener('click', function() {
                lightbox.classList.remove('active');
            });
        }
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const timelineObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
    
    // Quiz functionality
    const quizForms = document.querySelectorAll('.quiz-form');
    
    if (quizForms) {
        quizForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const questions = this.querySelectorAll('.quiz-question');
                let score = 0;
                let total = questions.length;
                
                questions.forEach(question => {
                    const selectedOption = question.querySelector('input[type="radio"]:checked');
                    const correctOption = question.querySelector('input[data-correct="true"]');
                    
                    if (selectedOption) {
                        if (selectedOption === correctOption) {
                            score++;
                            question.classList.add('correct');
                        } else {
                            question.classList.add('incorrect');
                        }
                    }
                });
                
                const resultElement = this.querySelector('.quiz-result');
                if (resultElement) {
                    resultElement.textContent = `Sinu tulemus: ${score}/${total}`;
                    resultElement.style.display = 'block';
                }
            });
        });
    }
    
    // Language toggle
    const langToggle = document.querySelector('.lang-toggle');
    const estonianElements = document.querySelectorAll('.lang-et');
    const englishElements = document.querySelectorAll('.lang-en');
    
    // Set Estonian as default language on page load
    if (estonianElements && englishElements) {
        // Show Estonian by default
        estonianElements.forEach(el => el.style.display = 'block');
        englishElements.forEach(el => el.style.display = 'none');
        
        // Make sure toggle is unchecked by default (Estonian)
        if (langToggle) {
            langToggle.checked = false;
        }
    }
    
    if (langToggle && estonianElements && englishElements) {
        langToggle.addEventListener('change', function() {
            if (this.checked) {
                // Show English
                estonianElements.forEach(el => el.style.display = 'none');
                englishElements.forEach(el => el.style.display = 'block');
            } else {
                // Show Estonian
                estonianElements.forEach(el => el.style.display = 'block');
                englishElements.forEach(el => el.style.display = 'none');
            }
        });
    }
});
