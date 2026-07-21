/* ==========================================================
   Expert Tree Services — Chatbot Logic (Mock-up)
   ========================================================== */

(function () {
  'use strict';

  // ── Conversation Script ────────────────────────────────────
  // Each node: id, messages (bot), delay, quickReplies, nextId map
  const SCRIPT = {
    welcome: {
      messages: [
        'Hi there! 👋 I\'m the Expert Tree Services virtual assistant.',
        'I can help you get a free estimate, answer questions about our services, or connect you with our team. What can I help you with today?'
      ],
      quickReplies: [
        { label: '🌲 Get a Free Estimate', next: 'estimate' },
        { label: '🔧 Our Services',        next: 'services' },
        { label: '⚡ Emergency Help',      next: 'emergency' },
        { label: '📍 Hours & Location',    next: 'hours' },
      ]
    },

    estimate: {
      messages: [
        'Great! Getting a free estimate is easy. Our team will respond as promptly as possible.',
        'To help us give you the most accurate quote, which best describes your project?'
      ],
      quickReplies: [
        { label: '🪵 Tree Removal',       next: 'est_removal' },
        { label: '✂️ Trimming/Pruning',   next: 'est_trim' },
        { label: '🌀 Stump Grinding',      next: 'est_stump' },
        { label: '🚜 Land Clearing',       next: 'est_land' },
        { label: '❓ Not sure yet',        next: 'est_generic' },
      ]
    },

    est_removal: {
      messages: [
        'Tree removal is one of our specialties! Whether it\'s a single hazardous tree or multiple trees, we have the equipment — including cranes — to handle any job safely.',
        'Our process: 1) Free on-site assessment → 2) Detailed written quote → 3) Scheduled removal at your convenience.',
        'Ready to schedule your free assessment?'
      ],
      quickReplies: [
        { label: '✅ Yes, request estimate', next: 'collect_info' },
        { label: '💰 What does it cost?',    next: 'pricing' },
        { label: '← Back to menu',           next: 'welcome' },
      ]
    },

    est_trim: {
      messages: [
        'We offer careful trimming and pruning for trees of all sizes, with cuts selected to support long-term health, structure, and appearance.',
        'Common trimming jobs we handle: crown thinning, deadwood removal, hazard reduction near roofs & power lines, and seasonal shaping.',
        'Shall I connect you to request a free estimate?'
      ],
      quickReplies: [
        { label: '✅ Yes, request estimate', next: 'collect_info' },
        { label: '💰 What does it cost?',    next: 'pricing' },
        { label: '← Back to menu',           next: 'welcome' },
      ]
    },

    est_stump: {
      messages: [
        'Stump grinding eliminates trip hazards, discourages pests, and frees up your yard space.',
        '⚠️ Heads up: We recommend calling 811 before grinding to locate underground utilities.',
        'How many stumps do you need removed?'
      ],
      quickReplies: [
        { label: '1 stump',         next: 'collect_info' },
        { label: '2–5 stumps',      next: 'collect_info' },
        { label: '6+ stumps',       next: 'collect_info' },
        { label: '← Back to menu', next: 'welcome' },
      ]
    },

    est_land: {
      messages: [
        'We handle residential and commercial land clearing with heavy equipment — bulldozers, excavators, and chippers.',
        'Services include brush clearing, fence line clearing, storm debris cleanup, and mulch recycling.',
        'What type of property is this for?'
      ],
      quickReplies: [
        { label: '🏠 Residential',   next: 'collect_info' },
        { label: '🏢 Commercial',    next: 'collect_info' },
        { label: '← Back to menu',  next: 'welcome' },
      ]
    },

    est_generic: {
      messages: [
        'No problem! Our team can come out and assess your property at no charge. We\'ll recommend exactly what\'s needed.',
        'We\'d love to set up a free on-site consultation. Can I get some details?'
      ],
      quickReplies: [
        { label: '✅ Yes, set up consultation', next: 'collect_info' },
        { label: '← Back to menu',              next: 'welcome' },
      ]
    },

    collect_info: {
      messages: [
        'Perfect! To get you connected with our team, you can either:',
        '📞 Call our main office at (302) 475-7594 — Mon–Fri 7am–6pm and Saturday 8am–4pm.\n\n⚡ For urgent storm damage, call the 24/7 emergency line at (302) 278-6387.\n\n📋 Or fill out our online estimate form and our team will follow up.',
        'Which works best for you?'
      ],
      quickReplies: [
        { label: '📋 Go to Estimate Form', next: 'go_form' },
        { label: '📞 I\'ll call instead',  next: 'call_info' },
        { label: '💬 Talk to a person',    next: 'human' },
        { label: '← Back to menu',        next: 'welcome' },
      ]
    },

    go_form: {
      messages: [
        'Great choice! I\'ll scroll you down to our estimate form right now. Fill it out and our team will follow up. 🌲'
      ],
      quickReplies: [],
      action: 'scroll_to_form'
    },

    call_info: {
      messages: [
        'Here\'s how to reach us by phone:\n\n📞 Main office: (302) 475-7594\n⚡ 24/7 emergency: (302) 278-6387\n\n🕐 Office hours Mon–Fri: 7am–6pm\n🕐 Saturday: 8am–4pm',
        'Is there anything else I can help with?'
      ],
      quickReplies: [
        { label: '🏠 Back to menu', next: 'welcome' },
        { label: '💬 Talk to a person', next: 'human' },
      ]
    },

    services: {
      messages: [
        'We offer a full range of tree care services! Which are you curious about?'
      ],
      quickReplies: [
        { label: '🪵 Tree Removal',         next: 'svc_removal' },
        { label: '✂️ Trimming & Pruning',   next: 'svc_trim' },
        { label: '🌀 Stump Grinding',        next: 'svc_stump' },
        { label: '🚜 Land Clearing',         next: 'svc_land' },
        { label: '🔍 Hazard Assessment',     next: 'svc_hazard' },
        { label: '⚡ Emergency Services',    next: 'emergency' },
      ]
    },

    svc_removal: {
      messages: [
        '🪵 **Tree Removal** — We safely remove trees of any size, from small ornamentals to towering oaks.',
        'We use crane-assisted techniques for trees near structures, power lines, or in tight spaces, with a detailed safety and property-protection plan.',
        'Want to get a quote for tree removal?'
      ],
      quickReplies: [
        { label: '✅ Get a free estimate', next: 'collect_info' },
        { label: '← Back to services',    next: 'services' },
      ]
    },

    svc_trim: {
      messages: [
        '✂️ **Tree Trimming & Pruning** — Precision pruning can promote health, reduce hazards, and enhance your property\'s appearance.',
        'We handle everything from routine crown thinning to complex hazard mitigation near roofs and utility lines.'
      ],
      quickReplies: [
        { label: '✅ Get a free estimate', next: 'collect_info' },
        { label: '← Back to services',    next: 'services' },
      ]
    },

    svc_stump: {
      messages: [
        '🌀 **Stump Grinding** — We grind stumps deep below the surface to prevent regrowth and pest infestations.',
        'Timing depends on the stump size and access. We clean up the work area and can discuss restoration options during the estimate.'
      ],
      quickReplies: [
        { label: '✅ Get a free estimate', next: 'collect_info' },
        { label: '← Back to services',    next: 'services' },
      ]
    },

    svc_land: {
      messages: [
        '🚜 **Land & Lot Clearing** — From brush and shrub clearing to full-scale lot development prep.',
        'We bring heavy equipment (bulldozers, excavators) for larger jobs and handle all debris hauling. Mulch recycling available!'
      ],
      quickReplies: [
        { label: '✅ Get a free estimate', next: 'collect_info' },
        { label: '← Back to services',    next: 'services' },
      ]
    },

    svc_hazard: {
      messages: [
        '🔍 **Tree Hazard Assessment** — Our tree-care specialist inspects your trees for signs of:\n• Trunk cracks or cavities\n• Root damage or instability\n• Fungal growth or decay\n• Structural weakness',
        'You\'ll receive a written report with specific recommendations — whether that\'s pruning, cabling, or removal.'
      ],
      quickReplies: [
        { label: '✅ Schedule an assessment', next: 'collect_info' },
        { label: '← Back to services',       next: 'services' },
      ]
    },

    emergency: {
      messages: [
        '⚡ **Emergency Tree Services** — We\'re available 24/7 for storm damage and urgent hazards.',
        'If a tree has fallen or is posing immediate danger, please call us directly for the fastest response:'
      ],
      quickReplies: [
        { label: '📞 Main office: (302) 475-7594', next: 'call_info', action: 'call' },
        { label: '⚡ 24/7 emergency: (302) 278-6387', next: 'call_info', action: 'call2' },
        { label: '← Back to menu',         next: 'welcome' },
      ]
    },

    hours: {
      messages: [
        '📍 **Expert Tree Services**\n214 Alders Dr, Wilmington, DE 19803\n\n🕐 Business Hours:\nMon–Fri: 7:00am – 6:00pm\nSaturday: 8:00am – 4:00pm\nSunday: Closed (Emergency line available)\n\n📞 (302) 475-7594\n✉️ info@experttreeservices.com',
        'We serve Wilmington and all of New Castle County, DE — plus parts of neighboring Pennsylvania.'
      ],
      quickReplies: [
        { label: '🌲 Get a Free Estimate', next: 'estimate' },
        { label: '💬 Talk to a person',    next: 'human' },
        { label: '← Back to menu',        next: 'welcome' },
      ]
    },

    pricing: {
      messages: [
        'Tree service pricing varies based on tree size, location, complexity, and equipment needed.',
        'Access, nearby structures, cleanup needs, and equipment requirements all affect the quote.',
        'Estimates are free and no-obligation. We\'ll provide project-specific pricing after evaluating the property.'
      ],
      quickReplies: [
        { label: '✅ Get my free estimate', next: 'collect_info' },
        { label: '← Back to menu',         next: 'welcome' },
      ]
    },

    human: {
      messages: [
        'Of course! Our team is happy to help directly. 😊',
        'You can reach us at:\n\n📞 (302) 475-7594\n✉️ info@experttreeservices.com\n\n🕐 Mon–Fri 7am–6pm | Sat 8am–4pm\n\nOr leave your info in our estimate form and someone will follow up as soon as possible.'
      ],
      quickReplies: [
        { label: '📋 Go to Estimate Form', next: 'go_form' },
        { label: '🏠 Back to menu',        next: 'welcome' },
      ]
    }
  };

  // ── State ──────────────────────────────────────────────────
  let isOpen = false;
  let hasOpened = false;
  let inputDisabled = false;
  let activeNodeRun = 0;

  // ── DOM Refs ───────────────────────────────────────────────
  let fab, window_, messages, quickRepliesContainer, inputEl, sendBtn;

  // ── Init ───────────────────────────────────────────────────
  function init() {
    // Guard against a script being included twice in a saved/mockup page.
    if (document.getElementById('chat-fab')) return;
    injectHTML();
    cacheDom();
    bindEvents();
    // Auto-open hint after 4s on first load
    setTimeout(() => {
      if (!hasOpened) showBadge();
    }, 4000);
  }

  function showBadge() {
    const badge = document.querySelector('.chat-fab-badge');
    if (badge) badge.style.display = 'flex';
  }

  // ── Inject HTML ────────────────────────────────────────────
  function injectHTML() {
    const treeSVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M50 5 C35 5, 15 20, 15 40 C15 55, 25 65, 35 70 L35 90 C35 95, 40 95, 40 90 L40 72 C43 73, 46 74, 50 74 C54 74, 57 73, 60 72 L60 90 C60 95, 65 95, 65 90 L65 70 C75 65, 85 55, 85 40 C85 20, 65 5, 50 5Z"/></svg>`;

    document.body.insertAdjacentHTML('beforeend', `
      <!-- Chatbot FAB -->
      <button class="chat-fab" id="chat-fab" aria-label="Open chat assistant" aria-expanded="false" aria-controls="chat-window">
        <span class="chat-fab-label" aria-hidden="true">Chat with Us</span>
        <svg class="icon-chat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        <span class="chat-fab-badge" aria-hidden="true" style="display:none">1</span>
      </button>

      <!-- Chatbot Window -->
      <div class="chat-window" id="chat-window" role="dialog" aria-label="Expert Tree Services virtual assistant" aria-modal="false" aria-hidden="true">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-header-avatar" aria-hidden="true">
            ${treeSVG}
            <span class="chat-online-dot"></span>
          </div>
          <div class="chat-header-info">
            <strong>Tree Assistant</strong>
            <span>Virtual assistant · Expert Tree Services</span>
          </div>
          <div class="chat-header-actions">
            <button class="chat-header-btn" id="chat-minimize" aria-label="Minimize chat" title="Minimize">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div class="chat-messages" id="chat-messages" role="log" aria-live="polite" aria-label="Chat messages">
          <div class="chat-date-sep">Today</div>
        </div>

        <!-- Quick Replies -->
        <div class="chat-quick-replies" id="chat-quick-replies" aria-label="Quick reply options"></div>

        <!-- Input -->
        <div class="chat-input-area">
          <input
            class="chat-input"
            id="chat-input"
            type="text"
            placeholder="Type a message..."
            maxlength="300"
            autocomplete="off"
            aria-label="Type your message"
          >
          <button class="chat-send-btn" id="chat-send" aria-label="Send message" disabled>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        <div class="chat-branding">Powered by Expert Tree Services virtual assistant</div>
      </div>
    `);
  }

  // ── Cache DOM ──────────────────────────────────────────────
  function cacheDom() {
    fab       = document.getElementById('chat-fab');
    window_   = document.getElementById('chat-window');
    messages  = document.getElementById('chat-messages');
    quickRepliesContainer = document.getElementById('chat-quick-replies');
    inputEl   = document.getElementById('chat-input');
    sendBtn   = document.getElementById('chat-send');
  }

  // ── Bind Events ────────────────────────────────────────────
  function bindEvents() {
    fab.addEventListener('click', toggleChat);

    document.getElementById('chat-minimize').addEventListener('click', closeChat);

    inputEl.addEventListener('input', () => {
      sendBtn.disabled = inputEl.value.trim() === '' || inputDisabled;
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!sendBtn.disabled) sendUserMessage(inputEl.value.trim());
      }
    });

    sendBtn.addEventListener('click', () => {
      if (!sendBtn.disabled) sendUserMessage(inputEl.value.trim());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeChat();
    });
  }

  // ── Open / Close ───────────────────────────────────────────
  function toggleChat() {
    isOpen ? closeChat() : openChat();
  }

  function openChat() {
    isOpen = true;
    fab.classList.add('open');
    window_.classList.add('open');
    fab.setAttribute('aria-expanded', 'true');
    window_.setAttribute('aria-hidden', 'false');

    if (!hasOpened) {
      hasOpened = true;
      setTimeout(() => runNode('welcome'), 400);
    }
    setTimeout(() => inputEl.focus(), 500);
    scrollToBottom();
  }

  function closeChat() {
    isOpen = false;
    fab.classList.remove('open');
    window_.classList.remove('open');
    fab.setAttribute('aria-expanded', 'false');
    window_.setAttribute('aria-hidden', 'true');
    fab.focus();
  }

  // ── Run Conversation Node ──────────────────────────────────
  function runNode(nodeId) {
    const node = SCRIPT[nodeId];
    if (!node) return;

    const runId = ++activeNodeRun;

    inputDisabled = true;
    sendBtn.disabled = true;
    clearQuickReplies();

    // Chain bot messages with typing delays
    let delay = 0;
    node.messages.forEach((msg, i) => {
      const typingTime = Math.min(400 + msg.length * 18, 1800);

      setTimeout(() => {
        if (runId === activeNodeRun) showTyping();
      }, delay);
      delay += typingTime;
      setTimeout(() => {
        if (runId !== activeNodeRun) return;
        removeTyping();
        addBotMessage(msg);
        if (i === node.messages.length - 1) {
          // Last message: show quick replies
          setTimeout(() => {
            if (runId !== activeNodeRun) return;
            if (node.quickReplies && node.quickReplies.length) {
              showQuickReplies(node.quickReplies);
            }
            // Handle special actions
            if (node.action === 'scroll_to_form') {
              setTimeout(() => {
                if (runId !== activeNodeRun) return;
                closeChat();
                const estimateSection = document.getElementById('estimate');
                estimateSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => document.getElementById('form-name')?.focus(), 500);
              }, 800);
            }
            inputDisabled = false;
            sendBtn.disabled = inputEl.value.trim() === '';
          }, 200);
        }
      }, delay);
      delay += 300;
    });
  }

  // ── Message Rendering ──────────────────────────────────────
  function addBotMessage(text) {
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.innerHTML = `
      <div class="chat-msg-avatar" aria-hidden="true">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M50 5 C35 5, 15 20, 15 40 C15 55, 25 65, 35 70 L35 90 C35 95, 40 95, 40 90 L40 72 C43 73, 46 74, 50 74 C54 74, 57 73, 60 72 L60 90 C60 95, 65 95, 65 90 L65 70 C75 65, 85 55, 85 40 C85 20, 65 5, 50 5Z"/></svg>
      </div>
      <div class="chat-msg-bubble">${formatText(text)}</div>
    `;
    messages.appendChild(div);
    scrollToBottom();
  }

  function addUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'chat-msg user';
    div.innerHTML = `<div class="chat-msg-bubble">${escapeHtml(text)}</div>`;
    messages.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    removeTyping(); // prevent doubles
    const div = document.createElement('div');
    div.className = 'chat-typing';
    div.id = 'chat-typing-indicator';
    div.innerHTML = `
      <div class="chat-msg-avatar" aria-hidden="true">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M50 5 C35 5, 15 20, 15 40 C15 55, 25 65, 35 70 L35 90 C35 95, 40 95, 40 90 L40 72 C43 73, 46 74, 50 74 C54 74, 57 73, 60 72 L60 90 C60 95, 65 95, 65 90 L65 70 C75 65, 85 55, 85 40 C85 20, 65 5, 50 5Z"/></svg>
      </div>
      <div class="typing-dots" aria-label="Tree assistant is typing">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    messages.appendChild(div);
    scrollToBottom();
  }

  function removeTyping() {
    document.getElementById('chat-typing-indicator')?.remove();
  }

  // ── Quick Replies ──────────────────────────────────────────
  function showQuickReplies(replies) {
    clearQuickReplies();
    replies.forEach(({ label, next, action }) => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply-btn';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        clearQuickReplies();
        addUserMessage(label);

        // Handle phone actions
        if (action === 'call') {
          window.location.href = 'tel:+13024757594';
          return;
        } else if (action === 'call2') {
          window.location.href = 'tel:+13022786387';
          return;
        }

        setTimeout(() => runNode(next), 500);
      });
      quickRepliesContainer.appendChild(btn);
    });
  }

  function clearQuickReplies() {
    quickRepliesContainer.innerHTML = '';
  }

  // ── Free-text input handling ───────────────────────────────
  function sendUserMessage(text) {
    if (!text) return;
    inputEl.value = '';
    sendBtn.disabled = true;
    addUserMessage(text);

    // Simple keyword routing
    const lower = text.toLowerCase();
    let nextNode = 'human';

    // Urgent wording takes priority over the normal removal path.
    if (/emergenc|storm|fallen|fell|urgent|immediate danger/.test(lower)) nextNode = 'emergency';
    else if (/service area|coverage area|\bserve\b|where.*work|county|counties|wilmington|delaware|pennsylvania/.test(lower)) nextNode = 'hours';
    else if (/hazard|assess|inspect|safe/.test(lower))          nextNode = 'svc_hazard';
    else if (/remov|cut down|take down/.test(lower))            nextNode = 'est_removal';
    else if (/trim|prun|shape|prune/.test(lower))               nextNode = 'est_trim';
    else if (/stump|grind/.test(lower))                         nextNode = 'est_stump';
    else if (/land|lot|clear|brush|acre/.test(lower))           nextNode = 'est_land';
    else if (/estimat|quot|price|cost|how much/.test(lower))    nextNode = 'pricing';
    else if (/hour|open|close|location|address|where/.test(lower)) nextNode = 'hours';
    else if (/service|what do|offer|do you/.test(lower))        nextNode = 'services';
    else if (/hello|hi|hey|howdy|good/.test(lower))             nextNode = 'welcome';
    else if (/human|person|agent|call|speak|talk/.test(lower))  nextNode = 'human';

    setTimeout(() => runNode(nextNode), 600);
  }

  // ── Helpers ────────────────────────────────────────────────
  function scrollToBottom() {
    requestAnimationFrame(() => {
      messages.scrollTop = messages.scrollHeight;
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatText(str) {
    // Convert \n to <br>, **bold**, and bullet points
    return escapeHtml(str)
      .replace(/\(302\) 475-7594/g, '<a href="tel:+13024757594">(302) 475-7594</a>')
      .replace(/\(302\) 278-6387/g, '<a href="tel:+13022786387">(302) 278-6387</a>')
      .replace(/info@experttreeservices\.com/g, '<a href="mailto:info@experttreeservices.com">info@experttreeservices.com</a>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n•/g, '<br>•')
      .replace(/\n/g, '<br>');
  }

  // ── Boot ───────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
