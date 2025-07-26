// client.js

let cfg;
fetch("/config") // Changed from config.json to /config endpoint
  .then((r) => r.json())
  .then((c) => {
    cfg = c;
    init();
  })
  .catch((error) => console.error("Error loading config:", error));

function init() {
  const stripe = Stripe(
    cfg.stripe.mode === "live" ? cfg.stripe.pk_live : cfg.stripe.pk_test
  );

  function goCheckout() {
    stripe
      .redirectToCheckout({
        lineItems: [{ price: cfg.stripe.priceId, quantity: 1 }],
        mode: "subscription",
        successUrl: `${window.location.origin}/success.html`, // Use current domain
        cancelUrl: window.location.origin, // Use current domain
      })
      .catch((error) => console.error("Checkout error:", error));
  }

  // Add error handling for missing elements
  const primaryBtn = document.getElementById("cta-primary");
  const secondaryBtn = document.getElementById("cta-secondary");

  if (primaryBtn) {
    primaryBtn.addEventListener("click", goCheckout);
  }

  if (secondaryBtn) {
    secondaryBtn.addEventListener("click", goCheckout);
  }
}

// Carousel functionality
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll("img");
    const interval = parseInt(carousel.dataset.interval) || 5000;
    let currentIndex = 0;
    let timer;

    function showNextImage() {
      images[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("active");
    }

    function startCarousel() {
      timer = setInterval(showNextImage, interval);
    }

    function stopCarousel() {
      clearInterval(timer);
    }

    carousel.addEventListener("mouseenter", stopCarousel);
    carousel.addEventListener("mouseleave", startCarousel);

    startCarousel();
  });
});
