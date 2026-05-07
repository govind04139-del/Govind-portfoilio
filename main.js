document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Dynamic Typing Effect ---
    const texts = [
        "Cloud & DevOps Engineer",
        "AWS Specialist",
        "Terraform Learner",
        "Kubernetes Learner",
        "Infrastructure Automator"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById("typing-text");
    
    function typeEffect() {
        if(!typingElement) return;

        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 40 : 80;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 400; // Pause before start of new word
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect
    typeEffect();


    // --- 2. Navbar Scroll Effect & Scroll Progress ---
    const navbar = document.getElementById('navbar');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        // Sticky Navbar Glass effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Scroll Progress Bar calculation
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if(scrollIndicator) scrollIndicator.style.width = scrolled + "%";
        
        // Back to top button visibility
        if(backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });
    
    // Back to top scroll action
    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // --- 3. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = hamburger.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when a nav link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                if(navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    if(icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });
    }


    // --- 4. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add appearance class
                entry.target.classList.add('appear');
                
                // Trigger Skill Bar Fill if it's a skill category
                if (entry.target.classList.contains('skill-category')) {
                    const fills = entry.target.querySelectorAll('.progress-fill');
                    fills.forEach(fill => {
                        fill.style.width = fill.getAttribute('data-width');
                    });
                }
                
                // Unobserve so animation only happens once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Fetch all elements that should animate on scroll
    const animatables = document.querySelectorAll('.animate-on-scroll');
    animatables.forEach(el => {
        scrollObserver.observe(el);
    });
});

// --- 5. Copy Email Function ---
window.copyEmail = function() {
    const emailText = document.getElementById("email-text");
    if(!emailText) return;
    
    const email = emailText.innerText;
    
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.getElementById("copy-btn");
        if(btn) {
            const icon = btn.querySelector('i');
            
            btn.classList.add('copied');
            icon.classList.remove('fa-copy', 'far');
            icon.classList.add('fa-check', 'fas');
            
            // Revert back after 2 seconds
            setTimeout(() => {
                btn.classList.remove('copied');
                icon.classList.remove('fa-check', 'fas');
                icon.classList.add('fa-copy', 'far');
            }, 2000);
        }
    }).catch(err => {
        alert("Failed to copy email.");
    });
};

// --- 6. Custom Interactive Cursor Glow ---
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    // Center the 400px glow around the cursor
    cursorGlow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
});

// --- 7. Button Ripple Effect ---
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// --- 8. 3D Tilt Effect on Project Cards ---
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8; // Max 8 degrees
        const rotateY = ((x - centerX) / centerX) * 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none';
        card.style.zIndex = '10';
        card.style.boxShadow = '0 20px 40px rgba(0, 242, 254, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'all 0.4s ease';
        card.style.zIndex = '1';
        card.style.boxShadow = '';
    });
});

// --- 9. Background Parallax Scrolling ---
const backgroundOrbs = document.querySelectorAll('.orb');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    requestAnimationFrame(() => {
        if (backgroundOrbs[0]) backgroundOrbs[0].style.marginTop = `${scrollY * 0.15}px`;
        if (backgroundOrbs[1]) backgroundOrbs[1].style.marginTop = `${scrollY * 0.05}px`;
        if (backgroundOrbs[2]) backgroundOrbs[2].style.marginTop = `${scrollY * 0.25}px`;
    });
});

