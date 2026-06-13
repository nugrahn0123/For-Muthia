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
  const diff = countdownTarget.getTime() - new Date().getTime();
  const [days, hours, minutes, seconds] = formatCountdown(diff);
  const boxes = countdownContainer.querySelectorAll('.count-box strong');

  boxes[0].textContent = days;
  boxes[1].textContent = hours;
  boxes[2].textContent = minutes;
  boxes[3].textContent = seconds;

  if (diff <= 0) {
    countdownState.textContent = 'Hari spesialmu sudah tiba';
    countdownContainer.setAttribute('aria-label', 'Selamat ulang tahun');
    return;
  }

  countdownState.textContent = 'Menghitung waktu terbaik untukmu';
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

function buildGallery() {
  const spotlightItem = galleryItems[0];
  const sideItems = galleryItems.slice(1, 3);
  const reelItems = galleryItems.slice(3);

  const createCard = (item, index, options = {}) => {
    const figure = document.createElement('figure');
    figure.className = options.cardClass || 'photo-card glass';
    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', `Buka foto ${index + 1}`);

    const media = document.createElement('div');
    media.className = options.mediaClass || 'gallery-card-media';

    const image = document.createElement('img');
    image.src = encodePath(item.file);
    image.alt = item.caption;
    image.loading = 'lazy';
    media.appendChild(image);

    const caption = document.createElement('figcaption');
    caption.className = options.captionClass || 'gallery-card-copy';

    if (options.label || options.title) {
      const label = document.createElement('span');
      label.className = 'gallery-label';
      label.textContent = options.label || 'Pilihan';
      caption.appendChild(label);
    }

    if (options.title) {
      const title = document.createElement('h3');
      title.textContent = options.title;
      caption.appendChild(title);
    }

    const text = document.createElement('p');
    text.textContent = options.description || item.caption;
    caption.appendChild(text);

    const open = () => {
      modalImage.src = encodePath(item.file);
      modalImage.alt = item.caption;
      modalCaption.textContent = item.caption;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    };

    figure.addEventListener('click', open);
    figure.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });

    figure.append(media, caption);
    return figure;
  };

  const spotlight = document.createElement('article');
  spotlight.className = 'gallery-spotlight glass';
  const spotlightMedia = document.createElement('button');
  spotlightMedia.type = 'button';
  spotlightMedia.className = 'gallery-spotlight-media';
  spotlightMedia.setAttribute('aria-label', 'Buka foto utama');
  const spotlightImg = document.createElement('img');
  spotlightImg.src = encodePath(spotlightItem.file);
  spotlightImg.alt = spotlightItem.caption;
  spotlightImg.loading = 'lazy';
  spotlightMedia.appendChild(spotlightImg);
  spotlightMedia.addEventListener('click', () => {
    modalImage.src = encodePath(spotlightItem.file);
    modalImage.alt = spotlightItem.caption;
    modalCaption.textContent = spotlightItem.caption;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
  const spotlightCopy = document.createElement('div');
  spotlightCopy.className = 'gallery-spotlight-copy';
  spotlightCopy.innerHTML = `
    <span class="gallery-label">Foto utama</span>
    <h3>Muthia sebagai pusat perhatian.</h3>
    <p>Bagian paling penting saya beri ruang terbesar, supaya kesannya lebih premium dan tidak terasa penuh sesak.</p>
  `;
  spotlight.append(spotlightMedia, spotlightCopy);

  const side = document.createElement('div');
  side.className = 'gallery-side';
  sideItems.forEach((item, index) => {
    side.appendChild(createCard(item, index + 1, {
      cardClass: index === 0 ? 'gallery-card gallery-card--compact glass' : 'gallery-card glass',
      label: index === 0 ? 'Momen hangat' : 'Detail manis',
      title: index === 0 ? 'Tenang, dekat, dan jelas.' : 'Satu detail yang tetap perlu ada.',
      description: index === 0 ? 'Dipilih untuk mendukung foto utama tanpa mencuri perhatian.' : 'Cukup hadir sebagai aksen, bukan saingan.'
    }));
  });

  const reel = document.createElement('article');
  reel.className = 'gallery-reel glass';
  const reelIntro = document.createElement('div');
  reelIntro.className = 'reel-intro';
  reelIntro.innerHTML = `
    <span class="gallery-label">Pita kenangan</span>
    <strong>Geser untuk melihat sisanya.</strong>
    <p>Foto tambahan tetap ada, tapi dibuat kecil dan horizontal agar terasa seperti arsip premium, bukan spam visual.</p>
  `;
  const reelTrack = document.createElement('div');
  reelTrack.className = 'reel-track';
  reelItems.forEach((item, index) => {
    reelTrack.appendChild(createCard(item, index + 4, {
      cardClass: 'gallery-reel-card glass',
      mediaClass: 'gallery-card-media',
      captionClass: 'gallery-card-copy',
      label: `Frame ${String(index + 4).padStart(2, '0')}`,
      title: item.caption,
      description: 'Klik untuk melihat ukuran penuh.'
    }));
  });
  reel.append(reelIntro, reelTrack);

  gallery.replaceChildren(spotlight, side, reel);
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
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