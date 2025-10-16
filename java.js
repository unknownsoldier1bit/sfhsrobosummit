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

    // --- 2. Active Navigation Link Indicator ---
    const currentPage = window.location.pathname.split('/').pop();
    const navAnchors = document.querySelectorAll('.desktop-nav .nav-links a, .nav-links-mobile a'); 
    navAnchors.forEach(link => {
        const linkPage = link.getAttribute('href');
        link.classList.remove('active');
        if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
            link.classList.add('active');
        } else if (linkPage === currentPage) {
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
            const x = setInterval(function() {
                const now = new Date().getTime();
                const distance = countDownDate - now;

                if (distance < 0) {
                    clearInterval(x);
                    countdownContainer.innerHTML = "<div class='event-live'>The Event is Live!</div>";
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
