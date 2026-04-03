// Eğer kütüphane eklendiyse 3D tilt efekti başlat
if (typeof VanillaTilt !== "undefined") {
    VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05
    });
}

// Navbar scroll davranışı
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Daha dinamik geçişler için Intersection Observer
const animOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, animOptions);

// Animasyon bekleyen tüm elementleri dinle
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = document.querySelectorAll(
        '.reveal-left, .reveal-right, .reveal-up, .scale-up'
    );
    elementsToReveal.forEach(el => revealObserver.observe(el));
});

// Modal Logic
const modal = document.getElementById('sport-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDesc = document.getElementById('modal-desc');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.sport-clickable').forEach(card => {
    card.addEventListener('click', () => {
        modalTitle.textContent = card.getAttribute('data-title');
        modalImage.src = card.getAttribute('data-img');
        modalDesc.textContent = card.getAttribute('data-desc');
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Arka plan kaydırmasını durdur
    });
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Arka plan kaydırmasını geri aç
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Arka plan kaydırmasını geri aç
    }
});

// Smooth Scroll (Sayfa içi yumuşak kaydırma)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 90,
                behavior: 'smooth'
            });
        }
    });
});
