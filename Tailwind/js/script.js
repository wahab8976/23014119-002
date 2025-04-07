/**
 * MediCare Hospital Website JavaScript - Tailwind CSS Version
 * Main JavaScript file for all interactive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initMobileMenu();
    initCategoryTabs();
    initFaqAccordion();
    initFormValidation();
    initDoctorSearch();
    initSmoothScrolling();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('hidden');
            navList.classList.toggle('flex');
            navList.classList.toggle('flex-col');
        });
    }
}

/**
 * Services Category Tabs
 */
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    const contents = document.querySelectorAll('.category-content');
    
    if (tabs.length > 0 && contents.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');
                
                // Remove active class from all tabs
                tabs.forEach(t => {
                    t.classList.remove('text-primary', 'after:content-[\'\']', 'after:absolute', 'after:bottom-[-1px]', 'after:left-0', 'after:w-full', 'after:h-[3px]', 'after:bg-primary');
                    t.classList.add('text-text-medium');
                });
                
                // Add active class to clicked tab
                tab.classList.remove('text-text-medium');
                tab.classList.add('text-primary', 'after:content-[\'\']', 'after:absolute', 'after:bottom-[-1px]', 'after:left-0', 'after:w-full', 'after:h-[3px]', 'after:bg-primary');
                
                // Hide all content
                contents.forEach(c => {
                    c.classList.add('hidden');
                    c.classList.remove('active');
                });
                
                // Show selected content
                const content = document.getElementById(category);
                if (content) {
                    content.classList.remove('hidden');
                    content.classList.add('active');
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
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            if (question && answer && toggle) {
                question.addEventListener('click', () => {
                    answer.classList.toggle('hidden');
                    toggle.textContent = answer.classList.contains('hidden') ? '+' : '-';
                });
            }
        });
    }
}

/**
 * Form Validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                formStatus.textContent = 'Please fill in all required fields.';
                formStatus.classList.remove('hidden', 'text-green-500');
                formStatus.classList.add('text-danger');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.classList.remove('hidden', 'text-green-500');
                formStatus.classList.add('text-danger');
                return;
            }
            
            // Success message (in a real app, this would be where you'd send the form data to a server)
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            formStatus.classList.remove('hidden', 'text-danger');
            formStatus.classList.add('text-green-500');
            contactForm.reset();
        });
    }
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

/**
 * Doctor search functionality
 */
function initDoctorSearch() {
    const searchButton = document.getElementById('search-button');
    const specialtyFilter = document.getElementById('specialty-filter');
    const nameSearch = document.getElementById('name-search');
    
    if (searchButton && specialtyFilter && nameSearch) {
        searchButton.addEventListener('click', function() {
            const specialty = specialtyFilter.value;
            const name = nameSearch.value.toLowerCase();
            
            // Get all section elements
            const sections = document.querySelectorAll('.specialty-section');
            
            // Handle specialty filtering
            if (specialty === 'all') {
                sections.forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                sections.forEach(section => {
                    if (section.id === specialty + '-section') {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            }
            
            // Handle name filtering
            if (name !== '') {
                const doctorCards = document.querySelectorAll('.doctors-list .flex');
                
                doctorCards.forEach(card => {
                    const doctorName = card.querySelector('h4').textContent.toLowerCase();
                    
                    if (doctorName.includes(name)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            } else {
                const doctorCards = document.querySelectorAll('.doctors-list .flex');
                doctorCards.forEach(card => {
                    card.style.display = 'flex';
                });
            }
        });
    }
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}