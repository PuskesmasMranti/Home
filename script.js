/* Hamburger Nav */

const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');
    
hamburger.addEventListener('click', () => {
nav.classList.toggle('active');
});

// Additional Slider Functionality
const additionalSlider = document.querySelector('.additional-slider');
const additionalSlides = document.querySelectorAll('.additional-slide');
const prevButton = document.querySelector('.additional-slider-section .prev');
const nextButton = document.querySelector('.additional-slider-section .next');
// let additionalCurrentIndex = 0; // Tidak perlu diinisialisasi di sini
const additionalTotalSlides = additionalSlides.length;
// let additionalSliderInterval; // Tidak perlu lagi

// Fungsi untuk menampilkan slide tertentu
function showAdditionalSlide(index) {
    if (index < 0) {
        additionalCurrentIndex = additionalTotalSlides - 1;
    } else if (index >= additionalTotalSlides) {
        additionalCurrentIndex = 0;
    } else {
        additionalCurrentIndex = index;
    }
    const offset = -additionalCurrentIndex * 100;
    additionalSlider.style.transform = `translateX(${offset}%)`;
    // resetAdditionalSliderInterval(); // Tidak perlu lagi
}

// Tombol Navigasi
prevButton.addEventListener('click', () => {
    showAdditionalSlide(additionalCurrentIndex - 1);
});

nextButton.addEventListener('click', () => {
    showAdditionalSlide(additionalCurrentIndex + 1);
});

/*
// Pergeseran Otomatis
function startAdditionalSliderInterval() {
    additionalSliderInterval = setInterval(() => {
        showAdditionalSlide(additionalCurrentIndex + 1);
    }, 3000); // Ganti slide setiap 3 detik
}

function resetAdditionalSliderInterval() {
    clearInterval(additionalSliderInterval);
    startAdditionalSliderInterval();
}
*/

// Inisialisasi Slider
let additionalCurrentIndex = 0; // Pindahkan inisialisasi di sini
showAdditionalSlide(additionalCurrentIndex);
// startAdditionalSliderInterval(); // Tidak perlu lagi

// Fungsionalitas Drag untuk Desktop dan Touch untuk Mobile
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

// Tambahkan event listeners untuk setiap slide
additionalSlider.addEventListener('mousedown', dragStart);
additionalSlider.addEventListener('touchstart', dragStart);

additionalSlider.addEventListener('mouseup', dragEnd);
additionalSlider.addEventListener('touchend', dragEnd);

additionalSlider.addEventListener('mousemove', dragMove);
additionalSlider.addEventListener('touchmove', dragMove);

function dragStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    additionalSlider.classList.add('grabbing');
}

function dragMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function dragEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && additionalCurrentIndex < additionalTotalSlides - 1) {
        showAdditionalSlide(additionalCurrentIndex + 1);
    } else if (movedBy > 100 && additionalCurrentIndex > 0) {
        showAdditionalSlide(additionalCurrentIndex - 1);
    } else {
        showAdditionalSlide(additionalCurrentIndex);
    }

    additionalSlider.classList.remove('grabbing');
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    additionalSlider.style.transform = `translateX(${currentTranslate}px)`;
}
