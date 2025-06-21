document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar Toggle Functionality ---
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('aside');
    const body = document.querySelector('body');
    const mainOverlay = document.querySelector('.main-overlay');

    const toggleSidebar = () => {
        if (sidebar && body && hamburger) {
            sidebar.classList.toggle('open');
            body.classList.toggle('sidebar-open');
            hamburger.classList.toggle('is-active');
        }
    };

    if (hamburger && sidebar && mainOverlay) {
        hamburger.addEventListener('click', toggleSidebar);
        mainOverlay.addEventListener('click', toggleSidebar);
    }

    // --- Active Link Highlighting ---
    const sidebarLinks = document.querySelectorAll('aside .Links a');
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';

    sidebarLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.parentElement.classList.add('activeLink');
        }
    });

    // --- Swiper Initialization for Desktop ---
    if (window.innerWidth > 768 && document.querySelector('.mySwiper')) {
        new Swiper(".mySwiper", {
            direction: "vertical",
            mousewheel: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
    }

    // --- Contact Form Submission ---
    // This logic has been moved to contact.js
});

// --- Coming Soon Alert ---
function showComingSoon(feature) {
    Swal.fire({
        title: 'Coming Soon!',
        text: `${feature} will be available soon. Stay tuned!`,
        icon: 'info',
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#88ed99',
        background: '#343a40',
        color: '#ffffff'
    });
}

// --- Navigate function for Swiper (Desktop) ---
function Navigate(indx) {
    if (window.myAppSwiper) {
        document.querySelectorAll(".Links li").forEach(li => li.classList.remove("activeLink"));
        const targetLink = Array.from(document.querySelectorAll(".Links li"))[indx];
        if (targetLink) {
            targetLink.classList.add("activeLink");
            window.myAppSwiper.slideTo(indx, 1000, true);
        }
    }
}

// --- Coming Soon Functionality ---
function showComingSoon(section) {
    let iconClass, title, description;

    if (section === 'Research Paper') {
        iconClass = 'fas fa-flask';
        title = 'Research Paper';
        description = 'My research paper is currently under development. Stay tuned for exciting AI and technology insights!';
    } else if (section === 'Startups') {
        iconClass = 'fas fa-rocket';
        title = 'Startups';
        description = 'I\'m currently exploring some exciting startup ventures. This section will be updated with more details soon!';
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    // Create message box
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        background: linear-gradient(135deg, #343a40, #1a1a1a);
        border: 2px solid #88ed99;
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        box-shadow: 0 0 30px rgba(136, 237, 153, 0.3);
        animation: messageAppear 0.5s ease-out;
        max-width: 400px;
        margin: 20px;
    `;
    
    // Add content
    messageBox.innerHTML = `
        <div style="font-size: 3rem; color: #88ed99; margin-bottom: 20px;">
            <i class="${iconClass}"></i>
        </div>
        <h2 style="color: #ffffff; font-size: 2rem; margin-bottom: 15px; font-weight: 600;">
            ${title}
        </h2>
        <p style="color: #88ed99; font-size: 1.2rem; margin-bottom: 25px; font-weight: 500;">
            Coming Soon!
        </p>
        <p style="color: #cccccc; font-size: 1rem; line-height: 1.5; margin-bottom: 30px;">
            ${description}
        </p>
        <button onclick="closeComingSoon()" style="
            background: linear-gradient(135deg, #88ed99, #3ff43f);
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            color: #1a1a1a;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(136, 237, 153, 0.3);
        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(136, 237, 153, 0.4)'" 
           onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(136, 237, 153, 0.3)'">
            Got it!
        </button>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes messageAppear {
            0% {
                opacity: 0;
                transform: scale(0.8) translateY(-20px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeComingSoon();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeComingSoon();
        }
    });
}

// Function to close the "Coming Soon" message
function closeComingSoon() {
    const overlay = document.querySelector('div[style*="z-index: 10000"]');
    if (overlay) {
        overlay.style.animation = 'messageDisappear 0.3s ease-in forwards';
        
        // Add disappear animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes messageDisappear {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}