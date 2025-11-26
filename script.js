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

    // Payment links mapping: Standard (Basic) and Premium (Pro)
    const paymentLinks = {
        standard: {
            'plan-3m-standard': 'https://whop.com/checkout/plan_Q29B5E7eJz3PN',
            'plan-6m-standard': 'https://whop.com/checkout/plan_Gi5lQlDHOUxjg',
            'plan-12m-standard': 'https://whop.com/checkout/plan_uIYGKgusOd8AU',
            'plan-24m-standard': 'https://whop.com/checkout/plan_xLkcMohmfySKW'
        },
        premium: {
            'plan-3m-standard': 'https://whop.com/checkout/plan_aDDDqiRSrx1CY',
            'plan-6m-standard': 'https://whop.com/checkout/plan_2fwGhs5ljPX7H',
            'plan-12m-standard': 'https://whop.com/checkout/plan_NavsyxHQWpJrm',
            'plan-24m-standard': 'https://whop.com/checkout/plan_N1mXKsxTBefgg'
        }
    };

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

            // Update Payment Links
            const links = isPremium ? paymentLinks.premium : paymentLinks.standard;
            Object.keys(links).forEach(buttonId => {
                const button = document.getElementById(buttonId);
                if (button) {
                    button.href = links[buttonId];
                }
            });
        });
    }

    // Free Trial Form Submission Handler
    const trialForm = document.getElementById('trialForm');
    if (trialForm) {
        trialForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const formMessage = document.getElementById('form-message');
            const originalBtnText = submitBtn.innerHTML;
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '⏳ Submitting...';
            formMessage.style.display = 'none';
            
            // Get form data
            const formData = new FormData(trialForm);
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    formMessage.style.display = 'block';
                    formMessage.style.backgroundColor = '#10b981';
                    formMessage.style.color = '#fff';
                    formMessage.textContent = '✅ Success! Your free trial request has been submitted. Check your email for login credentials!';
                    
                    // Reset form
                    trialForm.reset();
                    
                    // Scroll to message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (error) {
                // Show error message
                formMessage.style.display = 'block';
                formMessage.style.backgroundColor = '#ef4444';
                formMessage.style.color = '#fff';
                formMessage.textContent = '❌ Error: ' + (error.message || 'Failed to submit. Please try again or contact support.');
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // Contact Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('contactSubmitBtn');
            const formMessage = document.getElementById('contact-form-message');
            const originalBtnText = submitBtn.innerHTML;
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '⏳ Sending...';
            formMessage.style.display = 'none';
            
            // Get form data
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    formMessage.style.display = 'block';
                    formMessage.style.backgroundColor = '#10b981';
                    formMessage.style.color = '#fff';
                    formMessage.textContent = '✅ Thank you! Your message has been sent successfully. We will get back to you within 24 hours.';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Scroll to message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (error) {
                // Show error message
                formMessage.style.display = 'block';
                formMessage.style.backgroundColor = '#ef4444';
                formMessage.style.color = '#fff';
                formMessage.textContent = '❌ Error: ' + (error.message || 'Failed to send message. Please try again or contact us directly at support@ultrastreamnow.com');
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // Reseller Form Submission Handler
    const resellerForm = document.getElementById('resellerForm');
    if (resellerForm) {
        resellerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('resellerSubmitBtn');
            const formMessage = document.getElementById('reseller-form-message');
            const originalBtnText = submitBtn.innerHTML;
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '⏳ Submitting Application...';
            formMessage.style.display = 'none';
            
            // Get form data
            const formData = new FormData(resellerForm);
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    formMessage.style.display = 'block';
                    formMessage.style.backgroundColor = '#10b981';
                    formMessage.style.color = '#fff';
                    formMessage.textContent = '✅ Success! Your reseller application has been submitted. Our team will review it and get back to you soon!';
                    
                    // Reset form
                    resellerForm.reset();
                    
                    // Scroll to message
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    throw new Error(data.message || 'Submission failed');
                }
            } catch (error) {
                // Show error message
                formMessage.style.display = 'block';
                formMessage.style.backgroundColor = '#ef4444';
                formMessage.style.color = '#fff';
                formMessage.textContent = '❌ Error: ' + (error.message || 'Failed to submit application. Please try again or contact us directly.');
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
