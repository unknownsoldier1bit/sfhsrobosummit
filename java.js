document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Toggle ---
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelector('.nav-links-mobile');

    if (mobileMenu && mobileNavLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileNavLinks.classList.toggle('active');
        });
    }

    // --- 2. Active Navigation Link Indicator (Robust Version) ---
    const currentPath = window.location.pathname; // Gets the path, e.g., "/events.html" or "/"
    const navAnchors = document.querySelectorAll('.desktop-nav .nav-links a, .nav-links-mobile a');
    
    navAnchors.forEach(link => {
        // Create a URL object from the link's href to easily get its pathname
        const linkPath = new URL(link.href).pathname;
        link.classList.remove('active');

        // Check for a direct path match
        if (linkPath === currentPath) {
            link.classList.add('active');
        }

        // Special case for the homepage: if the current path is the root ('/'),
        // and the link points to 'index.html', it should be active.
        if (currentPath === '/' && linkPath === '/index.html') {
            link.classList.add('active');
        }
    });


    // --- 3. Countdown Timer Logic ---
    const countDownDate = new Date("Nov 15, 2025 08:00:00").getTime();
    const countdownContainer = document.getElementById("countdown-container");
    if (countdownContainer) {
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = countDownDate - now;

                if (distance < 0) {
                    clearInterval(interval);
                    countdownContainer.innerHTML = "<div class='countdown-ended'>The event has started!</div>";
                } else {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    daysEl.innerHTML = days < 10 ? '0' + days : days;
                    hoursEl.innerHTML = hours < 10 ? '0' + hours : hours;
                    minutesEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
                    secondsEl.innerHTML = seconds < 10 ? '0' + seconds : seconds;
                }
            }, 1000);
        }
    }

    // --- 4. Event Rules Fade/Flip Logic ---
    const ruleButtons = document.querySelectorAll('.rule-button');
    ruleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const eventCard = button.closest('.event-card');
            const isFlipped = eventCard.classList.toggle('is-flipped');
            
            // If this card was flipped, update the button text
            button.textContent = isFlipped ? 'View Description' : 'More Information';

            // Unflip any other flipped cards
            document.querySelectorAll('.event-card.is-flipped').forEach(card => {
                if (card !== eventCard) {
                    card.classList.remove('is-flipped');
                    // Also reset their button text
                    card.querySelector('.rule-button').textContent = 'More Information';
                }
            });
        });
    });
});

