// script.js - Shared interactions for DevMastery site

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle: single mobileMenu element (pages each include an element with id="mobileMenu")
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    function toggleMobileMenu() {
        if (!mobileMenu) return;
        const open = mobileMenu.getAttribute('aria-hidden') === 'false';
        mobileMenu.setAttribute('aria-hidden', String(!open));
        mobileMenu.style.display = open ? 'none' : 'block';
    }

    // Bind the visible hamburger on page
    document.querySelectorAll('.hamburger').forEach(h => {
        h.addEventListener('click', toggleMobileMenu);
    });

    // Close mobile menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 980 && mobileMenu) mobileMenu.style.display = 'none';
    });

    // Intersection Observer for simple fade-in-up animations
    const animTargets = document.querySelectorAll('.section-animate');
    const io = new IntersectionObserver((entries, ob) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity .7s ease-out, transform .7s cubic-bezier(.2,.9,.2,1)';
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                ob.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    animTargets.forEach(t => {
        t.style.opacity = 0;
        t.style.transform = 'translateY(18px)';
        io.observe(t);
    });

    // Smooth anchor scrolling (if any)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Contact form (fake demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const status = document.getElementById('formStatus');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const name = formData.get('name')?.toString().trim();
            const email = formData.get('email')?.toString().trim();
            const message = formData.get('message')?.toString().trim();

            // basic validation
            if (!name || !email || !message) {
                status.textContent = 'Please fill all fields before sending.';
                status.style.color = '#ffcc00';
                return;
            }
            // simulate async submit (fake)
            status.style.color = '#cbd5e1';
            status.textContent = 'Sending...';
            setTimeout(() => {
                status.style.color = 'lightgreen';
                status.textContent = `Thanks ${name}! (This is a demo — no data was sent.)`;
                form.reset();
            }, 900);
        });
    }

    // Simple demo for Sign In / Sign Up
    const signInBtn = document.getElementById('signin-btn');
    const signUpBtn = document.getElementById('signup-btn');
    if (signInBtn) signInBtn.addEventListener('click', () => alert('Sign In is demo-only for this static landing.'));
    if (signUpBtn) signUpBtn.addEventListener('click', () => alert('Sign Up is demo-only for this static landing.'));
});
