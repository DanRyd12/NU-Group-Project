(function () {
  'use strict';

  const BANDS = [
    { min: 25, label: 'Strong Awareness', cls: 'text-band-good',
      text: 'You have a strong understanding of responsible AI use. Keep applying these habits.' },
    { min: 15, label: 'Developing Awareness', cls: 'text-band-warn',
      text: 'You have a good understanding of responsible AI use, but there are some areas where you could improve' },
    { min: 0, label: 'Needs Improvement', cls: 'text-band-bad',
      text: 'Some of your choices could put personal or sensitive information at risk. Review the feedback and try again.' }
  ];

  function readScore() {
    const param = new URLSearchParams(location.search).get('score');
    if (param !== null && param !== '' && Number.isFinite(Number(param))) return Number(param);
    try {
      const stored = sessionStorage.getItem('aiQuizScore');
      if (stored !== null && Number.isFinite(Number(stored))) return Number(stored);
    } catch (_) { /* storage blocked */ }
    return 23;
  }

  const score = Math.max(0, Math.min(30, Math.round(readScore())));
  const band = BANDS.find(b => score >= b.min);

  document.getElementById('scoreValue').textContent = score;
  const label = document.getElementById('scoreBandLabel');
  label.textContent = band.label;
  label.className = `fs-4 fw-semibold mb-3 ${band.cls}`;
  document.getElementById('scoreBandText').textContent = band.text;

  document.querySelectorAll('.score-band').forEach(el => {
    const hit = score >= Number(el.dataset.min) && score <= Number(el.dataset.max);
    el.classList.toggle('is-current', hit);
  });
})();

