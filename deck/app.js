const slides = [...document.querySelectorAll('.ds')];
const dots = document.getElementById('dots');
const counter = document.getElementById('counter');
let cur = -1;

slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'slide ' + (i + 1));
  b.addEventListener('click', () => go(i));
  dots.appendChild(b);
});

function go(n) {
  n = Math.max(0, Math.min(slides.length - 1, n));
  if (n === cur) return;
  slides.forEach((s, i) => s.classList.toggle('on', i === n));
  [...dots.children].forEach((d, i) => d.classList.toggle('cur', i === n));
  counter.textContent = (n + 1) + ' / ' + slides.length;
  cur = n;
}

addEventListener('keydown', e => {
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
    e.preventDefault(); go(cur + 1);
  } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
    e.preventDefault(); go(cur - 1);
  } else if (e.key === 'Home') {
    go(0);
  } else if (e.key === 'End') {
    go(slides.length - 1);
  }
});

let touchX = null;
addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
addEventListener('touchend', e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 48) go(cur + (dx < 0 ? 1 : -1));
  touchX = null;
}, { passive: true });

go(0);
