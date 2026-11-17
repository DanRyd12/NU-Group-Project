(function () {
  'use strict';

  const QUESTIONS = [
    {
      question: "You get an email saying your Student Finance England payment has been suspended and you must confirm your bank details within 24 hours. What should you do?",
      context: "The email uses the SFE logo and links to a login page that looks official.",
      answers: [
        { text: "Click the link and update your bank details straight away so your loan isn't delayed.", score: 0,
          feedback: "This is a classic phishing scam. The urgent deadline is designed to rush you, and entering your details on a fake page hands your login and bank information to criminals." },
        { text: "Reply to the email asking whether it is genuine.", score: 1,
          feedback: "You avoided the link, but replying confirms your address is active, and the scammer will simply tell you it is real." },
        { text: "Ignore the link, log in to your Student Finance account by typing the address yourself, and report the email.", score: 3,
          feedback: "Checking through the official website or app means you see your real account status. Reporting the email (e.g. to report@phishing.gov.uk) helps protect other students." }
      ]
    },
    {
      question: "Someone in a Freshers' group chat is selling cheap wristbands for a sold-out Freshers' event. What should you do?",
      context: "They want payment by bank transfer and say they will send the wristband afterwards.",
      answers: [
        { text: "Ask to pay through PayPal Friends and Family to save on fees.", score: 1,
          feedback: "PayPal is better than a bank transfer, but Friends and Family payments have no buyer protection, so you are unlikely to get your money back if it's a scam." },
        { text: "Transfer the money quickly before someone else buys them.", score: 0,
          feedback: "Ticket scams are common in Freshers' Week. Bank transfers are very hard to recover, and pressure to act fast is a warning sign." },
        { text: "Only buy through the Students' Union or the official resale platform.", score: 3,
          feedback: "Official channels guarantee the ticket is genuine and give you a route to a refund if something goes wrong." }
      ]
    },
    {
      question: "You've been given your university IT account. What password should you choose?",
      context: "This account gives access to your email, Moodle, the library and your grades.",
      answers: [
        { text: "The same password you use for your social media, so it is easy to remember.", score: 0,
          feedback: "If any site using that password is breached, attackers will try it on your university account too. Reusing passwords puts every account at risk." },
        { text: "A long, unique passphrase stored in a password manager.", score: 3,
          feedback: "A unique passphrase (e.g. three random words) is hard to guess, and a password manager means you don't need to remember it or reuse it." },
        { text: "Your old password with the number changed at the end.", score: 1,
          feedback: "It is slightly different, but attackers routinely try small variations of leaked passwords, so this offers little extra protection." }
      ]
    },
    {
      question: "Your phone keeps showing Microsoft Authenticator requests to approve a sign-in, but you aren't logging in to anything. What should you do?",
      context: "The requests arrive late at night, several in a row.",
      answers: [
        { text: "Deny the requests, change your password immediately and contact the IT Service Desk.", score: 3,
          feedback: "Unexpected prompts mean someone probably already has your password. Denying, changing it and telling IT stops the attack and lets them check your account." },
        { text: "Approve one so the notifications stop.", score: 0,
          feedback: "This is called MFA fatigue. Approving even once lets the attacker into your account." },
        { text: "Deny them and ignore it if they stop.", score: 1,
          feedback: "Denying is right, but the attacker still knows your password and may try again or use it elsewhere." }
      ]
    },
    {
      question: "You're working in the library and want to grab a coffee. What should you do with your laptop?",
      context: "You're logged in to your university account and your email is open.",
      answers: [
        { text: "Lock the screen and ask a friend to keep an eye on it.", score: 1,
          feedback: "Locking the screen protects your accounts, but laptops are often stolen from libraries, and your friend may get distracted." },
        { text: "Leave it open; you'll only be five minutes.", score: 0,
          feedback: "An unlocked, unattended laptop can be stolen or used to send emails, change passwords or access your files in seconds." },
        { text: "Take it with you, or lock it and secure it with a laptop lock.", score: 3,
          feedback: "Keeping the device with you (or physically secured and locked) protects both the hardware and the data on it." }
      ]
    },
    {
      question: "Your halls have two Wi-Fi networks available: \"eduroam\" and an open network called \"Halls_Free_WiFi\". Which should you use?",
      context: "You want to do online banking and log in to your university account.",
      answers: [
        { text: "Use \"Halls_Free_WiFi\" because it doesn't need a password.", score: 0,
          feedback: "Open networks can be set up by anyone, including attackers who can watch or redirect your traffic." },
        { text: "Use \"Halls_Free_WiFi\" but only visit sites that show a padlock.", score: 1,
          feedback: "HTTPS helps, but a fake network can still redirect you to look-alike sites or capture other information." },
        { text: "Set up eduroam using your university's official instructions.", score: 3,
          feedback: "eduroam is encrypted and authenticated, so it is the secure option. Following the official set-up guide ensures you connect to the real network." }
      ]
    },
    {
      question: "You find a cheap room advertised on social media for second semester. The landlord asks for a deposit before you view it. What should you do?",
      context: "They say they're overseas and will post the keys once paid.",
      answers: [
        { text: "Ask for a video tour before paying the deposit.", score: 1,
          feedback: "A video tour is a sensible check, but scammers can film any property. Paying before a proper viewing and contract is still risky." },
        { text: "Use your university's accommodation office or approved letting agents, and never pay before viewing and signing a contract.", score: 3,
          feedback: "Approved providers are checked, and in England deposits must be protected in a government-backed scheme. Never pay for a property you haven't seen." },
        { text: "Pay the deposit quickly, as cheap rooms go fast.", score: 0,
          feedback: "A landlord who is \"overseas\", a low price and pressure to pay first are classic signs of a rental scam." }
      ]
    },
    {
      question: "A message on Instagram offers you £500 for \"just letting money pass through your bank account\". What should you do?",
      context: "They say it's a common way for students to earn extra cash.",
      answers: [
        { text: "Decline, block the account and report it.", score: 3,
          feedback: "This is a money mule recruitment scam. Reporting it helps stop others being targeted." },
        { text: "Agree, as it's only once and you need the money.", score: 0,
          feedback: "Money muling is a crime that can lead to prosecution, a closed bank account and difficulty getting loans or a phone contract for years." },
        { text: "Ignore the message but don't report it.", score: 1,
          feedback: "Not taking part keeps you safe, but reporting it helps your bank, the platform and the police protect other students." }
      ]
    },
    {
      question: "Someone calls saying they're from the university IT Service Desk. They need your password to fix a problem with your account. What should you do?",
      context: "They know your name and student number.",
      answers: [
        { text: "Give them your password, as they already know your details.", score: 0,
          feedback: "Real IT staff will never ask for your password. Knowing your name and student number is easy for scammers to find." },
        { text: "Refuse, hang up and call the IT Service Desk using the number on the university website.", score: 3,
          feedback: "Contacting IT through a number you've looked up yourself confirms whether there is a real problem, and lets them warn others about the scam." },
        { text: "Give them your MFA code instead of your password.", score: 1,
          feedback: "It feels safer, but MFA codes are just as valuable to attackers, especially if they already have your password." }
      ]
    },
    {
      question: "You need Microsoft Office for an assignment. A course mate shares a link to a \"free cracked version\". What should you do?",
      context: "The download is from a file-sharing site.",
      answers: [
        { text: "Download it but scan it with antivirus first.", score: 1,
          feedback: "Scanning helps, but malware in cracked software is often designed to avoid detection, and using it breaks the licence terms." },
        { text: "Download and install it; everyone does.", score: 0,
          feedback: "Cracked software is a common way to spread malware that can steal passwords and files or lock your device." },
        { text: "Use the free Microsoft 365 licence provided by your university.", score: 3,
          feedback: "Most UK universities give students free, genuine Office through their university account, so there's no need to take the risk." }
      ]
    }
  ];

  const FEEDBACK = {
    3: { title: 'Good choice! +3 points', cls: 'feedback-good' },
    1: { title: 'Partly risky. +1 point', cls: 'feedback-warn' },
    0: { title: 'Risky choice! +0 points', cls: 'feedback-bad' }
  };

  const LETTERS = ['A', 'B', 'C'];
  const INDICATOR_SRC = '/static/assets/selection-indicator.svg';

  const form = document.getElementById('quizForm');
  const counter = document.getElementById('questionCounter');
  const progress = form.querySelector('.progress');
  const progressBar = document.getElementById('progressBar');
  const questionText = document.getElementById('questionText');
  const questionContext = document.getElementById('questionContext');
  const answerList = document.getElementById('answerList');
  const answerGroup = document.getElementById('answerGroup');
  const feedbackBox = document.getElementById('feedbackBox');
  const feedbackTitle = document.getElementById('feedbackTitle');
  const feedbackText = document.getElementById('feedbackText');
  const submitBtn = document.getElementById('submitBtn');
  const nextBtn = document.getElementById('nextBtn');

  let index = 0;
  let total = 0;

  function render() {
    const q = QUESTIONS[index];
    const n = index + 1;

    counter.textContent = `Question ${n} of ${QUESTIONS.length}`;
    progress.setAttribute('aria-valuenow', n);
    progress.setAttribute('aria-valuemax', QUESTIONS.length);
    progressBar.style.width = `${(n / QUESTIONS.length) * 100}%`;

    questionText.textContent = q.question;
    questionContext.textContent = q.context;

    answerList.innerHTML = '';
    q.answers.forEach((a, i) => {
      const label = document.createElement('label');
      label.className = 'answer-option';
      label.innerHTML =
        `<input type="radio" name="answer" value="${i}">` +
        `<span class="answer-card"><span></span>` +
        `<img class="answer-indicator" src="${INDICATOR_SRC}" width="21" height="21" alt=""></span>`;
      label.querySelector('.answer-card > span').textContent = `${LETTERS[i]}. ${a.text}`;
      answerList.appendChild(label);
    });

    answerGroup.disabled = false;
    answerList.classList.remove('answers-locked');
    feedbackBox.className = 'feedback-box mt-4 d-none';
    submitBtn.classList.remove('d-none');
    submitBtn.disabled = true;
    nextBtn.classList.add('d-none');
    nextBtn.textContent = n === QUESTIONS.length ? 'View Results' : 'Next Question';
  }

  answerList.addEventListener('change', () => { submitBtn.disabled = false; });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const checked = form.querySelector('input[name="answer"]:checked');
    if (!checked) return;

    const answer = QUESTIONS[index].answers[Number(checked.value)];
    total += answer.score;

    const fb = FEEDBACK[answer.score];
    feedbackTitle.textContent = fb.title;
    feedbackText.textContent = answer.feedback;
    feedbackBox.className = `feedback-box mt-4 ${fb.cls}`;

    // Lock answers; the fieldset is disabled AFTER reading the value.
    answerList.classList.add('answers-locked');
    answerGroup.disabled = true;

    submitBtn.classList.add('d-none');
    nextBtn.classList.remove('d-none');
    nextBtn.focus();
  });

  nextBtn.addEventListener('click', () => {
    if (index < QUESTIONS.length - 1) {
      index += 1;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      try { sessionStorage.setItem('aiQuizScore', String(total)); } catch (_) { /* storage blocked */ }
      window.location.href = `results.html?score=${total}`;
    }
  });

  render();
})();
