document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // General Scroll Reveal (Fade in up)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // Scrollytelling Logic - Smooth Movie Effect
    const scrollyWrapper = document.querySelector('.scrollytelling-wrapper');
    const scrollyImages = document.querySelectorAll('.scrolly-img');
    const scrollyTexts = document.querySelectorAll('.scrolly-text');
    const progressBar = document.getElementById('scrolly-progress');
    
    if (scrollyWrapper && scrollyImages.length > 0) {
        window.addEventListener('scroll', () => {
            const wrapperRect = scrollyWrapper.getBoundingClientRect();
            const scrollPx = -wrapperRect.top;
            const scrollableHeight = scrollyWrapper.offsetHeight - window.innerHeight;
            
            let progress = scrollPx / scrollableHeight;
            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;
            
            if(progressBar) {
                progressBar.style.width = `${progress * 100}%`;
            }

            const totalImages = scrollyImages.length; 
            const currentStepFloat = progress * (totalImages - 1); 
            const activeIndex = Math.floor(currentStepFloat); 
            
            // Apply ultra-smooth overlapping transitions
            scrollyImages.forEach((img, index) => {
                let opacity = 0;
                let scale = 1.0;
                let blur = 0;
                
                const distance = index - currentStepFloat;
                
                if (Math.abs(distance) < 1.2) {
                    opacity = 1 - Math.abs(distance) * 0.8; 
                    if (opacity > 1) opacity = 1;
                    if (opacity < 0) opacity = 0;
                }
                
                scale = 1.1 - (distance * 0.15);
                if (scale < 0.8) scale = 0.8;
                if (scale > 1.4) scale = 1.4;

                if (Math.abs(distance) > 0.4) {
                    blur = (Math.abs(distance) - 0.4) * 15;
                }
                
                img.style.opacity = opacity;
                img.style.transform = `scale(${scale})`;
                img.style.filter = `blur(${blur}px)`;
            });

            // Smooth Text Transitions
            scrollyTexts.forEach((text, index) => {
                const distance = index - currentStepFloat;
                
                let textOpacity = 1 - Math.abs(distance) * 1.5;
                if (textOpacity < 0) textOpacity = 0;
                if (textOpacity > 1) textOpacity = 1;
                
                const translateY = -50 - (distance * 15);
                
                text.style.opacity = textOpacity;
                text.style.transform = `translateY(${translateY}%) translateX(0)`;
            });
        });
    }

    // =========================================
    // Cookie Banner Logic
    // =========================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const essentialBtn = document.getElementById('accept-essential');

    if (cookieBanner && acceptBtn && essentialBtn) {
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 1000);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'all');
            // Hier würden später Tracking-Scripte (Google Analytics, Facebook Pixel) geladen werden
            cookieBanner.classList.remove('show');
        });

        essentialBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'essential');
            cookieBanner.classList.remove('show');
        });
    }
});
