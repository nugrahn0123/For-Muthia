const countdownTarget = new Date('2026-06-16T00:00:00+07:00');
const countdownContainer = document.getElementById('countdown');
const countdownState = document.getElementById('countdownState');
const heartsLayer = document.getElementById('hearts');
const revealBlocks = document.querySelectorAll('.reveal');
const hiddenMessage = document.getElementById('hiddenMessage');
const letterToggle = document.getElementById('letterToggle');
const typewriter = document.getElementById('typewriter');
const gallery = document.getElementById('gallery');
const modal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');
const youtubeVideoId = 'UpoCD4zFASY'; // Perfect - Ed Sheeran

const galleryItems = [
  { file: 'Foto/WhatsApp Image 2026-06-13 at 21.52.33(2).jpeg', caption: 'Awal yang tenang, seperti halaman yang dibuka pelan.' },
  { file: 'Foto/WhatsApp Image 2026-06-13 at 21.52.34(1).jpeg', caption: 'Muthia dalam versi yang paling hangat.' },
  { file: 'Foto/WhatsApp Image 2026-06-13 at 21.52.34.jpeg', caption: 'Detail kecil yang membuat semuanya terasa hidup.' },
  { file: 'Foto/WhatsApp Image 2026-06-13 at 21.52.35(1).jpeg', caption: 'Langkah yang pelan, tapi pasti menuju hari baik.' },
  { file: 'Foto/WhatsApp Image 2026-06-13 at 21.52.35(2).jpeg', caption: 'Cahaya yang tidak perlu ramai untuk terlihat indah.' },
  { file: 'Foto/WhatsApp Image 2026-06-13 at 21.52.35.jpeg', caption: 'Sorot yang menyimpan cerita paling personal.' },
  { file: 'Foto/WhatsApp Image 2026-06-13 at 21.52.36(1).jpeg', caption: 'Frame yang cukup diam, tapi tetap berbicara.' },
  { file: 'Foto/WhatsApp Image 2026-06-13 at 21.52.36(2).jpeg', caption: 'Satu potret untuk satu perasaan yang utuh.' },
  { file: 'Foto/WhatsApp Image 2026-06-13 at 21.52.36.jpeg', caption: 'Warna hangat untuk usia yang baru.' },
  { file: 'Foto/WhatsApp Image 2026-06-13 at 21.52.37(1).jpeg', caption: 'Momen yang sengaja disimpan, bukan sekadar lewat.' },
  { file: 'Foto/WhatsApp Image 2026-06-13 at 21.52.37(2).jpeg', caption: 'Foto penutup yang tetap menjaga rasa.' },
  { file: 'Foto/WhatsApp Image 2026-06-13 at 21.52.37.jpeg', caption: 'Akhir yang lembut untuk cerita yang manis.' },
];

const encodePath = (path) => path.split('/').map(encodeURIComponent).join('/');

function formatCountdown(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [days, hours, minutes, seconds].map((value) => String(value).padStart(2, '0'));
}

function updateCountdown() {
  const diff = countdownTarget.getTime() - Date.now();
  const [days, hours, minutes, seconds] = formatCountdown(diff);
  const boxes = countdownContainer.querySelectorAll('.count-box strong');

  boxes[0].textContent = days;
  boxes[1].textContent = hours;
  boxes[2].textContent = minutes;
  boxes[3].textContent = seconds;

  countdownState.textContent = diff <= 0 ? 'Hari spesialmu sudah tiba' : 'Menghitung waktu terbaik untukmu';
  countdownContainer.setAttribute('aria-label', diff <= 0 ? 'Selamat ulang tahun' : 'Countdown menuju ulang tahun');
}

function createHearts() {
  const heartCount = 18;
  for (let index = 0; index < heartCount; index += 1) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 10}s`;
    heart.style.animationDuration = `${9 + Math.random() * 9}s`;
    heart.style.transform = `rotate(45deg) scale(${0.7 + Math.random() * 1.1})`;
    heart.style.opacity = `${0.35 + Math.random() * 0.55}`;
    heartsLayer.appendChild(heart);
  }
}

function setupRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealBlocks.forEach((block) => observer.observe(block));
}

function openModal(item) {
  modalImage.src = encodePath(item.file);
  modalImage.alt = item.caption;
  modalCaption.textContent = '';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function createGalleryCard(item, index) {
  const figure = document.createElement('figure');
  figure.className = 'gallery-marquee-card glass';
  figure.tabIndex = 0;
  figure.setAttribute('role', 'button');
  figure.setAttribute('aria-label', `Buka foto ${index + 1}`);

  const media = document.createElement('div');
  media.className = 'gallery-marquee-media';

  const image = document.createElement('img');
  image.src = encodePath(item.file);
  image.alt = item.caption;
  image.loading = 'lazy';
  media.appendChild(image);

  figure.addEventListener('click', () => openModal(item));
  figure.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal(item);
    }
  });

  figure.append(media);
  return figure;
}

function buildGallery() {
  const track = document.createElement('div');
  track.className = 'gallery-marquee-track';

  const setA = document.createElement('div');
  setA.className = 'gallery-marquee-set';
  galleryItems.forEach((item, index) => {
    setA.appendChild(createGalleryCard(item, index));
  });

  const setB = document.createElement('div');
  setB.className = 'gallery-marquee-set';
  galleryItems.forEach((item, index) => {
    setB.appendChild(createGalleryCard(item, index + galleryItems.length));
  });

  track.append(setA, setB);
  gallery.replaceChildren(track);
}

function typeLeadText() {
  const text = typewriter.textContent.trim();
  typewriter.textContent = '';
  let index = 0;

  const tick = () => {
    typewriter.textContent += text[index];
    index += 1;
    if (index < text.length) {
      window.setTimeout(tick, 18);
    }
  };

  tick();
}

let youtubePlayer = null;
let autoplayFallbackBound = false;

function stopBacksound() {
  if (youtubePlayer && typeof youtubePlayer.pauseVideo === 'function') {
    youtubePlayer.pauseVideo();
  }
}

function startBacksound() {
  if (youtubePlayer && typeof youtubePlayer.playVideo === 'function') {
    youtubePlayer.playVideo();
  }
}

window.onYouTubeIframeAPIReady = function() {
  youtubePlayer = new YT.Player('youtubePlayer', {
    height: '1',
    width: '1',
    videoId: youtubeVideoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      'controls': 0,
      'modestbranding': 1,
      'rel': 0,
      'fs': 0,
      'autoplay': 0,
      'loop': 1
    }
  });
};

function onPlayerReady() {
  youtubePlayer.setVolume(30);
  startBacksound();
  bindAutoplayFallback();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    youtubePlayer.playVideo();
  }
}

function bindAutoplayFallback() {
  if (autoplayFallbackBound) {
    return;
  }

  autoplayFallbackBound = true;
  const attemptPlay = () => {
    try {
      startBacksound();
      window.removeEventListener('pointerdown', attemptPlay);
      window.removeEventListener('touchstart', attemptPlay);
      window.removeEventListener('keydown', attemptPlay);
    } catch {
      // Wait for the next interaction if autoplay is blocked.
    }
  };

  window.addEventListener('pointerdown', attemptPlay, { once: true });
  window.addEventListener('touchstart', attemptPlay, { once: true });
  window.addEventListener('keydown', attemptPlay, { once: true });
}

window.addEventListener('beforeunload', stopBacksound);

letterToggle.addEventListener('click', () => {
  hiddenMessage.classList.toggle('show');
  letterToggle.textContent = hiddenMessage.classList.contains('show') ? 'Sembunyikan pesan' : 'Buka pesan rahasia';
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

updateCountdown();
window.setInterval(updateCountdown, 1000);
createHearts();
setupRevealObserver();
buildGallery();
typeLeadText();
