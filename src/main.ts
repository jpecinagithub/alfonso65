import { inject } from '@vercel/analytics';
import './style.css';

inject();

type Lang = 'en' | 'es';

const T: Record<Lang, Record<string, string>> = {
  en: {
    tagline: 'A toast by the pool',
    play: 'Play video',
    download: 'Download',
    share: 'Share',
    fullscreen: 'Fullscreen',
    copied: 'Link copied',
    meta: '50 s · 480p · MP4',
    hint: 'Best experienced with sound on.',
    author: 'Developed by Jon Peciña Iturbe',
  },
  es: {
    tagline: 'Un brindis junto a la piscina',
    play: 'Reproducir vídeo',
    download: 'Descargar',
    share: 'Compartir',
    fullscreen: 'Pantalla completa',
    copied: 'Enlace copiado',
    meta: '50 s · 480p · MP4',
    hint: 'Se disfruta mejor con sonido.',
    author: 'Desarrollado por Jon Peciña Iturbe',
  },
};

let lang: Lang = 'es';

const app = document.getElementById('app')!;

app.innerHTML = `
  <div class="bg" aria-hidden="true"></div>
  <header class="top">
    <span class="brand">Alfonso&nbsp;66</span>
    <button id="langToggle" class="lang" aria-label="Cambiar idioma / Switch language">ES</button>
  </header>
  <main class="wrap">
    <section class="hero">
      <div class="player" id="player">
        <video id="video" src="video/alfonso66.mp4" poster="poster.jpg"
               preload="metadata" playsinline controls></video>
        <button id="bigPlay" class="big-play" aria-label="Play">
          <svg viewBox="0 0 64 64" width="72" height="72" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="rgba(11,14,20,.55)" stroke="#e8b34b" stroke-width="2.5"/>
            <path d="M26 20v24l18-12z" fill="#e8b34b"/>
          </svg>
        </button>
      </div>
      <div class="info">
        <p class="kicker">Alfonso 66</p>
        <h1 id="tagline"></h1>
        <p class="meta" id="meta"></p>
        <p class="hint" id="hint"></p>
        <div class="actions">
          <a class="btn primary" id="btnDownload" href="video/alfonso66.mp4" download="Alfonso66.mp4"></a>
          <button class="btn" id="btnShare"></button>
          <button class="btn" id="btnFull"></button>
        </div>
      </div>
    </section>
    <footer><span id="author"></span> · <a href="mailto:jpecina@gmail.com">jpecina@gmail.com</a></footer>
  </main>
`;

const video = document.getElementById('video') as HTMLVideoElement;
const bigPlay = document.getElementById('bigPlay') as HTMLButtonElement;
const player = document.getElementById('player')!;

function applyLang(): void {
  const t = T[lang];
  document.documentElement.lang = lang;
  (document.getElementById('tagline') as HTMLElement).textContent = t.tagline;
  (document.getElementById('meta') as HTMLElement).textContent = t.meta;
  (document.getElementById('hint') as HTMLElement).textContent = t.hint;
  (document.getElementById('author') as HTMLElement).textContent = t.author;
  (document.getElementById('btnDownload') as HTMLElement).textContent = '↓ ' + t.download;
  (document.getElementById('btnShare') as HTMLElement).textContent = t.share;
  (document.getElementById('btnFull') as HTMLElement).textContent = t.fullscreen;
  (document.getElementById('langToggle') as HTMLElement).textContent = lang === 'en' ? 'ES' : 'EN';
  bigPlay.setAttribute('aria-label', t.play);
}

(document.getElementById('langToggle') as HTMLButtonElement).addEventListener('click', () => {
  lang = lang === 'en' ? 'es' : 'en';
  applyLang();
});

bigPlay.addEventListener('click', () => void video.play());
video.addEventListener('play', () => player.classList.add('playing'));
video.addEventListener('pause', () => player.classList.remove('playing'));

(document.getElementById('btnFull') as HTMLButtonElement).addEventListener('click', () => {
  if (document.fullscreenElement) void document.exitFullscreen();
  else void player.requestFullscreen?.();
});

(document.getElementById('btnShare') as HTMLButtonElement).addEventListener('click', async () => {
  const t = T[lang];
  const url = location.href;
  try {
    if (navigator.share) {
      await navigator.share({ title: 'Alfonso 66', url });
      return;
    }
    throw new Error('no-share');
  } catch {
    try {
      await navigator.clipboard.writeText(url);
      (document.getElementById('btnShare') as HTMLElement).textContent = '✓ ' + t.copied;
      setTimeout(applyLang, 1800);
    } catch {
      /* portapapeles no disponible: sin acción */
    }
  }
});

applyLang();
