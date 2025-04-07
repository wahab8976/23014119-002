/**
 * MediCare Hospital Website Scripts
 */

// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize service category tabs
    initCategoryTabs();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize form validation
    initFormValidation();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    // If menu toggle exists
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Change toggle button appearance
            this.classList.toggle('active');
            
            // When active, transform spans to create an X
            if (this.classList.contains('active')) {
                this.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg)';
                this.querySelector('span:nth-child(1)').style.top = '15px';
                this.querySelector('span:nth-child(2)').style.opacity = '0';
                this.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg)';
                this.querySelector('span:nth-child(3)').style.top = '15px';
            } else {
                this.querySelector('span:nth-child(1)').style.transform = 'rotate(0)';
                this.querySelector('span:nth-child(1)').style.top = '6px';
                this.querySelector('span:nth-child(2)').style.opacity = '1';
                this.querySelector('span:nth-child(3)').style.transform = 'rotate(0)';
                this.querySelector('span:nth-child(3)').style.top = '24px';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navList.contains(event.target) || menuToggle.contains(event.target);
            
            if (!isClickInside && navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // Reset menu toggle appearance
                menuToggle.querySelector('span:nth-child(1)').style.transform = 'rotate(0)';
                menuToggle.querySelector('span:nth-child(1)').style.top = '6px';
                menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
                menuToggle.querySelector('span:nth-child(3)').style.transform = 'rotate(0)';
                menuToggle.querySelector('span:nth-child(3)').style.top = '24px';
            }
        });
    }
}

/**
 * Services Category Tabs
 */
function initCategoryTabs() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all content sections
                const contentSections = document.querySelectorAll('.category-content');
                contentSections.forEach(section => section.classList.remove('active'));
                
                // Show the corresponding content section
                const targetContent = document.getElementById(this.getAttribute('data-target'));
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Toggle active class on the clicked item
                item.classList.toggle('active');
                
                // Update the toggle icon
                const toggle = this.querySelector('.faq-toggle');
                if (item.classList.contains('active')) {
                    toggle.textContent = '−';
                } else {
                    toggle.textContent = '+';
                }
                
                // Optionally close other items when one is opened
                /*
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-toggle').textContent = '+';
                    }
                });
                */
            });
        });
    }
}

/**
 * Form Validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'var(--danger-color)';
                    
                    // Add error message if not already present
                    let errorMsg = field.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = 'var(--danger-color)';
                        errorMsg.style.fontSize = '0.8rem';
                        errorMsg.style.marginTop = '4px';
                        field.parentNode.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'This field is required';
                } else {
                    field.style.borderColor = 'var(--border-color)';
                    
                    // Remove error message if exists
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                    
                    // Email validation
                    if (field.type === 'email' && !isValidEmail(field.value)) {
                        isValid = false;
                        field.style.borderColor = 'var(--danger-color)';
                        
                        let errorMsg = field.parentNode.querySelector('.error-message');
                        if (!errorMsg) {
                            errorMsg = document.createElement('div');
                            errorMsg.className = 'error-message';
                            errorMsg.style.color = 'var(--danger-color)';
                            errorMsg.style.fontSize = '0.8rem';
                            errorMsg.style.marginTop = '4px';
                            field.parentNode.appendChild(errorMsg);
                        }
                        errorMsg.textContent = 'Please enter a valid email address';
                    }
                }
            });
            
            // If form is valid, show success message
            if (isValid) {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.backgroundColor = 'var(--secondary-color)';
                successMessage.style.color = 'white';
                successMessage.style.padding = '15px';
                successMessage.style.borderRadius = 'var(--border-radius-md)';
                successMessage.style.marginTop = '20px';
                successMessage.style.textAlign = 'center';
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                
                // Add success message after form
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        // Remove error styling on input
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = 'var(--border-color)';
                
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
    }
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Doctor search functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const specialty = document.getElementById('specialty').value;
            const searchName = document.getElementById('search').value.toLowerCase();
            
            // Get all doctor sections
            const specialtySections = document.querySelectorAll('.specialty-section');
            
            // If no filters are applied, show all
            if (!specialty && !searchName) {
                specialtySections.forEach(section => {
                    section.style.display = 'block';
                });
                return;
            }
            
            // Filter by specialty
            specialtySections.forEach(section => {
                // Hide all sections initially
                section.style.display = 'none';
                
                // If specialty filter is applied
                if (specialty) {
                    // Check if section ID matches selected specialty
                    if (section.id === specialty + '-section') {
                        section.style.display = 'block';
                    }
                } else {
                    // If only name search is applied, check all sections
                    section.style.display = 'block';
                }
                
                // If name search is applied
                if (searchName) {
                    // Get all doctor cards in this section
                    const doctorCards = section.querySelectorAll('.doctor-card');
                    let foundInSection = false;
                    
                    doctorCards.forEach(card => {
                        // Hide all cards initially
                        card.style.display = 'none';
                        
                        // Get doctor name
                        const doctorName = card.querySelector('h4').textContent.toLowerCase();
                        
                        // If name matches search, show card
                        if (doctorName.includes(searchName)) {
                            card.style.display = 'flex';
                            foundInSection = true;
                        }
                    });
                    
                    // If no doctors found in this section, hide it
                    if (!foundInSection) {
                        section.style.display = 'none';
                    }
                }
            });
        });
    }
});

/**
 * Smooth scrolling for anchor links
 */
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll smoothly to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
});
