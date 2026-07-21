const S = [...document.querySelectorAll('.ds')];
const dots = document.getElementById('dots');
const pageno = document.getElementById('pageno');
const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
let cur = -1;

const secs = S.map(s => s.dataset.sec || '');
const names = [];
secs.forEach(n => { if (n && names[names.length - 1] !== n) names.push(n); });
names.forEach(n => {
  const el = document.createElement('span');
  el.textContent = n;
  dots.appendChild(el);
});
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

function typer(el) {
  el.querySelectorAll('[data-type]').forEach(t => {
    const full = t.dataset.type;
    if (t._ti) clearInterval(t._ti);
    if (t._tt) clearTimeout(t._tt);
    if (rm) { t.textContent = full; return; }
    t.textContent = '';
    const delay = +t.dataset.tdelay || 400;
    const dur = +t.dataset.tdur || 1100;
    const step = Math.max(12, dur / full.length);
    t._tt = setTimeout(() => {
      let i = 0;
      t._ti = setInterval(() => {
        i++;
        t.textContent = full.slice(0, i);
        if (i >= full.length) clearInterval(t._ti);
      }, step);
    }, delay);
  });
}

function go(i) {
  i = Math.max(0, Math.min(S.length - 1, i));
  if (i === cur) return;
  if (cur >= 0) S[cur].classList.remove('on');
  cur = i;
  S[cur].classList.add('on');
  D.forEach(d => d.classList.toggle('a', cur > 0 && d.textContent === secs[cur]));
  pageno.textContent = (cur + 1) + ' / ' + S.length;
  counters(S[cur]);
  typer(S[cur]);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); go(cur + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(cur - 1); }
  if (e.key === 'Home') go(0);
  if (e.key === 'End') go(S.length - 1);
});

document.querySelectorAll('[data-clone]').forEach(ph => {
  const src = document.getElementById(ph.dataset.clone);
  if (!src) return;
  const c = src.cloneNode(true);
  c.removeAttribute('id');
  c.removeAttribute('data-b');
  c.style.width = '100%';
  c.style.height = '100%';
  ph.appendChild(c);
});

const stage = document.getElementById('stage');
function fit() {
  const s = Math.min(innerWidth / 1600, innerHeight / 900);
  stage.style.transform = `translate(-50%, -50%) scale(${s})`;
}
addEventListener('resize', fit);
fit();
go(0);
