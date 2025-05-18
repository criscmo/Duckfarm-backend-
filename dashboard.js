const popup = document.getElementById("popup");
const userId = 'user123'; // Replace with real user ID

async function getBalance() {
  try {
    const response = await fetch(`/api/dashboard/balance/${userId}`);
    if (response.ok) {
      const data = await response.json();
      document.getElementById('user-balance').innerText = `Tzs ${data.balance}`;
    } else {
      document.getElementById('user-balance').innerText = 'Tzs 0';
    }
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
}

getBalance();

function handleClick(url, showPopup = false) {
  clickSound.play();
  if (showPopup) {
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
      window.location.href = url;
    }, 1500);
  } else {
    setTimeout(() => window.location.href = url, 200);
  }
}

const slides = document.querySelectorAll('.slide-image');
let currentSlide = 0;

function showNextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, 4000);