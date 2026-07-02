// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Section visibility animation on scroll
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const title = entry.target.querySelector('.section-title');
            if (title) title.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// Card animation on scroll
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
});

// Observe all cards with staggered delay
document.querySelectorAll('.skill-card, .project-card, .experience-item, .certification-card, .education-item').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
    cardObserver.observe(card);
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('system-prefers-dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.remove('system-prefers-dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.classList.add('system-prefers-dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Back to top
const showBackToTop = () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
};

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', showBackToTop);
showBackToTop();

const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        if (!name || !email || !subject || !message) {
            contactMessage.textContent = 'Please complete all fields before sending your message.';
            contactMessage.className = 'form-message error';
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            contactMessage.textContent = 'Please enter a valid email address.';
            contactMessage.className = 'form-message error';
            return;
        }

        contactMessage.textContent = 'Thanks! Your message has been prepared. I will respond soon.';
        contactMessage.className = 'form-message success';
        contactForm.reset();
    });
}

const typingElement = document.getElementById('typing-text');
const words = ['AI Engineer', 'Cybersecurity Enthusiast', 'Network Engineer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const type = () => {
    const currentWord = words[wordIndex];
    const displayText = currentWord.substring(0, charIndex);

    if (typingElement) {
        typingElement.textContent = displayText;
    }

    let typeSpeed = isDeleting ? 70 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    charIndex += isDeleting ? -1 : 1;
    setTimeout(type, typeSpeed);
};

type();

const projectsGrid = document.getElementById('projects-grid');
const projectsLoading = document.getElementById('projects-loading');

const renderProjects = (projects) => {
    if (!projectsGrid) return;

    projectsGrid.innerHTML = projects.map(project => `
        <article class="project-card">
            <div class="project-card-icon">
                <img src="${project.icon}" alt="${project.title} icon" aria-hidden="true" />
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p class="project-tech"><strong>Technologies:</strong> ${project.tech.join(', ')}</p>
            <div class="project-badges">
                ${project.badges.map(badge => `<span class="project-badge">${badge}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ''}
                <a href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        </article>
    `).join('');
};

const loadProjects = async () => {
    if (!projectsGrid || !projectsLoading) return;

    try {
        const response = await fetch('projects.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        projectsGrid.innerHTML = `<p class="project-error">Unable to load projects. Please refresh the page.</p>`;
    } finally {
        if (projectsLoading) projectsLoading.style.display = 'none';
    }
};

loadProjects();

/* Profile modal (open on profile photo or badge click) */
const profilePhoto = document.getElementById('profile-photo');
const topBadge = document.getElementById('top-badge');
const profileModal = document.getElementById('profile-modal');
const modalOverlay = profileModal ? profileModal.querySelector('.modal-overlay') : null;
const modalCloseBtn = profileModal ? profileModal.querySelector('.modal-close') : null;

function openProfileModal() {
    if (!profileModal) return;
    profileModal.classList.add('open');
    profileModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
    if (!profileModal) return;
    profileModal.classList.remove('open');
    profileModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (profilePhoto) profilePhoto.addEventListener('click', openProfileModal);
if (topBadge) topBadge.addEventListener('click', openProfileModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeProfileModal);
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProfileModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProfileModal();
});

/* Bubble interactivity: generate many bubbles and small parallax on mousemove */
const heroSection = document.querySelector('.hero');
let bubbles;

function generateBubbles(count = 36) {
    const container = document.querySelector('.bubbles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const b = document.createElement('span');
        b.className = 'bubble';
        b.setAttribute('aria-hidden', 'true');
        const size = Math.floor(16 + Math.random() * 64); // 16-80px
        b.style.width = `${size}px`;
        b.style.height = `${size}px`;
        b.style.left = `${(Math.random() * 100).toFixed(2)}%`;
        b.style.top = `${(Math.random() * 100).toFixed(2)}%`;
        b.style.opacity = (0.35 + Math.random() * 0.6).toFixed(2);
        b.style.animationDuration = `${(12 + Math.random() * 18).toFixed(2)}s`;
        b.style.animationDelay = `${(Math.random() * 3).toFixed(2)}s`;
        container.appendChild(b);
    }
    bubbles = document.querySelectorAll('.bubble');
}

generateBubbles(40);

if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        bubbles.forEach((b, i) => {
            const depth = (i % 6) + 1;
            const moveX = x * (8 + depth * 2);
            const moveY = y * (6 + depth);
            b.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(${1 + depth * 0.01})`;
        });
    });

    heroSection.addEventListener('mouseleave', () => {
        bubbles.forEach((b) => b.style.transform = 'translate3d(0,0,0)');
    });
}