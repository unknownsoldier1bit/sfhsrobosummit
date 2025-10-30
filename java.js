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
  const countDownDate = new Date("Nov 22, 2025 08:00:00").getTime();
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

    // eventRules (keys must match data-event values)
    // eventRules (keys must match data-event values)
  const eventRules = {
    'line-follower': `
      <p><strong>Description:</strong> Build an autonomous robot that can follow a black line on a white surface and reach the finish as fast as possible.</p>
      <ul>
        <li>Robot must be fully autonomous and start with a button press by a judge.</li>
        <li>Max dimensions: 20 × 20 × 20 cm.</li>
        <li>Robot powered by onboard battery.</li>
        <li>Each team gets one trial run and one official timed run.</li>
        <li>Preparation time: 10 minutes before start (for calibration, programming, etc.).</li>
        <li>Interference from coaches or misbehavior can lead to disqualification.</li>
        <li>Judges’ decision is final.</li>
      </ul>
      <p><strong>Evaluation Criteria (100 Marks):</strong></p>
      <ul>
        <li>Speed (Completion Time): 40</li>
        <li>Accuracy (Line Following Precision): 25</li>
        <li>Design & Stability: 15</li>
        <li>Autonomous Functionality: 10</li>
        <li>Rule Compliance & Team Conduct: 10</li>
      </ul>
    `,

    'robo-race': `
      <p><strong>Overview:</strong> Design a fast, stable, and intelligent robot that navigates an obstacle-filled track in the shortest time possible.</p>
      <p><strong>Specifications:</strong></p>
      <ul>
        <li>Max dimensions: 25 × 25 × 25 cm.</li>
        <li>Max voltage: 12V DC (battery-powered only).</li>
        <li>Weight limit: 4 kg.</li>
        <li>Robots can be wired or wireless.</li>
      </ul>
      <p><strong>Allowed Components:</strong></p>
      <ul>
        <li>Arduino / ESP32 or equivalent microcontroller.</li>
        <li>DC / geared motors, L298N or L293D motor drivers.</li>
        <li>Wireless modules (Bluetooth, RF, Wi-Fi).</li>
        <li>Custom chassis, battery (max 12V).</li>
      </ul>
      <p><strong>Event Details:</strong></p>
      <ul>
        <li>Track includes curves, ramps, and obstacles.</li>
        <li>Each team gets one trial and one official run.</li>
        <li>Damaging track or other robots = disqualification.</li>
        <li>Ties broken by fewer penalties.</li>
      </ul>
      <p><strong>Evaluation Criteria (100 Marks):</strong></p>
      <ul>
        <li>Speed (time): 40</li>
        <li>Stability & Control: 20</li>
        <li>Design & Build Quality: 15</li>
        <li>Autonomous Features: 15</li>
        <li>Rule Compliance: 10</li>
      </ul>
    `,

    'robo-soccer': `
      <p><strong>Description:</strong> Teams design robots to play soccer in a mini arena, competing head-to-head to score goals within the time limit.</p>
      <p><strong>Robot Specifications:</strong></p>
      <ul>
        <li>Max size: 30 × 30 × 30 cm.</li>
        <li>Max weight: 2.5 kg.</li>
        <li>Battery-powered only (max 12V).</li>
        <li>2-wheel or 4-wheel drive allowed.</li>
        <li>Controlled via wired or wireless remote (Bluetooth/joystick).</li>
      </ul>
      <p><strong>Arena:</strong></p>
      <ul>
        <li>Approx. 8 ft × 6 ft with 40 × 20 cm goals.</li>
        <li>Surface: smooth wooden/hardboard base.</li>
        <li>Ball: light plastic/tennis ball (5–8 cm).</li>
      </ul>
      <p><strong>Gameplay Rules:</strong></p>
      <ul>
        <li>4-minute matches (2 halves × 2 min each).</li>
        <li>+10 points per goal, +5 for defense, −2 for out of bounds, −5 for fouls.</li>
        <li>Golden Goal if tied after time ends.</li>
        <li>Only 2 robots on field per team.</li>
        <li>No trapping or grabbing the ball.</li>
        <li>Intentional damage = disqualification.</li>
      </ul>
      <p><strong>Evaluation Criteria (100 Marks):</strong></p>
      <ul>
        <li>Design & Build: 20</li>
        <li>Speed & Control: 20</li>
        <li>Strategy & Gameplay: 30</li>
        <li>Team Coordination: 10</li>
        <li>Fair Play & Safety: 20</li>
      </ul>
    `,

    'royal-rumble': `
      <p><strong>Description:</strong> A multi-bot, free-for-all battle where the last robot standing wins!</p>
      <p><strong>Specifications:</strong></p>
      <ul>
        <li>Max size: 35 × 35 × 25 cm.</li>
        <li>Weight limit: 9 kg.</li>
        <li>Control: wireless only (no autonomous/wired).</li>
        <li>Battery: up to 12V.</li>
        <li>No flames, liquids, or hazardous materials.</li>
      </ul>
      <p><strong>Match Rules:</strong></p>
      <ul>
        <li>3–10 robots per round.</li>
        <li>Round time: 3 minutes.</li>
        <li>Eliminated if pushed out, flipped, or immobilized for 10 seconds.</li>
        <li>Last active bot wins.</li>
      </ul>
      <p><strong>Evaluation Criteria (100 Marks):</strong></p>
      <ul>
        <li>Robot Design & Durability: 30</li>
        <li>Driver Skill & Aggression: 30</li>
        <li>Strategy: 20</li>
        <li>Safety & Compliance: 10</li>
        <li>Teamwork: 10</li>
      </ul>
    `,

    'innovation-sr': `
      <p><strong>Objective:</strong> Design a scalable hardware or digital prototype improving transportation or energy efficiency in a local community.</p>
      <ul>
        <li>Encourage sustainable, data-driven, and feasible solutions.</li>
        <li>Use IoT, automation, or simulation for real-world impact.</li>
      </ul>
      <p><strong>Team:</strong> 2–4 students (Grades IX–XII).</p>
      <p><strong>Allowed Components:</strong></p>
      <ul>
        <li>Arduino / Microcontroller boards.</li>
        <li>Basic sensors, motors, chassis, and 12V battery max.</li>
        <li>Recyclable materials encouraged.</li>
      </ul>
      <p><strong>Presentation:</strong></p>
      <ul>
        <li>Working prototype (hardware or simulation).</li>
        <li>Brief report or poster explaining problem, solution, and scalability.</li>
        <li>Live demo or 1–2 min video.</li>
      </ul>
      <p><strong>Evaluation Criteria (100 Marks):</strong></p>
      <ul>
        <li>Innovation & Creativity: 20</li>
        <li>Relevance to Theme: 20</li>
        <li>Working Functionality: 25</li>
        <li>Design & Build Quality: 15</li>
        <li>Presentation & Explanation: 20</li>
      </ul>
    `,

    'innovation-jr': `
      <p><strong>Theme:</strong> Waste Management & Water Conservation</p>
      <p><strong>Objective:</strong> Build a simple robotic prototype solving a recycling, waste, or water issue at home or in the community.</p>
      <p><strong>Team:</strong> 2–4 students (Grades III–VIII).</p>
      <p><strong>Allowed Components:</strong></p>
      <ul>
        <li>Arduino Uno / Nano or basic microcontroller.</li>
        <li>Simple sensors (IR, water level, ultrasonic, etc.).</li>
        <li>BO / DC / Servo motors, 12V battery max.</li>
        <li>Recycled materials, cardboard, bottles, etc.</li>
      </ul>
      <p><strong>Presentation:</strong></p>
      <ul>
        <li>Explain problem and solution.</li>
        <li>Demonstrate working prototype (live or via video).</li>
        <li>Optional: Poster or model explaining design.</li>
      </ul>
      <p><strong>Evaluation Criteria (100 Marks):</strong></p>
      <ul>
        <li>Innovation & Creativity: 20</li>
        <li>Relevance to Theme: 20</li>
        <li>Working Functionality: 25</li>
        <li>Design & Build Quality: 15</li>
        <li>Presentation & Explanation: 20</li>
      </ul>
    `,

    'tug-of-war': `
      <p><strong>Description:</strong> Two robots battle to pull the other past the centerline using strength, traction, and control.</p>
      <ul>
        <li>Robots start 40–50 cm from centerline; tow string remains slack.</li>
        <li>Each round lasts 2 minutes; best of 3 rounds decides winner.</li>
        <li>Tie-breaker: robot farther from line at time end loses.</li>
        <li>Robot size ≤ 50 × 50 × 50 cm; weight ≤ 4.5 kg.</li>
        <li>Max 2 team members per team.</li>
        <li>No ready-made or RC toy robots allowed.</li>
        <li>Unethical behavior = disqualification.</li>
        <li>Judges’ decisions are final; no video evidence accepted.</li>
      </ul>
      <p><strong>Evaluation Criteria (100 Marks):</strong></p>
      <ul>
        <li>Pulling Strength: 30</li>
        <li>Traction & Control: 25</li>
        <li>Robot Design & Stability: 20</li>
        <li>Strategy & Execution: 15</li>
        <li>Rule Compliance & Conduct: 10</li>
      </ul>
    `,

    'balloon-race': `
      <p><strong>Overview:</strong> Build a lightweight, balloon-powered vehicle that moves the farthest using only the thrust of air released from balloons.</p>
      <ul>
        <li>2–4 students per team (Grades III–VIII).</li>
        <li>Vehicle must move only by balloon propulsion—no motors allowed.</li>
        <li>Use recyclable, lightweight materials (bottles, straws, cardboard, etc.).</li>
        <li>Each team presents their car and explains their design choices.</li>
      </ul>
      <p><strong>Evaluation Criteria (100 Marks):</strong></p>
      <ul>
        <li>Innovation & Design: 20</li>
        <li>Distance Covered: 25</li>
        <li>Stability & Build: 20</li>
        <li>Use of Materials: 15</li>
        <li>Presentation: 20</li>
      </ul>
    `,

    'circuit-breaker': `
      <p><strong>Overview:</strong> In this interactive modeling session, students will learn how to design and visualize 3D components using
       TinkerCAD and similar software. The workshop focuses on translating creative ideas into tangible digital models, helping participants
        understand real-world applications of CAD in robotics, design, and engineering.</p>
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
