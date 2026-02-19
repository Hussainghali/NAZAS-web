/* --- 1. MOBILE MENU LOGIC (Runs on all pages) --- */
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenu && navMenu) {
      mobileMenu.addEventListener('click', () => {
          mobileMenu.classList.toggle('is-active');
          navMenu.classList.toggle('active');
      });
  }
});

/* --- 2. IMAGE SLIDER LOGIC --- */
let slideIndex = 1;
const slides = document.getElementsByClassName("slides");
const dots = document.getElementsByClassName("dot");

// Only run if slides actually exist on this page
if (slides.length > 0) {
  showSlides(slideIndex);

  // Optional: Auto-slide every 5 seconds
  setInterval(() => {
      changeSlide(1);
  }, 5000);
}

function changeSlide(n) {
  if (slides.length > 0) showSlides(slideIndex += n);
}

function currentSlide(n) {
  if (slides.length > 0) showSlides(slideIndex = n);
}

function showSlides(n) {
  if (slides.length === 0) return; // Error prevention

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  if (dots.length > 0) {
      dots[slideIndex - 1].className += " active";
  }
}

/* --- 3. PRESIDENT SEARCH & PROFILE (Home Page Only) --- */
function filterPresidents() {
  const inputField = document.getElementById('presSearch');
  if (!inputField) return; // Exit if search box is missing

  let input = inputField.value.toLowerCase();
  let cards = document.getElementsByClassName('president-card');

  for (let i = 0; i < cards.length; i++) {
      let name = cards[i].querySelector('.pres-name').innerText.toLowerCase();
      let tenure = cards[i].querySelector('.tenure-badge').innerText.toLowerCase();
      cards[i].style.display = (name.includes(input) || tenure.includes(input)) ? "block" : "none";
  }
}

function viewProfile(name, tenure, img, bio) {
  const modal = document.getElementById('profileModal');
  if (!modal) return;

  document.getElementById('modalName').innerText = name;
  document.getElementById('modalTenure').innerText = "Tenure: " + tenure;
  document.getElementById('modalImg').src = img;
  document.getElementById('modalBio').innerText = bio;
  
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById('profileModal');
  if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
  }
}

window.onclick = function(event) {
  let modal = document.getElementById('profileModal');
  if (event && event.target == modal) {
      closeModal();
  }
}

/* --- 4. COUNTER ANIMATION (Runs if stats exist) --- */
document.addEventListener("DOMContentLoaded", () => {
  const statTitles = document.querySelectorAll('.about-stats h3');
  if (statTitles.length === 0) return;

  const animateValue = (obj, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          obj.innerHTML = Math.floor(progress * (end - start) + start) + "+";
          if (progress < 1) {
              window.requestAnimationFrame(step);
          }
      };
      window.requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              const targetEl = entry.target;
              const targetValue = parseInt(targetEl.innerText.replace(/\D/g, ''));
              animateValue(targetEl, 0, targetValue, 2000);
              observer.unobserve(targetEl);
          }
      });
  }, { threshold: 0.7 });

  statTitles.forEach((title) => observer.observe(title));
});
/* --- PRESIDENTIAL MESSAGE SLIDER --- */
let presIndex = 0;
function runPresSlider() {
    let i;
    let slides = document.getElementsByClassName("pres-slide");
    if (slides.length === 0) return;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    presIndex++;
    if (presIndex > slides.length) {presIndex = 1}    
    slides[presIndex-1].style.display = "block";  
    setTimeout(runPresSlider, 4000); // Change image every 4 seconds
}
// Run it!
document.addEventListener("DOMContentLoaded", runPresSlider);