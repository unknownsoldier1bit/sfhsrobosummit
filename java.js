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
  const currentPath = window.location.pathname;
  const navAnchors = document.querySelectorAll('.desktop-nav .nav-links a, .nav-links-mobile a');

  navAnchors.forEach(link => {
    try {
      const linkPath = new URL(link.href, window.location.origin).pathname;
      link.classList.remove('active');
      if (linkPath === currentPath) link.classList.add('active');
      if (currentPath === '/' && linkPath === '/index.html') link.classList.add('active');
    } catch (e) {
      // ignore bad hrefs
    }
  });

  // --- 3. Countdown Timer ---
  const countDownDate = new Date("Oct 30, 2026 08:15:00").getTime();
  const countdownContainer = document.getElementById("countdown-container");

  if (countdownContainer) {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl && hoursEl && minutesEl && secondsEl) {
      const interval = setInterval(() => {
        const now = Date.now();
        const distance = countDownDate - now;

        if (distance < 0) {
          clearInterval(interval);
          countdownContainer.innerHTML = "<div class='countdown-ended'>The event has started!</div>";
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          daysEl.textContent = String(days).padStart(2, '0');
          hoursEl.textContent = String(hours).padStart(2, '0');
          minutesEl.textContent = String(minutes).padStart(2, '0');
          secondsEl.textContent = String(seconds).padStart(2, '0');
        }
      }, 1000);
    }
  }

  // --- 4. Modal Logic (single modal) ---
  const modal = document.getElementById('rules-modal');
  const modalTitle = modal ? modal.querySelector('#modal-title') : null;
  const modalBody = modal ? modal.querySelector('#modal-body') : null;
  const modalCloseBtn = modal ? modal.querySelector('.modal-close') : null;

  // if the modal is missing, bail out gracefully
  if (!modal || !modalTitle || !modalBody || !modalCloseBtn) {
    console.warn('Rules modal not found or missing elements (rules-modal / modal-title / modal-body / modal-close).');
    return;
  }

  // eventRules (keys must match data-event values)
  const eventRules = {
    'balloon-car-race': `
      <p><strong>Category:</strong> Junior School (Grades 3-5)</p>
      <p><strong>Venue:</strong> Natyashala</p>
      <p><strong>Team:</strong> 1-3 students per team</p>
      <p>Design and build a balloon-powered vehicle that travels the greatest distance from the start line. No motors or electronics are allowed, so it all comes down to creative engineering and smart design. Three attempts allowed; best distance counts.</p>
    `,

    'hydraulic-arm': `
      <p><strong>Category:</strong> Middle School (Grades 6-8)</p>
      <p><strong>Venue:</strong> Einstein Hall</p>
      <p><strong>Team:</strong> 1-3 students per team</p>
      <p>Build a working robotic arm powered entirely by water pressure using syringes and tubing. No electricity, no motors. Use your arm to pick up objects and transfer them from Zone A to Zone B. Time will be recorded; maximum time allowed is 5 minutes.</p>
      <p><strong>Reference video:</strong> <a href="https://youtube.com/shorts/GwhSDpXQtL8?si=v2ImyTOTf9MsgG5e" target="_blank" rel="noopener">Watch on YouTube</a></p>
    `,

    'line-follower': `
      <p><strong>Category:</strong> Middle School (Grades 6-8) and High School (Grades 9-12)</p>
      <p><strong>Venue:</strong> Newton Hall</p>
      <p><strong>Team:</strong> 1-3 students per team</p>
      <p>Build a fully autonomous robot that follows a black line on a white track and completes one full lap in the shortest possible time. No remote control is allowed. Once it starts, it is on its own. Precision programming and smart sensor design win this one.</p>
    `,

    'robo-race': `
      <p><strong>Category:</strong> Middle School (Grades 6-8) and High School (Grades 9-12)</p>
      <p><strong>Venue:</strong> Newton Hall</p>
      <p><strong>Team:</strong> 1-3 students per team</p>
      <p>Navigate a custom obstacle course featuring ramps, speed breakers, curves, and more in the fastest time. Build your robot, programme your strategy, and race against the clock. You can use manual wireless control or make it fully autonomous.</p>
    `,

    'robo-soccer': `
      <p><strong>Category:</strong> Middle School (Grades 6-8) and High School (Grades 9-12)</p>
      <p><strong>Venue:</strong> Globe Theatre</p>
      <p><strong>Team:</strong> 3-person event, 3 robots per team</p>
      <p>Two teams, three robots each, one ball, one goal. Score more than your opponent in a 4-minute match. Build your robots, develop your tactics, and take the field. Golden Goal and penalty shootout decide tied matches.</p>
    `,

    'drone-quidditch': `
      <p><strong>Category:</strong> Middle School (Grades 6-8) and High School (Grades 9-12)</p>
      <p><strong>Venue:</strong> Basketball Court</p>
      <p><strong>Team:</strong> 1-3 students per team</p>
      <p>Fly your drone through a sequence of suspended hoops, Harry Potter Quidditch style. Navigate the course in order, clear every hoop, and land the fastest clean time. Penalties apply for missed hoops and crashes. No custom build is required. Just bring your quadcopter and fly.</p>
    `,
  };

  // attach listener to every rule-button
  document.querySelectorAll('.rule-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.event-card');
      if (!card) return;
      const key = card.getAttribute('data-event');
      const title = card.querySelector('h3')?.textContent ?? 'Event Rules';

      modalTitle.textContent = title;
      modalBody.innerHTML = eventRules[key] ?? '<p>No rules available yet.</p>';

      // show modal and lock body scroll
      modal.classList.add('show');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      // ensure focus for accessibility
      modal.setAttribute('aria-hidden', 'false');
      modalCloseBtn.focus();
    });
  });

  // close modal function
  function closeModal() {
    modal.classList.remove('show');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    modal.setAttribute('aria-hidden', 'true');
  }

  // close handlers
  modalCloseBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
  });
  modal.addEventListener('click', (e) => {
    // click outside modal-content closes modal
    if (e.target === modal) closeModal();
  });

});
