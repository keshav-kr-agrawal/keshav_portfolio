// 3D Dynamic Loader JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loaderOverlay = document.getElementById('loader-overlay');
    if (!loaderOverlay) return;
    
    // Only show loader on the home page
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                      window.location.pathname.endsWith('/') || 
                      window.location.pathname === '';
    
    if (!isHomePage) {
        loaderOverlay.style.display = 'none';
        loaderOverlay.style.visibility = 'hidden';
        return;
    }
    
    // Check if this is a page refresh or first visit
    const navigationEntries = performance.getEntriesByType('navigation');
    const isPageRefresh = navigationEntries.length > 0 && 
                         (navigationEntries[0].type === 'reload' || 
                          navigationEntries[0].type === 'back_forward');
    
    // Check if we've shown the loader in this session
    const hasShownLoader = sessionStorage.getItem('hasShownLoader');
    
    if (isPageRefresh || !hasShownLoader) {
        // Show loader
        loaderOverlay.style.display = 'flex';
        loaderOverlay.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
        sessionStorage.setItem('hasShownLoader', 'true');
        
        // Hide loader after animation completes
        setTimeout(() => {
            loaderOverlay.style.display = 'none';
            loaderOverlay.style.visibility = 'hidden';
            document.body.style.overflow = 'auto';
        }, 4000); // Match this with your animation duration
    } else {
        // Hide loader if navigating between pages
        loaderOverlay.style.display = 'none';
        loaderOverlay.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
    }

    const progressCircle = document.querySelector('.progress-ring-circle');
    const progressText = document.getElementById('progress-text');
    const hackathonCounter = document.getElementById('hackathon-counter');
    const projectCounter = document.getElementById('project-counter');
    const dsaCounter = document.getElementById('dsa-counter');
    const researchCounter = document.getElementById('research-counter');

    const circumference = 2 * Math.PI * progressCircle.r.baseVal.value;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    const counterTargets = { hackathon: 2, project: 7, dsa: 250, research: 0 };
    const loaderDuration = 4000; // 4 seconds total

    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    animateCounter(hackathonCounter, counterTargets.hackathon, loaderDuration);
    animateCounter(projectCounter, counterTargets.project, loaderDuration);
    animateCounter(dsaCounter, counterTargets.dsa, loaderDuration);
    animateCounter(researchCounter, counterTargets.research, loaderDuration);

    let startTime = null;
    function progressAnimation(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        let progress = Math.min(elapsedTime / loaderDuration, 1);
        
        const offset = circumference - progress * circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressText.textContent = `${Math.floor(progress * 100)}%`;

        if (progress < 1) {
            requestAnimationFrame(progressAnimation);
        } else {
            progressText.textContent = '100%';
            progressCircle.style.strokeDashoffset = 0;
            
            setTimeout(() => {
                loaderOverlay.style.opacity = '0';
                loaderOverlay.style.transform = 'scale(1.1)';
                loaderOverlay.style.filter = 'blur(5px)';
                setTimeout(() => {
                    loaderOverlay.style.display = 'none';
                }, 800);
            }, 500);
        }
    }

    requestAnimationFrame(progressAnimation);

    // Add particle interaction
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.addEventListener('animationiteration', () => {
            // Randomize particle position on each iteration
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            particle.style.left = randomX + '%';
            particle.style.top = randomY + '%';
        });
    });
    
    // Add logo interaction
    const logoContainer = document.querySelector('.loader-logo-container');
    if (logoContainer) {
        logoContainer.addEventListener('mouseenter', () => {
            const logoImage = logoContainer.querySelector('.loader-logo-image');
            logoImage.style.animationPlayState = 'paused';
        });
        
        logoContainer.addEventListener('mouseleave', () => {
            const logoImage = logoContainer.querySelector('.loader-logo-image');
            logoImage.style.animationPlayState = 'running';
        });
    }
    
    // Add carousel interaction
    const carouselItems = document.querySelectorAll('.carousel-item');
    carouselItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const track = document.querySelector('.carousel-track');
            track.style.animationPlayState = 'paused';
        });
        
        item.addEventListener('mouseleave', () => {
            const track = document.querySelector('.carousel-track');
            track.style.animationPlayState = 'running';
        });
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add mouse movement effect to loader scene
    const loaderScene = document.querySelector('.loader-scene');
    
    if (loaderScene) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const rotateX = (y - 0.5) * 10;
            const rotateY = (x - 0.5) * 10;
            
            loaderScene.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Reset transform on mouse leave
        document.addEventListener('mouseleave', () => {
            loaderScene.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
    
    // Add floating icon interactions
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.5) rotate(360deg)';
            icon.style.transition = 'all 0.5s ease';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Add keyboard interaction for testing
document.addEventListener('keydown', (e) => {
    if (e.key === 'l' || e.key === 'L') {
        // Show loader for testing (only in development)
        const loaderOverlay = document.getElementById('loader-overlay');
        if (loaderOverlay) {
            loaderOverlay.style.display = 'flex';
            loaderOverlay.style.opacity = '1';
        }
    }
});

// Add touch interactions for mobile
document.addEventListener('touchstart', function(e) {
    const loaderScene = document.querySelector('.loader-scene');
    if (loaderScene && e.touches.length === 1) {
        const touch = e.touches[0];
        const x = touch.clientX / window.innerWidth;
        const y = touch.clientY / window.innerHeight;
        
        const rotateX = (y - 0.5) * 5;
        const rotateY = (x - 0.5) * 5;
        
        loaderScene.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
});

document.addEventListener('touchend', function() {
    const loaderScene = document.querySelector('.loader-scene');
    if (loaderScene) {
        loaderScene.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
}); 