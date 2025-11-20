document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Smooth Scroll for Anchor Links
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

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Pricing Toggle Logic
    const pricingToggle = document.getElementById('pricing-toggle');
    const priceAmounts = document.querySelectorAll('.pricing-card .amount');
    const deviceCounts = document.querySelectorAll('.device-count');

    if (pricingToggle) {
        pricingToggle.addEventListener('change', function () {
            const isPremium = this.checked;

            // Update Prices
            priceAmounts.forEach(amount => {
                if (isPremium) {
                    amount.textContent = amount.dataset.premium;
                } else {
                    amount.textContent = amount.dataset.standard;
                }
            });

            // Update Device Counts
            deviceCounts.forEach(count => {
                if (isPremium) {
                    count.textContent = 'Works on 2 Devices';
                    count.style.color = 'var(--color-accent)';
                    count.style.fontWeight = '700';
                } else {
                    count.textContent = 'Works on 1 Device';
                    count.style.color = '';
                    count.style.fontWeight = '';
                }
            });
        });
    }
});
