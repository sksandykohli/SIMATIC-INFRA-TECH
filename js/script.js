// ========== MOBILE MENU TOGGLE ==========
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickOnMenu = event.target.closest('.nav-container');
            if (!isClickOnMenu && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }
});

// ========== CLIENTS CAROUSEL ==========
document.addEventListener('DOMContentLoaded', function() {
    const clientsTrack = document.querySelector('.clients-track');
    const clientsPrevBtn = document.getElementById('clientsPrev');
    const clientsNextBtn = document.getElementById('clientsNext');
    
    if (clientsTrack && clientsPrevBtn && clientsNextBtn) {
        let scrollPosition = 0;
        const scrollAmount = 220; // Item width + gap
        
        clientsNextBtn.addEventListener('click', function() {
            scrollPosition += scrollAmount;
            clientsTrack.style.animation = 'none';
            clientsTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });
        
        clientsPrevBtn.addEventListener('click', function() {
            scrollPosition = Math.max(0, scrollPosition - scrollAmount);
            clientsTrack.style.animation = 'none';
            clientsTrack.style.transform = `translateX(-${scrollPosition}px)`;
        });
    }
});

// ========== HERO IMAGE SLIDER ==========
function initSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');

    if (slides.length === 0) {
        console.log('No slides found');
        return;
    }

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Manual navigation with dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
}

// Initialize slider when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
} else {
    initSlider();
}

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Manual navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        nav.style.background = 'rgba(15, 23, 42, 0.8)';
    }
});

// ========== ANIMATION ON SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and stat items
document.querySelectorAll('.service-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Product Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Add transition styles to product cards
    productCards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
    });
});