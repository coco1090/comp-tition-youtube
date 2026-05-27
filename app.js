'use strict';

/* ═══════════════════════════════════════════════════
   UTILITAIRES
═══════════════════════════════════════════════════ */

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
}

/* ═══════════════════════════════════════════════════
   MENU BURGER
═══════════════════════════════════════════════════ */

const burgerBtn   = document.getElementById('burgerBtn');
const menuClose   = document.getElementById('menuClose');
const menuOverlay = document.getElementById('menuOverlay');
const mobileMenu  = document.getElementById('mobileMenu');

function openMenu() {
    document.body.classList.add('menu-open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    menuClose.focus();
}

function closeMenu() {
    document.body.classList.remove('menu-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.focus();
}

burgerBtn.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

/* ═══════════════════════════════════════════════════
   RECHERCHE
═══════════════════════════════════════════════════ */

const searchOverlay = document.getElementById('searchOverlay');
const searchBtn     = document.getElementById('searchBtn');
const searchClose   = document.getElementById('searchClose');
const searchInput   = document.getElementById('searchInput');
const searchForm    = document.getElementById('searchForm');

function openSearch() {
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput.focus(), 80);
}

function closeSearch() {
    searchOverlay.classList.remove('active');
}

searchBtn.addEventListener('click', openSearch);
searchClose.addEventListener('click', closeSearch);

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const q = searchInput.value.trim();
    if (!q) return;
    window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(q + ' Les héros de l ombre')}`,
        '_blank'
    );
    closeSearch();
    searchInput.value = '';
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeMenu();
        closeSearch();
    }
});

/* ═══════════════════════════════════════════════════
   PARTAGER
═══════════════════════════════════════════════════ */

document.getElementById('shareBtn').addEventListener('click', async () => {
    const data = {
        title : "Les Héros de l'Ombre",
        text  : "Personnages secondaires du cinéma.",
        url   : window.location.href,
    };
    if (navigator.share) {
        try { await navigator.share(data); } catch (err) { /* annulé */ }
    } else {
        try {
            await navigator.clipboard.writeText(window.location.href);
            showToast('✓ Lien copié');
        } catch (err) {
            showToast('✓ ' + window.location.href.split('/').pop());
        }
    }
});

/* ═══════════════════════════════════════════════════
   LIRE PLUS / LIRE MOINS
═══════════════════════════════════════════════════ */

const readMoreBtn = document.getElementById('readMoreBtn');
const infoText    = document.getElementById('infoText');
let   expanded    = false;

readMoreBtn.addEventListener('click', () => {
    expanded = !expanded;
    infoText.classList.toggle('expanded', expanded);
    readMoreBtn.textContent = expanded ? 'Lire moins' : 'Lire plus';
});

/* ═══════════════════════════════════════════════════
   SCROLL — parallaxe + retour en haut

   Calcul parallaxe :
     Hero : 480 px  ·  Image : 145 % = 696 px
     P_INIT  = -(480 × 0.38) = -182 px
     scrollY = 0   → translateY(-182) : bord haut hors cadre ✓
     scrollY = 480 → translateY(0)    : image au bord du hero ✓
═══════════════════════════════════════════════════ */

const heroImg = document.querySelector('.hero-img');
const backBtn = document.getElementById('backToTop');

const P_INIT  = -189;
const P_SPEED = 0.35;
let   raf     = false;

window.addEventListener('scroll', () => {
    const st = window.scrollY;

    // Bouton retour en haut
    backBtn.classList.toggle('visible', st > 260);

    // Parallaxe (uniquement quand le hero est proche du viewport)
    if (!raf) {
        raf = true;
        requestAnimationFrame(() => {
            if (st < 700) {
                heroImg.style.transform = `translateY(${P_INIT + st * P_SPEED}px)`;
            }
            raf = false;
        });
    }
}, { passive: true });

backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Liens d'ancre — scroll fluide
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const id     = link.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════ */

const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => io.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('visible'));
}

// Filet de sécurité : tout visible après 2,5 s
setTimeout(() => revealEls.forEach(el => el.classList.add('visible')), 2500);

/* ═══════════════════════════════════════════════════
   ANIMATION COMPTEURS
═══════════════════════════════════════════════════ */

function animateCount(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1500;
    const t0       = performance.now();

    (function step(now) {
        const p    = Math.min((now - t0) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
    })(t0);
}

let countersDone = false;

const cio = new IntersectionObserver(entries => {
    if (!countersDone && entries.some(e => e.isIntersecting)) {
        countersDone = true;
        document.querySelectorAll('[data-target]').forEach(animateCount);
    }
}, { threshold: 0.2 });

document.querySelectorAll('.stat-item').forEach(el => cio.observe(el));

