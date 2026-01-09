const carousel = document.getElementById("carousel");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const dots = document.querySelectorAll("#carousel-dots button");

let index = 0;
const totalSlides = carousel.children.length;

function updateCarousel() {
  // move slides
  carousel.style.transform = `translateX(-${index * 100}%)`;

  // update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-green-600", i === index);
    dot.classList.toggle("bg-gray-400", i !== index);
  });
}

// arrow controls
nextBtn.addEventListener("click", () => {
  index = (index + 1) % totalSlides;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

// dot controls
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
  });
});

// initialize
updateCarousel(); 