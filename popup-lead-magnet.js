/* ============================================================
   Randy Fisher Training — Psycho-Logistics Lead Magnet Popup
   Fires immediately on first visit. Once-ever via cookie.
   Drop this file in your GitHub repo, then add this ONE line
   anywhere inside the <body> of your index.html:

   <script src="popup-lead-magnet.js"></script>

   That's it. No other changes needed.
   ============================================================ */

(function () {
  'use strict';

  // ── COOKIE CHECK ──────────────────────────────────────────
  const COOKIE_NAME = 'rf_popup_seen';
  function getCookie(name) {
    return document.cookie.split('; ').some(function (c) {
      return c.startsWith(name + '=');
    });
  }
  function setCookie(name, days) {
    var expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=1; expires=' + expires.toUTCString() + '; path=/; SameSite=Lax';
  }

  if (getCookie(COOKIE_NAME)) return; // Already seen — do nothing

  // ── FONTS (match main site) ────────────────────────────────
  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@400;500;600&display=swap';
  document.head.appendChild(fontLink);

  // ── CSS ───────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '#rf-overlay{position:fixed;inset:0;z-index:99999;background:rgba(13,13,13,0.88);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);}',
    '#rf-modal{background:#f5f2ed;max-width:780px;width:100%;display:grid;grid-template-columns:1fr 1fr;box-shadow:0 32px 80px rgba(0,0,0,0.6);position:relative;max-height:94vh;overflow:auto;}',
    '#rf-close{position:absolute;top:14px;right:16px;background:none;border:none;font-size:1.5rem;line-height:1;cursor:pointer;color:#6b6560;z-index:2;font-family:sans-serif;}',
    '#rf-close:hover{color:#0d0d0d;}',
    '#rf-left{padding:40px 36px;background:#f5f2ed;}',
    '#rf-eyebrow{font-family:"Source Sans 3",sans-serif;font-size:0.68rem;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#c9392c;margin-bottom:14px;}',
    '#rf-title{font-family:"Playfair Display",serif;font-size:1.75rem;font-weight:900;line-height:1.1;color:#0d0d0d;margin-bottom:14px;}',
    '#rf-title em{font-style:italic;color:#c9392c;}',
    '#rf-sub{font-family:"Source Sans 3",sans-serif;font-size:0.88rem;color:#6b6560;line-height:1.65;margin-bottom:20px;}',
    '#rf-bullets{list-style:none;margin:0;padding:0;}',
    '#rf-bullets li{display:flex;align-items:flex-start;gap:10px;font-family:"Source Sans 3",sans-serif;font-size:0.84rem;color:#1a1814;margin-bottom:10px;line-height:1.5;}',
    '#rf-bullets li::before{content:"";flex-shrink:0;width:16px;height:16px;margin-top:2px;background:#c9392c;clip-path:polygon(14% 44%,0 57%,35% 90%,100% 10%,85% 0%,35% 65%);}',
    '#rf-right{background:#0d0d0d;padding:40px 32px;display:flex;flex-direction:column;justify-content:center;}',
    '#rf-form-label{font-family:"Source Sans 3",sans-serif;font-size:0.65rem;letter-spacing:0.18em;text-transform:uppercase;color:#c9392c;margin-bottom:12px;}',
    '#rf-form-head{font-family:"Playfair Display",serif;font-size:1.25rem;font-weight:700;color:#fff;line-height:1.2;margin-bottom:18px;}',
    '.rf-fg{margin-bottom:12px;}',
    '.rf-lbl{display:block;font-family:"Source Sans 3",sans-serif;font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:#6b6560;margin-bottom:5px;}',
    '.rf-inp{width:100%;background:#1e1c1a;border:1px solid #3a3633;color:#fff;font-family:"Source Sans 3",sans-serif;font-size:0.9rem;padding:11px 13px;outline:none;box-sizing:border-box;transition:border-color 0.2s;appearance:none;-webkit-appearance:none;}',
    '.rf-inp::placeholder{color:#4a4643;}',
    '.rf-inp:focus{border-color:#c9392c;}',
    '#rf-select{background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'7\' viewBox=\'0 0 10 7\'%3E%3Cpath d=\'M1 1l4 4 4-4\' stroke=\'%238a8480\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 13px center;cursor:pointer;}',
    '#rf-submit{width:100%;background:#c9392c;color:#fff;border:none;font-family:"Source Sans 3",sans-serif;font-size:0.8rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:13px;cursor:pointer;margin-top:6px;transition:background 0.2s;}',
    '#rf-submit:hover{background:#a02b20;}',
    '#rf-privacy{font-family:"Source Sans 3",sans-serif;font-size:0.68rem;color:#4a4643;margin-top:10px;text-align:center;line-height:1.5;}',
    '#rf-skip{display:block;text-align:center;margin-top:14px;font-family:"Source Sans 3",sans-serif;font-size:0.72rem;color:#4a4643;cursor:pointer;text-decoration:underline;background:none;border:none;width:100%;}',
    '#rf-skip:hover{color:#8a8480;}',
    '#rf-success{display:none;text-align:center;padding:20px 0;}',
    '#rf-success-icon{width:48px;height:48px;background:#c9392c;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;}',
    '#rf-success-title{font-family:"Playfair Display",serif;font-size:1.2rem;font-weight:700;color:#fff;margin-bottom:8px;}',
    '#rf-success-body{font-family:"Source Sans 3",sans-serif;font-size:0.85rem;color:#6b6560;line-height:1.6;}',
    '@media(max-width:600px){#rf-modal{grid-template-columns:1fr;}#rf-left{padding:32px 24px;}#rf-right{padding:28px 24px;}#rf-title{font-size:1.4rem;}}'
  ].join('');
  document.head.appendChild(style);

  // ── HTML ──────────────────────────────────────────────────
  var overlay = document.createElement('div');
  overlay.id = 'rf-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Get the Psycho-Logistics White Paper');

  overlay.innerHTML = [
    '<div id="rf-modal">',
      '<button id="rf-close" aria-label="Close">&times;</button>',

      // LEFT PANEL
      '<div id="rf-left">',
        '<p id="rf-eyebrow">Free White Paper &nbsp;&bull;&nbsp; Driver Retention</p>',
        '<h2 id="rf-title">You\'re Overpaying to Recruit Drivers You Could <em>Keep.</em></h2>',
        '<p id="rf-sub">The Psycho-Logistics White Paper reveals the low-cost psychological shifts that stop drivers from walking out the door.</p>',
        '<ul id="rf-bullets">',
          '<li>Why drivers leave has nothing to do with pay</li>',
          '<li>The communication failures that push borderline drivers out</li>',
          '<li>Low-cost (often free) retention steps any fleet can use now</li>',
          '<li>Backed by real numbers — 75% turnover dropped to under 40%</li>',
        '</ul>',
      '</div>',

      // RIGHT PANEL — FORM
      '<div id="rf-right">',
        '<div id="rf-form-panel">',
          '<p id="rf-form-label">Get Instant Access</p>',
          '<h3 id="rf-form-head">The Psycho-Logistics<br>White Paper</h3>',
          '<div class="rf-fg"><label class="rf-lbl" for="rf-name">Your Name</label><input class="rf-inp" type="text" id="rf-name" placeholder="First &amp; Last Name" autocomplete="name" /></div>',
          '<div class="rf-fg">',
            '<label class="rf-lbl" for="rf-state">State</label>',
            '<select class="rf-inp" id="rf-select" aria-label="State">',
              '<option value="" disabled selected>Select your state</option>',
              ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
               'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas',
               'Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
               'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York',
               'North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island',
               'South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia',
               'Washington','West Virginia','Wisconsin','Wyoming'].map(function(s){ return '<option>'+s+'</option>'; }).join(''),
            '</select>',
          '</div>',
          '<div class="rf-fg"><label class="rf-lbl" for="rf-email">Email Address</label><input class="rf-inp" type="email" id="rf-email" placeholder="you@yourcompany.com" autocomplete="email" /></div>',
          '<button id="rf-submit">Send Me the White Paper &rarr;</button>',
          '<p id="rf-privacy">Your info is never sold or shared. Unsubscribe anytime.</p>',
          '<button id="rf-skip">No thanks, take me to the site</button>',
        '</div>',

        '<div id="rf-success">',
          '<div id="rf-success-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg></div>',
          '<p id="rf-success-title">Check your inbox.</p>',
          '<p id="rf-success-body">The Psycho-Logistics White Paper is on its way.<br><br>Closing in <span id="rf-countdown">5</span> seconds&hellip;</p>',
        '</div>',
      '</div>',
    '</div>'
  ].join('');

  document.body.appendChild(overlay);

  // ── FUNCTIONS ─────────────────────────────────────────────
  function closePopup() {
    overlay.style.transition = 'opacity 0.25s';
    overlay.style.opacity = '0';
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 260);
  }

  function dismissForever() {
    setCookie(COOKIE_NAME, 3650); // 10 years = effectively forever
    closePopup();
  }

  // Close button + skip link
  document.getElementById('rf-close').addEventListener('click', dismissForever);
  document.getElementById('rf-skip').addEventListener('click', dismissForever);

  // Close on overlay background click
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) dismissForever();
  });

  // ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') dismissForever();
  });

  // Form submit
  document.getElementById('rf-submit').addEventListener('click', function () {
    var name  = document.getElementById('rf-name').value.trim();
    var state = document.getElementById('rf-select').value;
    var email = document.getElementById('rf-email').value.trim();

    if (!name || !state || !email) {
      alert('Please fill out all three fields.');
      return;
    }

    // ── SWAP TO SUCCESS STATE ──────────────────────────────
    document.getElementById('rf-form-panel').style.display = 'none';
    document.getElementById('rf-success').style.display = 'block';

    setCookie(COOKIE_NAME, 3650);

    // ── TODO: wire up your form backend here ───────────────
    // Option A — Formspree (free, easiest):
    //   1. Create account at formspree.io
    //   2. Replace YOUR_FORM_ID below with your endpoint ID
    //
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    //   body: JSON.stringify({ name: name, state: state, email: email })
    // });
    //
    // Option B — Mailchimp embedded form endpoint
    // Option C — Any other POST endpoint you prefer
    // ──────────────────────────────────────────────────────

    // Countdown and auto-close
    var count = 5;
    var countdown = document.getElementById('rf-countdown');
    var timer = setInterval(function () {
      count--;
      if (countdown) countdown.textContent = count;
      if (count <= 0) {
        clearInterval(timer);
        closePopup();
      }
    }, 1000);
  });

  // Prevent body scroll while popup is open
  var originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  overlay.addEventListener('remove', function () {
    document.body.style.overflow = originalOverflow;
  });

  // Restore scroll on close
  var observer = new MutationObserver(function () {
    if (!document.getElementById('rf-overlay')) {
      document.body.style.overflow = originalOverflow;
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true });

})();
