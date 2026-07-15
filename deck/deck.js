const S = [...document.querySelectorAll('.ds')];
const dots = document.getElementById('dots');
const pageno = document.getElementById('pageno');
const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
let cur = -1;

S.forEach(() => { const i = document.createElement('i'); dots.appendChild(i); });
const D = [...dots.children];

function counters(el) {
  el.querySelectorAll('[data-count]').forEach(c => {
    const f = +c.dataset.from, t = +c.dataset.to;
    const dur = +c.dataset.dur || 1500, delay = +c.dataset.delay || 0;
    if (c._raf) cancelAnimationFrame(c._raf);
    if (rm) { c.textContent = t; return; }
    c.textContent = f;
    const start = performance.now() + delay;
    const tick = now => {
      if (now < start) { c._raf = requestAnimationFrame(tick); return; }
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      c.textContent = Math.round(f + (t - f) * e);
      if (p < 1) c._raf = requestAnimationFrame(tick);
    };
    c._raf = requestAnimationFrame(tick);
  });
}

function go(i) {
  i = Math.max(0, Math.min(S.length - 1, i));
  if (i === cur) return;
  if (cur >= 0) { S[cur].classList.remove('on'); D[cur].classList.remove('a'); }
  cur = i;
  S[cur].classList.add('on');
  D[cur].classList.add('a');
  pageno.textContent = (cur + 1) + ' / ' + S.length;
  counters(S[cur]);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); go(cur + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(cur - 1); }
  if (e.key === 'Home') go(0);
  if (e.key === 'End') go(S.length - 1);
});

const stage = document.getElementById('stage');
function fit() {
  const s = Math.min(innerWidth / 1600, innerHeight / 900);
  stage.style.transform = `translate(-50%, -50%) scale(${s})`;
}
addEventListener('resize', fit);
fit();
go(0);
