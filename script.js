/**
 * RSVP endpoint: paste your Google Apps Script Web App URL here
 * (see apps-script.gs for setup). Leave empty to store RSVPs locally only.
 */
const RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz6NK5LHVdmYRRsjlQoHjnQq6127MIlLjt2OwgT_STAsXPvH9tQ3KZhEI9yzLuzITyPlA/exec';

const WEDDING_DATE = new Date('2026-12-20T16:00:00+08:00');

const SPONSORS = [
    ['Vice Mayor Arnold B. Arcillas', 'Mayor Arlene B. Arcillas'],
    ['Ptr. Alain Guincangco', 'Ptra. Cherry Pasco'],
    ['Allan Bulahan', 'Mila Bulahan'],
    ['Edu Castillo', 'Luchie D. Castillo'],
    ['Nick Amoncio', 'Fe Amoncio'],
    ['Ruel B. Borbe', 'Suite Mary Grace G. Pampula'],
    ['Jaime A. Baybay', 'Imelda B. Hilario'],
    ['Edelwise Beato', 'Ida Louise O. Trinidad'],
    ['Lino Aragon', 'Jean Francis B. Reyes'],
    ['Julius Bastida', 'Alma Benigno-Hinton'],
    ['Ronald Agutep', 'Jesther-Lynn E. Agutep'],
    ['August H. Turla', 'Juanita M. Turla'],
    ['Jhess H. Turla', 'Cora Turla'],
    ['Jan Michael De Leon', 'Mutya C. Reveche'],
    ['Roy M. Albino', 'Salvacion A. Albino'],
    ['Adonis B. Borbe', 'Mary Jane Berlon'],
    ['', 'Susan Cosico'],
    ['', 'Josefina C. Laude'],
    ['', 'Maria Corazon Cecilia L. Landicho'],
    ['', 'Malou Reazo'],
    ['', 'Melita Marquez'],
    ['', 'Analiza Baybay'],
    ['', 'Clarina Reyes Solema'],
    ['', 'Ma. Cristina F. Manejable'],
    ['', 'Sheryl S. Paralejas'],
];

const FLOWER_GIRLS = [
    'Sara Ann I. Velarde', 'Anthonettee Calimag', 'Ritzy B. Arnibal', 'Karen G. Birata',
    'Jamaica C. Sangalang', 'Jane Claire D. Bulahan', 'Grace Ann Pangan', 'Irish Jade R. Constatino',
    'Ma. Cristina Beato', 'Roxanne L. Rivera', 'Manilyn Z. Pertez', 'Jeralyn S. Saluria',
    'Mary Jhane O. Urizza', 'Estephanie Hermogeno', 'Shayne Ann C. Sancon', 'Cecil C. Paloma',
    'Abby Jedidia B. Pasco', 'Shammah P. Diaz',
];

const $ = (id) => document.getElementById(id);
const el = (tag, text, cls) => {
    const n = document.createElement(tag);
    n.textContent = text;
    if (cls) n.className = cls;
    return n;
};

// Personalised guest name via ?to=Name
const guest = new URLSearchParams(location.search).get('to');
if (guest) {
    $('guest-name').textContent = guest;
    $('guest-line').hidden = false;
    $('rsvp-name').value = guest;
}

// Lists
const sp = $('sponsors');
sp.append(el('p', 'Ninong', 'head'), el('p', 'Ninang', 'head'));
SPONSORS.forEach(([m, f]) => sp.append(el('p', m), el('p', f)));
FLOWER_GIRLS.forEach((n) => $('flowers').append(el('li', n)));

// Petals
const petals = document.querySelector('.petals');
const burst = (count) => {
    for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'petal';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
        p.style.animationDuration = 4 + Math.random() * 4 + 's';
        p.style.animationDelay = Math.random() * 2 + 's';
        petals.append(p);
        p.addEventListener('animationend', () => p.remove());
    }
};

// Music
const music = $('bg-music');
const musicBtn = $('music-btn');
musicBtn.addEventListener('click', () => {
    if (music.paused) music.play(); else music.pause();
});
music.addEventListener('play', () => { musicBtn.classList.add('playing'); musicBtn.setAttribute('aria-label', 'Pause music'); });
music.addEventListener('pause', () => { musicBtn.classList.remove('playing'); musicBtn.setAttribute('aria-label', 'Play music'); });

// Open invitation
$('open-btn').addEventListener('click', () => {
    music.volume = 0.6;
    music.play().catch(() => {});
    musicBtn.hidden = false;
    $('cover').classList.add('opened');
    document.body.classList.remove('locked');
    burst(40);
    setTimeout(() => $('cover').remove(), 1200);
});

// Countdown
const tick = () => {
    const diff = Math.max(0, WEDDING_DATE - Date.now());
    $('cd-d').textContent = Math.floor(diff / 864e5);
    $('cd-h').textContent = Math.floor(diff / 36e5) % 24;
    $('cd-m').textContent = Math.floor(diff / 6e4) % 60;
    $('cd-s').textContent = Math.floor(diff / 1e3) % 60;
};
tick();
setInterval(tick, 1000);

// Scroll reveal
const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((s) => io.observe(s));

// Bottom nav active state
const navLinks = document.querySelectorAll('.bottom-nav a');
const navIo = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    });
}, { rootMargin: '-45% 0px -50% 0px' });
['home', 'story', 'gallery', 'event', 'entourage', 'rsvp'].forEach((id) => navIo.observe($(id)));

// Gallery
const PHOTOS = [
    'dsc00015', 'dsc00033', 'dsc00047', 'dsc00114', 'dsc00122', 'dsc00174', 'dsc00193', 'dsc00236', 'dsc00257', 'dsc00269',
    'dsc00278', 'dsc00298', 'dsc00302', 'dsc00303', 'dsc00320', 'dsc00346', 'dsc09350', 'dsc09359', 'dsc09368', 'dsc09386',
    'dsc09422', 'dsc09428', 'dsc09489', 'dsc09613', 'dsc09656', 'dsc09660', 'dsc09674', 'dsc09702', 'dsc09711', 'dsc09715',
    'dsc09719', 'dsc09730', 'dsc09757', 'dsc09780', 'dsc09807', 'dsc09830', 'dsc09837', 'dsc09844', 'dsc09850', 'dsc09870',
    'dsc09872', 'dsc09876', 'dsc09881', 'dsc09904', 'dsc09911', 'dsc09929', 'dsc09932', 'dsc09967', 'dsc09976', 'dsc09991',
];
const PREVIEW = 12;
const grid = $('gallery-grid');
const moreBtn = $('gallery-more');
PHOTOS.forEach((name, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'g-item' + (i >= PREVIEW ? ' g-hidden' : '');
    b.setAttribute('aria-label', `View photo ${i + 1}`);
    const img = document.createElement('img');
    img.src = `./images/gallery/thumb/${name}.jpg`;
    img.alt = `Ivan and Aileen photo ${i + 1}`;
    img.loading = 'lazy';
    img.decoding = 'async';
    b.append(img);
    b.addEventListener('click', () => openLb(i));
    grid.append(b);
});
moreBtn.textContent = `View All ${PHOTOS.length} Photos`;
moreBtn.addEventListener('click', () => {
    const expanded = grid.classList.toggle('expanded');
    moreBtn.textContent = expanded ? 'Show Less' : `View All ${PHOTOS.length} Photos`;
    if (!expanded) $('gallery').scrollIntoView({ behavior: 'smooth' });
});

// Lightbox
const lb = $('lightbox');
const lbImg = $('lb-img');
let lbIndex = 0;
const showLb = (i) => {
    lbIndex = (i + PHOTOS.length) % PHOTOS.length;
    lbImg.classList.remove('loaded');
    lbImg.src = `./images/gallery/full/${PHOTOS[lbIndex]}.jpg`;
    lbImg.alt = `Ivan and Aileen photo ${lbIndex + 1}`;
    $('lb-count').textContent = `${lbIndex + 1} / ${PHOTOS.length}`;
    // preload neighbours
    [1, -1].forEach((d) => { new Image().src = `./images/gallery/full/${PHOTOS[(lbIndex + d + PHOTOS.length) % PHOTOS.length]}.jpg`; });
};
lbImg.addEventListener('load', () => lbImg.classList.add('loaded'));
const openLb = (i) => { showLb(i); lb.hidden = false; document.body.classList.add('locked'); $('lb-close').focus(); };
const closeLb = () => { lb.hidden = true; document.body.classList.remove('locked'); };
$('lb-close').addEventListener('click', closeLb);
$('lb-prev').addEventListener('click', () => showLb(lbIndex - 1));
$('lb-next').addEventListener('click', () => showLb(lbIndex + 1));
lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
    if (e.key === 'ArrowRight') showLb(lbIndex + 1);
});
let touchX = null;
lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
    touchX = null;
});

// RSVP
const formEl = $('rsvp-form');
const form = formEl.elements;
const status = $('rsvp-status');
const setStatus = (msg, cls) => { status.textContent = msg; status.className = 'form-status ' + (cls || ''); };

formEl.addEventListener('change', () => {
    $('guests-wrap').style.display = form.attendance.value === 'Declines' ? 'none' : '';
});

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        name: form.name.value.trim(),
        attendance: form.attendance.value,
        guests: form.attendance.value === 'Declines' ? '0' : form.guests.value,
        message: form.message.value.trim(),
        submittedAt: new Date().toISOString(),
    };
    if (!data.name) return setStatus('Please enter your name.', 'err');
    if (!data.attendance) return setStatus('Please let us know if you can attend.', 'err');

    const btn = $('rsvp-submit');
    btn.disabled = true;
    setStatus('Sending...');
    try {
        if (RSVP_ENDPOINT) {
            await fetch(RSVP_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(data),
            });
        } else {
            const all = JSON.parse(localStorage.getItem('rsvps') || '[]');
            all.push(data);
            localStorage.setItem('rsvps', JSON.stringify(all));
        }
        formEl.reset();
        $('guests-wrap').style.display = '';
        setStatus(data.attendance === 'Accepts'
            ? `Thank you, ${data.name}! We can't wait to see you.`
            : `Thank you, ${data.name}. You'll be missed!`, 'ok');
        if (data.attendance === 'Accepts') burst(30);
    } catch {
        setStatus('Something went wrong. Please try again.', 'err');
    } finally {
        btn.disabled = false;
    }
});
