/* ═══════════════════════════════════════════
   PRELOADER
═══════════════════════════════════════════ */
let pv = 0;
const pEl = document.getElementById('pPct');
const pI = setInterval(() => {
  pv += Math.floor(Math.random() * 8) + 2;
  if (pv >= 100) { pv = 100; clearInterval(pI); }
  pEl.textContent = pv + '%';
}, 60);

window.addEventListener('load', () =>
  setTimeout(() => document.getElementById('preloader').classList.add('hide'), 2200)
);

function replayPreloader() {
  const pre = document.getElementById('preloader');
  const bar = pre.querySelector('.pre-fill');
  pre.classList.remove('hide');
  bar.style.animation = 'none';
  bar.offsetHeight;
  bar.style.animation = '';
  let p = 0;
  pEl.textContent = '0%';
  const i = setInterval(() => {
    p += Math.floor(Math.random() * 8) + 2;
    if (p >= 100) { p = 100; clearInterval(i); }
    pEl.textContent = p + '%';
  }, 60);
  setTimeout(() => pre.classList.add('hide'), 2300);
}

/* ═══════════════════════════════════════════
   AOS INIT
═══════════════════════════════════════════ */
AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true, offset: 50 });

/* ═══════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════ */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 50);
  document.getElementById('btt').classList.toggle('show', scrollY > 400);
  const secs = document.querySelectorAll('section[id]');
  let cur = '';
  secs.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
  document.querySelectorAll('#navLinks a').forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur)
  );
});

document.getElementById('navToggle').addEventListener('click', () =>
  document.getElementById('navLinks').classList.toggle('open')
);

/* ═══════════════════════════════════════════
   DARK / LIGHT TOGGLE
═══════════════════════════════════════════ */
let isLight = false;
let swalBg = '#0f2035', swalColor = '#e4edf6';

document.getElementById('modeBtn').addEventListener('click', () => {
  isLight = !isLight;
  const mode = isLight ? 'light' : 'dark';
  document.documentElement.setAttribute('data-mode', mode);
  document.getElementById('modeBtn').innerHTML = isLight
    ? '<i class="bi bi-moon-stars-fill"></i><span>Dark Mode</span>'
    : '<i class="bi bi-sun-fill"></i><span>Light Mode</span>';
  const tClose = document.getElementById('toastClose');
  if (tClose) tClose.style.filter = isLight ? 'invert(1) brightness(.2)' : 'none';
  swalBg    = isLight ? '#ffffff' : '#0f2035';
  swalColor = isLight ? '#0d1b2a' : '#e4edf6';
});

/* ═══════════════════════════════════════════
   TOOLTIPS & POPOVERS
═══════════════════════════════════════════ */
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el));

/* ═══════════════════════════════════════════
   ALERT
═══════════════════════════════════════════ */
function showAlert(type) {
  const cfg = {
    info:    { msg: '<i class="bi bi-info-circle-fill me-2"></i>This is an info alert!',         cls: 'dalert-info' },
    success: { msg: '<i class="bi bi-check-circle-fill me-2"></i>Action completed successfully!', cls: 'dalert-success' },
    danger:  { msg: '<i class="bi bi-x-circle-fill me-2"></i>Something went wrong!',              cls: 'dalert-danger' }
  };
  const { msg, cls } = cfg[type];
  document.getElementById('alertArea').innerHTML =
    `<div class="dalert ${cls} alert alert-dismissible fade show" role="alert" style="margin-bottom:0">
      ${msg}
      <button type="button" class="btn-close btn-sm" data-bs-dismiss="alert" style="filter:brightness(.5)"></button>
    </div>`;
}

/* ═══════════════════════════════════════════
   TOAST
═══════════════════════════════════════════ */
function showToast(type) {
  const msgs = { success: '✅ Action successful!', info: 'ℹ️ Here\'s some info.', error: '❌ An error occurred!' };
  const cols = { success: 'var(--teal)', info: 'var(--teal)', error: '#c03030' };
  document.getElementById('toastMsg').innerHTML = `<span style="color:${cols[type]}">${msgs[type]}</span>`;
  new bootstrap.Toast(document.getElementById('liveToast'), { delay: 3000 }).show();
}

/* ═══════════════════════════════════════════
   GALLERY
═══════════════════════════════════════════ */
function openImg(item) {
  document.getElementById('imgSrc').src = item.querySelector('img').src;
  document.getElementById('imgCap').textContent = item.querySelector('.g-overlay span').textContent.trim();
  new bootstrap.Modal(document.getElementById('imgModal')).show();
}

/* ═══════════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════════ */
document.getElementById('cForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('cName').value;
  Swal.fire({
    title: '🎉 Message Sent!',
    html: `Thanks <strong>${name}</strong>! Your message has been received.<br>We'll get back to you soon.`,
    icon: 'success',
    confirmButtonText: 'Awesome!',
    background: swalBg,
    color: swalColor,
    confirmButtonColor: '#00b4d8',
    customClass: { popup: 'rounded-4', confirmButton: 'rounded-3 px-4' }
  });
  this.reset();
});

/* ═══════════════════════════════════════════
   COUNTER
═══════════════════════════════════════════ */
let counted = false;
const runCount = () => {
  if (counted) return;
  if (document.getElementById('hero').getBoundingClientRect().top < innerHeight) {
    counted = true;
    document.querySelectorAll('.counter').forEach(c => {
      const t = +c.dataset.target;
      let n = 0;
      const step = t / 40;
      const ti = setInterval(() => {
        n += step;
        if (n >= t) { n = t; clearInterval(ti); }
        c.textContent = Math.ceil(n);
      }, 40);
    });
  }
};
window.addEventListener('scroll', runCount);
setTimeout(runCount, 2600);